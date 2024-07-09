const React = require("react");
const Def = require("../default");

function index(data) {
  let petsFormatted = data.pets.map((pet) => {
    return (
      <div className="col-sm-6">
        <h2>
          <a href={`/pets/${pet.id}`}>{pet.name}</a>
        </h2>
        <p className="text-center">{pet.age}</p>
        <img src={pet.pic} alt={pet.name} />
      </div>
    );
  });
  return (
    <Def>
      <main>
        <h1>We got pets!</h1>
        <div className="row">{petsFormatted}</div>
      </main>
    </Def>
  );
}

module.exports = index;
