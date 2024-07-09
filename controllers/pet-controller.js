const router = require('express').Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.Pet.find()
        .then((pets) => {
            res.render('pets/index', { pets })
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})

router.post('/', (req, res) => {
    if (req.body.pic === '') { req.body.pic = undefined }
    if (req.body.weight === '') { req.body.weight = undefined }
    if (req.body.age === '') { req.body.age = undefined }
    db.Place.create(req.body)
        .then(() => {
            res.redirect('/pets')
        })
        .catch(err => {
            if (err && err.name == 'ValidationError') {
                let message = 'Validation Error: '
                for (var field in err.errors) {
                    message += `${field} was ${err.errors[field].value}. ${err.errors[field].message}\n`
                }
                res.render('pets/new', { message })
            }
            else {
                res.render('error404')
            }
        })
})

router.get('/new', (req, res) => {
    res.render('pets/new')
})

router.get('/:id', (req, res) => {
    db.Pet.findOne({ _id: req.params.id })
        .populate('comments')
        .then(place => {
            console.log(pet.comments)
            res.render('pets/show', { pet })
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})

router.put('/:id', (req, res) => {
    db.Pet.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect(`/pets/${req.params.id}`)
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})

router.delete('/:id', (req, res) => {
    db.Pet.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/pets')
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})

router.get('/:id/edit', (req, res) => {
    db.Pet.findById(req.params.id)
        .then(pet => {
            res.render('pets/edit', { pet })
        })
        .catch(err => {
            res.render('error404')
        })
})

router.post('/:id/comment', (req, res) => {
    console.log('post comment', req.body)
    if (req.body.author === '') { req.body.author = undefined }
    
    db.Pet.findById(req.params.id)
        .then(pet => {
            db.Comment.create(req.body)
                .then(comment => {
                    place.comments.push(comment.id)
                    place.save()
                        .then(() => {
                            res.redirect(`/pets/${req.params.id}`)
                        })
                        .catch(err => {
                            res.render('error404')
                        })
                })
                .catch(err => {
                    res.render('error404')
                })
        })
        .catch(err => {
            res.render('error404')
        })
})

router.delete('/:id/comment/:commentId', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.commentId)
        .then(() => {
            console.log('Success')
            res.redirect(`/pets/${req.params.id}`)
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})


module.exports = router