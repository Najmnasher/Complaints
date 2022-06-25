const successResponse = (data = [], messages = [], extra = {}) => {
    return {
        success: true,
        data: data,
        messages: messages,
        ...extra
    }
}

const errorResponse = (messages = [], data = []) => {
    return {
        success: false,
        data: data,
        messages: messages
    }
}

module.exports = {
    successResponse,
    errorResponse
}