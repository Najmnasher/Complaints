const successResponse = (data = [], messages = []) => {
    return {
        success: true,
        data: data,
        messages: messages
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