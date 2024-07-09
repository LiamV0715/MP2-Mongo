const React = require('react')
const Def = require('./default')

function home () {
    return (
        <Def>
            <main>
                <h1>Pet Time!!!</h1>
                <div>
                    
                </div>
                <a href="/pets">
                    <button className="btn-primary">Pets Page</button>
                </a>
            </main>
        </Def>
    )
}

module.exports = home