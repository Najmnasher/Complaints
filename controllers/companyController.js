const { successResponse , errorResponse } = require("../helpers/response")
const models = require('../models')
const authService = require("../services/auth")
const{ Op  }=require('sequelize')

async function getCompanies (req, res) {
    const companies = await models.Company.findAll({})
    if (companies) {
        res.send(successResponse('Success', companies))
    } else {
        res.send(errorResponse('There was an error'))
    }
}

const setCompany = async (req, res, next) => {
    const name = req?.body?.name
    const categoryId = req?.body?.categoryId
    const email = req?.body?.email
    const phone = req?.body?.name
    const address = req?.body?.address
    const password = req?.body?.password
    const about = req?.body?.about
    const opening = req?.body?.opening

    if (name?.length < 4) {
        return res.send(errorResponse('name is invalid'))
    }
    if (!categoryId) {
        return res.send(errorResponse('categoryId is invalid'))
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


module.exports={
    getCompanies,
    setCompany
}