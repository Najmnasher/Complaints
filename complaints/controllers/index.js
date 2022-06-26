const models = require('../../models');
const { errorResponse, successResponse } = require('../../services/response')

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
    store,
    verify,
    changeStatus
}