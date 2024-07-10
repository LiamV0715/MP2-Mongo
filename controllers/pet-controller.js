const express = require("express");
const pets = express.Router();
const Pet = require("../models/pets.js");
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

//SHOW
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

//delete
pets.delete("/:id", (req, res) => {
  Pet.findByIdAndDelete(req.params.id).then((deletedPet) => {
    res.status(303).redirect("/breads");
  });
});

module.exports = pets;
