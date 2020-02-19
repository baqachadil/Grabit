var express = require('express')
var router = express.Router()
const User = require('../Models/User')
const jwt = require('jsonwebtoken')


router.post('/auth', async (req, res) => {
    let user
    try {
        user = await User.findOne({id: req.body.id})
        if (! user) {
            user = new User({...req.body})
        }

        await user.save()

        const {id} = user
        jwt.sign({id}, "Adil0122", (err, token) => {
            if (err) 
                res.status(500).json({error: err.message})
            
            res.status(200).json({token})
        })

    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

const validateToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    
    if(typeof auth !== 'undefined'){
        const bearer = auth.split(' ')
        const token = bearer[1]
        req.token = token
        next()
    }else{
        res.status(400).json({message: "Forbiden"})
    }    
}

router.get('/getCurrentUser', validateToken, async (req, res) => {
    let user

    await jwt.verify(req.token, "Adil0122", async (err, authData) => {
        if(err){
            res.status(400).json({message: err.message})
        }

        user = await User.findOne({id: authData.id})
        res.status(200).json(user)
    })
})

module.exports = router
