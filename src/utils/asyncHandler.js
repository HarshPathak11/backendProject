const asyncHandler=(requestHandle)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandle(req,res,next)).catch((error)=> next(error))
    }
}



export {asyncHandler}






// // Handling the  async calls using Try Catch

// const asyncHandler=(func)=>async(req,res,next)=>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(err.code||500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }