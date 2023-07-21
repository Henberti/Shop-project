
class CustomError extends Error{

    constructor({message, statusCode, data}){
        super(message)
        this.statusCode = statusCode;
        this.data = data;
    }


}

const handleErrorSend = (error,req,res, next)=>{
    const statusCode = error.statusCode || 500
        const message = error.message || 'unknown error'

        return res.status(statusCode).json({
            status:statusCode,
            message:message,
            data:error?.data ?? []  
        })

}

module.exports = {
    CustomError, handleErrorSend
}

