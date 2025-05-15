
// Production grade wrapper function using Promise

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Production grade wrapper function to use in common proj with try-catch

// const asyncHandler = (fn) => async (req,res,next) => {
//     try{

//     }catch(error){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

export { asyncHandler }

// const asyncHandler = () => {}
// const asyncHandler = (function) => {() => {}}
// const asyncHandler = (function) => async() => {}


    

