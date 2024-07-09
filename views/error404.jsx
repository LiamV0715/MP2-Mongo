const React = require('react')
const Def = require('./default')

function error404 () {
    return (
        <Def>
            <main>
                <h1>404: Page not found</h1>
                <p>Sorry, page not found! I am new to coding :(</p>
                <img src="/images/gojo-beans.png" alt="Cat that is very sorry he can't find your page" class='404'/>
            </main>
        </Def>
    )
}

module.exports = error404