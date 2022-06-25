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



module.exports = {
    store,
    destroy
}