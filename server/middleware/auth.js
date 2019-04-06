const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE)

        const user = await User.findById(decoded._id)
        if(!user) {
            throw new Error('ESTO HA EXPLOTADO')
        }
        res.locals.user = user;
        next()
    } catch(e) {
        console.log('middlware => ', e.message)
        res.status(401).send({ message: "Please authenticate" })
    }
    
}

module.exports = auth