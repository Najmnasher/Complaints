
const { errorResponse, successResponse } = require('../../helpers/response')
const models = require('../../models')
const { Op } = require("sequelize")
const authService = require('../../services/auth')


const signUp = async (req, res, next) => {
    const email = req?.body?.email
    const username = req?.body?.username
    const password = req?.body?.password
    
    if (password?.length < 4) {
        return res.send(errorResponse('Password is invalid'))
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        return res.send(errorResponse('Email is invalid'))
    }
    const [user, created] = await models.User.findOrCreate({
        where: {
            [Op.or]: [
                { username },
                { email }
            ]
        },
        defaults: {
            password: authService.hashPassword(password),
            username,
            email
        }
    })
    if(created)
        return res.send(successResponse('User created successfully'))
    else 
        return  res.send(errorResponse('User is already registered'))    
}

const signIn = async (req, res, next) => {
    var email = req?.body?.email
    var password = req?.body?.password
    let user = await models.User.findOne({
        where: {
            email
        }
    })
    if (user) {
        if (authService.comparePasswords(password, user.password)) {
            user = {
                ...user, 
                type: 'user'
            }
            res.send(successResponse('', [], {token: authService.signUser(user)}))
        } else {
            res.send(errorResponse('Password is wrong'))
        }
    } else {
        res.send(errorResponse('email is wrong'))
    }
}



module.exports = {
    signUp,
    signIn
}