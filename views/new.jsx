const React = require("react");
const Default = require("./default");

function New() {
  return (
    <Default>
      <h2>Add a new bread</h2>
      <form action="/pets/" method="POST">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required />
        <label htmlFor="image">Image</label>
        <input type="text" name="image" id="image" />
        <label htmlFor="weight">Weight</label>
        <input type="text" name="weight" id="weight" />
        <label htmlFor="age">Age</label>
        <input type="text" name="age" id="age" />
        <input type="submit" />
      </form>
      <div className="backButton">
        <a href="/pets">
          <button>Go back to the pet index</button>
        </a>
      </div>
    </Default>
  );
}

module.exports = New;
