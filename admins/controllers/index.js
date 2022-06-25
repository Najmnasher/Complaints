const models = require('../../models')
const authService = require('../../services/auth')

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
        return res.send({
            success: true,
            messages: ['Admin has been created']
        })
    } else {
        return res.send({
            success: false,
            messages: ['Admin is duplicated']
        })
    }
}

const destroy = async () => {
    
}

module.exports = {
    store,
    destroy
}