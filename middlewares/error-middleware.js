const errorMiddleware=()=>(err,req,res,next)=>{
    console.error('ErrorMiddleware:', err);
    const status=err.status || 500;
    const message=err.message || "BACKEND ERROR";
    const extraDetails=err.extraDetails || "Error from BACKEND";

    return res.status(status).json({message,extraDetails});
}
module.exports=errorMiddleware;