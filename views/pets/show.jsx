const React = require('react')
const Def = require('../default')

function show (data) {
    let comments = (
      <h3 className="inactive">
        No comments yet!
      </h3>
    )
    
    if (data.pet.comments.length) {
      
      
      comments = data.pet.comments.map(c => {
        return (
          <div className="border col-sm-4">
            <h4>{c.content}</h4>
            <h3>
              <stong>- {c.author}</stong>
            </h3>
            <form method="POST" action={`/pets/${data.pet.id}/comment/${c.id}?_method=DELETE`}>
              <input type="submit" className="btn btn-danger" value="Delete Comment" />
            </form>
          </div>
        )
      })
    }
    return (
        <Def>
          <main>
            <div className="row">
              <div className="col-sm-6">
                <img src={data.pet.pic} alt={data.pet.name} />
                <h3>
                 is {data.pet.age} years old,
                </h3>
              </div>
              <div className="col-sm-6">
                <h3>and weighs in at{ data.pet.weight }</h3>
                <h3>
                  {data.pet.showEstablished()}
                </h3>
                <br />
                <a href={`/pets/${data.pet.id}/edit`} className="btn btn-warning">
                  Edit
                </a>{` `}
                <form method="POST" action={`/pets/${data.pet.id}?_method=DELETE`}>
                  <button type="submit" className="btn btn-danger">
                    Delete
                  </button>
                </form>
              </div>
            </div>
            <hr />
            <h2>Comments</h2>
            <div className="row">
              {comments}
            </div>
            <hr />
            <h2>Want to leave a comment? (They love compliments!)</h2>
            <form action={`/pets/${data.pet.id}/comment`} method="POST">
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="content">Content</label>
                  <textarea id="content" name="content" className="form-control"></textarea>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-4">
                  <label htmlFor="author">Author</label>
                  <input id="author" name="author" className="form-control" />
                </div>
                <div className="form-group col-sm-2">
                  </div>
              </div>
              <input type="submit" className="btn btn-primary" value="Add Comment" />
            </form>
          </main>
        </Def>
    )
}

module.exports = show