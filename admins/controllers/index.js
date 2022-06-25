const models = require('../../models')
const authService = require('../../services/auth')
const { successResponse, errorResponse } = require('../../services/response')

const store = async (req, res, next) => {
    const { name, email, password} = req.body
    const [admin, created] = await models.Admin.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            name: name,
            password: authService.hashPassword(password)
        }
    })
    if (created) {
        return res.send(successResponse([], ['Admin has been created']))
    } else {
        return res.send(errorResponse(['Admin is duplicated']))
    }
}

const destroy = async (req, res, next) => {
    const id = req.params.id
    const admin = await models.Admin.findByPk(id)
    if (admin) {
        const deleting = await admin.destroy()
        if (deleting) {
            return res.send({
                success: true,
                messages: ['Admin has been deleted']
            })
        }
    } else {
        return res.send({
            success: false,
            messages: ['Admin not found']
        })
    }

}

const signIn = async (req, res, next) => {
    const { email, password } = req.body
    const admin = await models.Admin.findOne({
        where: {
            email: email
        }
    })
    if (admin) {
        if (authService.comparePasswords(password, admin.password)) {
            return res.send(successResponse(null, null, {
                token: authService.signUser(admin, 'admin')
            }))
        } else {
            return res.send(errorResponse(['Password is invalid']))
        }
    } else {
        return res.send(errorResponse(['Email is invalid']))
    }
}

module.exports = {
    store,
    destroy,
    signIn
}