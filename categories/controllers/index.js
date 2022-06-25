const models = require('../../models')

const index = async (req, res, next) => {
    const categories = await models.Category.findAll()
    if (categories) {
        res.send({
            success: true,
            data: categories,
            messages: []
        })
    } else {
        res.send({
            success: true,
            data: [],
            messages: ['We do not have categories']
        })
    }
}

const store = async (req, res, next) => {
    const name = (req?.body?.name)
    if (typeof name == 'undefined') {
        return res.send({
            success: false,
            messages: ['Please provide a name']
        })
    }
    if (name?.length < 2) {
        return res.send({
            success: false,
            messages: ['Name is too short']
        })
    }
    const [category, created] = await models.Category.findOrCreate({
        where: {
            name: name
        }
    })
    if (created) {
        return res.send({
            success: true,
            messages: ['Category has been created']
        })
    } else {
        return res.send({
            success: false,
            messages: ['Category is duplicated']
        })
    }
}

const show = async (req, res, next) => {
    const id = req.params.id
    const category = await models.Category.findByPk(id)
    if (category) {
        return res.send({
            success: true,
            data: category
        })
    } else {
        return res.send({
            success: false,
            messages: ['Category not found']
        })
    }
}

const update = async (req, res, next) => {
    const id = req.params.id
    const name = req.body.name
    const category = await models.Category.findByPk(id)
    if (category) {
        if (name.length >= 2) {
            category.name = name
        }
        const cat = await category.save()
        return res.send({
            success: true,
            data: cat
        })
    } else {
        return res.send({
            success: false,
            messages: ['Category not found']
        })
    }
}

const destroy = async (req, res, next) => {
    const id = req.params.id
    const category = await models.Category.findByPk(id)
    if (category) {
        const deleting = await category.destroy()
        if (deleting) {
            return res.send({
                success: true,
                messages: ['Category has been deleted']
            })
        }
    } else {
        return res.send({
            success: false,
            messages: ['Category not found']
        })
    }

}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}