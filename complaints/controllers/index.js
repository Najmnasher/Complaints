const models = require('../../models');
const { errorResponse, successResponse } = require('../../services/response');
const { complaintsTransformer } = require('../transformers');

const index = async(req, res) => {
    const complaints = await models.Complaint.findAll({
        include: [
            models.User,
            models.Company,
        ]
    })
    if (complaints) {
        return res.send(successResponse(complaintsTransformer(complaints)))
    }
    return res.send(errorResponse('No data found'))
}

const show = async (req, res) => {
    const { id } = req.params
    const complaint = await models.Complaint.findByPk(id, {
        include: [
            models.User,
            models.Company,
            models.Comment
        ]
    })
    if (complaint) {
        return res.send(successResponse(complaint))
    }
    return res.send(errorResponse('Complaint not found'))
}

const store = async (req, res, next) => {
    const { title, details, companyId } = req?.body;
    const complaint = await models.Complaint.create({
        title,
        details,
        companyId,
        userId: req.user.id,
        status: 0,
        verified: 0
    })
    if (complaint) {
        return res.send(successResponse(complaint, ['Complaint added successfully']))
    } else {
        return res.send(errorResponse('Complaint has not been added'))
    }
};

const verify = async (req, res, next) => {
    const { id } = req.params
    const { verified } = req.body
    const complaint = await models.Complaint.findByPk(id)
    if (complaint) {
        complaint.verified = Boolean(verified)
        await complaint.save()
        return res.send(successResponse(complaint, 'Complaint has been verified'))
    } else {
        return res.send(errorResponse(complaint, 'Complaint not found'))
    }
}

const changeStatus = async (req, res, next) => {
    const { id } = req.params
    const { newStatus } = req.body
    const complaint = await models.Complaint.findByPk(id)
    if (complaint) {
        complaint.status = Boolean(newStatus)
        await complaint.save()
        return res.send(successResponse(complaint, 'Complaint has been marked as resolved'))
    } else {
        return res.send(errorResponse(complaint, 'Complaint not found'))
    }
}


module.exports = {
    index,
    show,
    store,
    verify,
    changeStatus
}