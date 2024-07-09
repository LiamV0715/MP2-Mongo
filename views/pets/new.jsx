const React = require("react");
const Def = require("../default");

function new_form(data) {
  let message = "";
  if (data.message) {
    message = <h4 className="alert-danger">{data.message}</h4>;
  }
  return (
    <Def>
      <main>
        <h1>Add a New Pet!</h1>
        {message}
        <form method="POST" action="/pet">
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="name">Their Name:</label>
              <input className="form-control" id="name" name="name" required />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="pic">Picture URL:</label>
              <input className="form-control" id="pic" name="pic" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-4">
              <label htmlFor="age">Age:</label>
              <input className="form-control" id="age" name="age" />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="weight">And Weight:</label>
              <input className="form-control" id="weight" name="weight" />
            </div>
          </div>
          <input className="btn btn-primary" type="submit" value="Add Pet" />
        </form>
      </main>
    </Def>
  );
}

module.exports = new_form;
