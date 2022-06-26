const { errorResponse } = require("../services/response")

const userIsOwner = (req, res, next) => {
    const { id } = req.params
    if (id == req.user.id) {
        return next()
    } else {
        return res.send(errorResponse('You are not allowed to access this endpoint'))
    }
}

module.exports = {
    userIsOwner
}