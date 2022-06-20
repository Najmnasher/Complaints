
const { errorResponse, successResponse } = require('../../helpers/response')
const models = require('../../models')
const { Op } = require("sequelize")
const authService = require('../../services/auth')


const signUp = async (req, res, next) => {
    try {
        
    const name = req?.body?.name
    const email = req?.body?.email
    const address = req?.body?.address
    const password = req?.body?.password
    const phone = req?.body?.phone
    const about = req?.body?.about
    if (name?.length < 4) {
        return res.send(errorResponse('Name is invalid'))
    }
    if (password?.length < 4) {
        return res.send(errorResponse('Password is invalid'))
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        return res.send(errorResponse('Email is invalid'))
    }
    if (address?.length < 4) {
        return res.send(errorResponse('address is invalid'))
    }
    if (phone?.length < 4) {
        return res.send(errorResponse('phone is invalid'))
    }
    if (!about) {
        return res.send(errorResponse('about is invalid'))
    }
    const [Company, created] = await models.Company.findOrCreate({
        where: {
                name,
                email
        },
        defaults: {
            name,
            email,
            password: authService.hashPassword(password),
            address,
            phone,
            about
        }
    })
    if(created)
        return res.send(successResponse('Company created successfully'))
    else 
        return  res.send(errorResponse('Company is already registered'))
    }catch(err){
        console.log("ERROR---> ", err)
        
        return res.send(errorResponse('error with server'))
    }    
}

const signIn = async (req, res, next) => {
    var nameOremail = req?.body?.nameOremail
    var password = req?.body?.password
    let company = await models.User.findOne({
        where: {
            [Op.or] : [
                {email : nameOremail},
                {name : nameOremail}
            ]
        }
    })////////////////////////////////////////////////
    if (company) {
        if (authService.comparePasswords(password, company.password)) {
            company = {
                ...company, 
                type: 'company'
            }
            res.send(successResponse('', [], {token: authService.signUser(company)}))
        } else {
            res.send(errorResponse('Password is wrong'))
        }
    } else {
        res.send(errorResponse('email or name is wrong'))
    }
}



module.exports = {
    signUp,
    signIn
}