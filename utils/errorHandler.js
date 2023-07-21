class ErrorHandler extends Error{
    constructor(message,statusCode)
    {
        super(message);
        this.statusCode=statusCode;

        Error.captureStackTrace(this,this.constructor);
        // it represent the string location from which the error has occured
    }
}
module.exports=ErrorHandler; 