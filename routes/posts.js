var express = require('express');
var router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated')

const Post = require('../models/Post')

const Comment = require('../models/Comment')

router.get('/', (req, res, next) => {

    Post.find()
      .populate("country author likes")
      .populate({
        path: "comments",
        populate: { path: "author" },
      })
      .sort({ createdAt: -1 })
      .then((foundPosts) => {
        res.json(foundPosts);
      })
      .catch((err) => {
        console.log(err);
      });

})

router.get('/user-posts/:id', (req, res, next) => {
    Post.find({author: req.params.id})
    .populate("country author likes")
    .populate({
      path: "comments",
      populate: { path: "author" },
    })
    .sort({ createdAt: -1 })
    .then((foundPosts) => {
      res.json(foundPosts);
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get('/detail/:id', (req, res, next) => {

    Post.findById(req.params.id)
        .populate('country author likes')
        .populate({
            path: 'comments', 
            populate: {path: 'author'}
        })
        .then((foundPost) => {
            res.json(foundPost)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.post('/create', isAuthenticated, (req, res, next) => {

    const { title, story, image, country } = req.body;

    Post.create({
      title,
      story,
      image,
      country,
      author: req.user._id,
    })
      .then((createdPost) => {
        return createdPost
      })
      .then((toPopulate) => {
        return toPopulate.populate("country author likes")
    })
      .then((populated) => {
        res.json(populated)
      })
      .catch((err) => {
        console.log(err);
      });

})

router.post('/update/:id', (req, res, next) => {

    Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        story: req.body.story,
        image: req.body.image
    },
        {
            new: true
        })
        .populate('country author likes')
        .populate({
            path: 'comments', 
            populate: {path: 'author'}
        })
        .then((updatedPost) => {
            res.json(updatedPost)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/delete/:id', (req, res, next) => {

    Post.findByIdAndDelete(req.params.id)
        .then((deletedResult) => {
            res.json(deletedResult)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/post', (req, res, next) => {
  Post.find()
  .populate('author')
  .then((foundPosts) => {
    console.log("these are the found posts")
    res.json(foundPosts)
  })
  .catch((err) => {
    console.log(err)
    res.json(err)
  })
})

module.exports = router;
