

  const errorHandlerExpress = (err,request,response,next)=>{
    const errorStatusCode =  response.statusCode ? response.statusCode : 500
    response.status(errorStatusCode)

    response.json({
        message: err.message,
        stack: process.env.NODE_ENV == 'production' ? null : ''
    })

}
export default errorHandlerExpress