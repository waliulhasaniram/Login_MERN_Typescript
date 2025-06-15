class ApiError extends Error {
    statusCode: number;
    errors: any[];
    data: any;
    success: boolean;

    constructor(
        statusCode = 500,
        message = 'something went wrong.',
        errors = [],
        stack = ''
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
        this.data = null
        this.success = false
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError;