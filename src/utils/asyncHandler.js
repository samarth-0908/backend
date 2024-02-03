// using promises
const asyncHandler = (requstHandler) => {
(req, res, next) => {
    Promise.resolve(requstHandler(req,res, next)).catch((err) => next(err))
}
}



export { asyncHandler }



//using try-catch
// asyncHandler - higher order function
// const asyncHandler  = (fn) => async (req , res ,next) => {
//     try{
//         await fn(req, res, next)
//     } catch(error){
//         res.status(err.code || 500).json({
//             success: false,
//             message:err.message
//         })
//     }
// }