module.exports = {

    successModel: {
        status: 'sucess',
        statusCode: 0,
        isSuccess: true,
        message: ''
    },
    failModel: {
        status: 'failed',
        statusCode: 1,
        isSuccess: false,
        message: 'Error encountered while processing request.'
    }
}
