const express = require('express')
const router = express.Router()
const {header, body, validationResult, oneOf} = require('express-validator')
const statusErr = {code: 400, description: 'Bad Request'}
const {
    createComment, findCommentsByPost, deleteComment
} = require('./controllers/commentController')

router.post('/api/createComment',
    header('token', 'Token is not a JWT')
        .isJWT(),
    body('text', 'Text field is null!')
        .notEmpty(),
    body('post', 'Post is not a numeric!')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return createComment(req, res)
    })

router.post('/api/findComments',
    body('post', 'Post is not a numeric')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return findCommentsByPost(req, res)
    })

router.post('/api/deleteComment',
    body('id', 'Id is not a numeric')
        .isNumeric(),
    header('token', 'Token is not a JWT')
        .isJWT(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return deleteComment(req, res)
    })

const {
    createPost, deletePost, findPost, findAuthorPosts
} =  require('./controllers/postController')

router.post('/api/deletePost',
    body('post', 'Post field not a numeric!')
        .isNumeric(),
    header('token', 'Token field not a JWT!')
        .isJWT(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return deletePost(req, res)
    })

router.post('/api/createPost',
    body('title', 'Title field null!')
        .notEmpty(),
    header('token', 'Token field not is JWT!')
        .isJWT(),
    body('text', 'Text field null!')
        .notEmpty(),
    oneOf([
        body('attachments', 'Attachments must be null or link')
            .isURL(),
        body('attachments', 'Attachments must be null or link')
            .isEmpty()]),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return createPost(req, res)
    })

router.post('/api/findPost',
    body('post', 'Post field not a numeric!')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return findPost(req, res)
    })

router.post('/api/findAuthorPosts',
    body('author', 'Author field not a numeric!')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return findAuthorPosts(req, res)
    })
module.exports = router