const models = require('../../models')
const { errorResponse, successResponse } = require('../../services/response')

const store = async (req, res) => {
    const { complaintId, content } = req.body
    const userData = {}
    if (req.user.type == 'user') {
        userData.userId = req.user.id
    } else if (req.user.type == 'company') {
        userData.companyId = req.user.id
    } else {
        return res.send(errorResponse('Unknown Error'))
    }
    const comment = await models.Comment.create({
        complaintId,
        content,
        ...userData
    })
    if (comment) {
        return res.send(successResponse(comment, 'Comment added successfully'))
    } else {
        return res.send(errorResponse('Unknown Error'))
    }
}

const destroy = async (req, res) => {
    const { id } = req.params
    const comment = await models.Comment.findByPk(id)
    if (comment) {
        await comment.destroy()
        res.send(successResponse(null, 'Comment has been deleted'))
    } else {
        res.send(errorResponse('An error occurred'))
    }
}

module.exports = {
    store,
    destroy
}