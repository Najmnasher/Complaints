const { errorResponse } = require('../services/response')
const authService = require('../services/auth')

const isUser = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1]
    if (token) {
        const decodedData = authService.verifyToken(token)
        if (decodedData.type == 'user') {
            req.user = decodedData
            return next()
        } else {
            return res.send(errorResponse(['You are not authorized to do this']))
        }
    } else {
        return res.send(errorResponse(['You are not authorized to do this']))
    }
}

module.exports = {
    isUser
}