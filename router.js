const express = require('express')
const router = express.Router()
const {header, body, validationResult, oneOf} = require('express-validator')
const statusErr = {code: 400, description: 'Bad Request'}
const {
    sendMessage, getChatList, getMessages, readMessage
} = require('./controllers/messagesController')

router.post('/api/sendMessage',
    header('token', 'Token is not a JWT')
        .isJWT(),
    body('text', 'Text field is null!')
        .notEmpty(),
    body('receiver', 'Receiver is not a numeric!')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return sendMessage(req, res)
    })

router.post('/api/getMessages',
    body('receiver', 'Receiver is not a numeric')
        .isNumeric(),
    header('token', 'Token is not a JWT')
        .isJWT(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return getMessages(req, res)
    })

router.post('/api/getChatList',
    header('token', 'Token is not a JWT')
        .isJWT(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return getChatList(req, res)
    })

router.post('/api/readMessage',
    body('id', 'id message field not a numeric!')
        .isNumeric(),
    header('token', 'Token field not a JWT!')
        .isJWT(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return readMessage(req, res)
    })

module.exports = router