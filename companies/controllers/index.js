const { errorResponse, successResponse } = require('../../helpers/response')
const models = require('../../models')
const { Op } = require("sequelize")
const authService = require('../../services/auth')


const signIn = async (req, res, next) => {
    var email = req?.body?.email
    var password = req?.body?.password
    let company = await models.Company.findOne({
        where: {
            email
        }
    })////////////////////////////////////////////////
    if (company) {
        if (authService.comparePasswords(password, company.password)) {
            company = {
                ...company, 
                type: 'company'
            }
            res.send(successResponse('', [], {token: authService.signUser(company, 'company')}))
        } else {
            res.send(errorResponse('Password is wrong'))
        }
    } else {
        res.send(errorResponse('email or name is wrong'))
    }
}

async function getCompanies (req, res) {
    const companies = await models.Company.findAll({})
    if (companies) {
        res.send(successResponse('Success', companies))
    } else {
        res.send(errorResponse('There was an error'))
    }
}

const signUp = async (req, res, next) => {
    const name = req?.body?.name
    const categoryId = req?.body?.categoryId
    const email = req?.body?.email
    const phone = req?.body?.phone
    const address = req?.body?.address
    const password = req?.body?.password
    const about = req?.body?.about
    const opening = req?.body?.opening

    if (name?.length < 4) {
        return res.send(errorResponse('name is invalid'))
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        return res.send(errorResponse('Email is invalid'))
    }
    if (phone?.length < 4) {
        return res.send(errorResponse('phone is invalid'))
    }
    if (address?.length < 4) {
        return res.send(errorResponse('address is invalid'))
    }
    if (about?.length < 5) {
        return res.send(errorResponse('about is invalid'))
    }
    if (opening?.length < 5) {
        return res.send(errorResponse('opening is invalid'))
    }
    const [company, created] = await models.Company.findOrCreate({
        where: {
            [Op.or]: [
                { name },
                { email }
            ]
        },
        defaults: {
            password: authService.hashPassword(password),
            name,
            email, 
            categoryId,
            phone,
            address,
            about,
            opening: new Date(opening)
        }
    })
    if(created)
        return res.send(successResponse('company created successfully'))
    else 
        return  res.send(errorResponse('company is already registered'))    
}



module.exports = {
    signUp,
    signIn,
    getCompanies
}