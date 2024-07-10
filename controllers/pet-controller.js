// controllers/pet-controller.js
const express = require("express");
const pets = express.Router();
const Pet = require("../models/pets.js");
const Comment = require("../models/comment.js"); 
require("dotenv").config();

// INDEX
pets.get("/", (req, res) => {
  Pet.find().then((foundPets) => {
    res.render("index", {
      pets: foundPets,
      title: "Index Page",
    });
  });
});

//NEW
pets.get("/new", (req, res) => {
  res.render("new");
});

// SHOW
pets.get("/:id", (req, res) => {
  Pet.findById(req.params.id)
    .populate("comments")
    .then((foundPet) => {
      if (foundPet) {
        console.log("Pet found:", foundPet); // Log the found pet
        res.render("show", {
          pet: foundPet,
        });
      } else {
        console.log("Pet not found");
        res.status(404).send("Pet not found");
      }
    })
    .catch((err) => {
      console.error("Error finding pet:", err);
      res.status(500).send("Error finding pet");
    });
});

// CREATE
pets.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }

  Pet.create(req.body);
  res.redirect("/pets");
});

// EDIT
pets.get("/:id/edit", (req, res) => {
  Pet.findById(req.params.id).then((foundPet) => {
    res.render("edit", {
      pet: foundPet,
    });
  });
});

// UPDATE
pets.put("/:id", (req, res) => {
  Pet.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedPet) => {
      console.log(updatedPet);
      res.redirect(`/pets/${req.params.id}`);
    }
  );
});

// DELETE
pets.delete("/:id", (req, res) => {
  Pet.findByIdAndDelete(req.params.id).then((deletedPet) => {
    res.status(303).redirect("/pets");
  });
});

// POST A COMMENT
pets.post("/:id/comment", (req, res) => {
  console.log("post comment", req.body);
  if (req.body.author === "") {
    req.body.author = undefined;
  }
  Pet.findById(req.params.id)
    .populate("comments")
    .then((pet) => {
      Comment.create(req.body) // Create a comment using the Comment model
        .then((comment) => {
          console.log("Created comment:", comment);
          pet.comments.push(comment.id);
          pet
            .save()
            .then(() => {
              res.redirect(`/pets/${req.params.id}`);
            })
            .catch((err) => {
              console.error("Error saving pet:", err);
              res.render("error404");
            });
        })
        .catch((err) => {
          console.error("Error creating comment:", err);
          res.render("error404");
        });
    })
    .catch((err) => {
      res.render("error404");
    });
});

// DELETE A COMMENT
pets.delete("/:id/comment/:commentId", (req, res) => {
  Comment.findByIdAndDelete(req.params.commentId) // Use the Comment model to find and delete the comment
    .then(() => {
      console.log("Success");
      res.redirect(`/pets/${req.params.id}`);
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

// Data injector
pets.get("/data/seed", (req, res) => {
  Pet.insertMany([
    {
      name: "Beans",
      pic:
        "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=2853&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      weight: 8,
      age: "5",
    },
    {
      name: "Snaeb",
      pic:
        "https://images.unsplash.com/photo-1628084599792-b5133a96c36f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      weight: 10,
      age: "6",
    },
    {
      name: "Bingus",
      pic:
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      weight: 9,
      age: "4",
    },
    {
      name: "Rufus",
      pic:
        "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?q=80&w=3140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      weight: 12,
      age: "7",
    },
    {
      name: "Snoop Dog(g)",
      pic:
        "https://media.gq.com/photos/620456ff6d4b6c578270864d/16:9/w_2240,c_limit/1354586467",
      weight: 190,
      age: "50",
    },
    {
      name: "Max",
      pic:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      weight: 14,
      age: "3",
    },
  ])
    .then((createdPets) => {
      console.log('Pets added: ', createdPets);
      res.redirect("/pets");
    })
    .catch((err) => {
      console.error('Error inserting pets: ', err);
      res.status(400).send("Error seeding database");
    });
});

module.exports = pets;
