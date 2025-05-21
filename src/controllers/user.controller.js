import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import {user} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // basic summary of task to be performed (planning case) logic building.
    // get user details from frontend
    // check validation (empty username,wrong username, incomplete password)
    // check if user already exist with same mail, same username
    // check for images, check for avatars 
    // upload data on cloudnary 
    // creating user object because in nosql like mongodb the objects are made 
    // create entry in db
    // remove password and refresh token field's from response
    // return response


    const {fullName,email,username,password} = req.body
    console.log("email", email)

    // if (fullName === ""){
    //     throw  new apiError(400, "fullName is required")
    // }

    if (
        [fullName,email,username,password].some(
            (field) => 
            field?.trim() === "")
    ) {
        throw new apiError(400, "all fields are compulasary")
        
    }

        const existedUser = User.findOne(
            {
                $or : [{username}, {email}]       
            }
        )

        if (existedUser) {
            throw new apiError(409,"User with same username and email exist's already!") 
        }


        const avatarLocalPath = req.files?.avatar[0]?.path
        const coverImageLocalPath = req.files?.coverImage[0]?.path 

        if (!avatarLocalPath) {

            throw new apiError(400, "Avatar file is required!")
        }
        
        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if (!avatar) {

            throw new apiError(400, "Avatar file is required!")
            
        }

        const user = await User.create({

            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username:username.toLowerCase()


        }) 

        const createdUser = await User.findByID(user._id).select(

            "-password -refreshToken " 
        )

        if (!createdUser) {
            throw new apiError(500,"Something went wrong at Registring the new User")
            
        }

        return res.status(201).json(
            new apiResponse(200, createdUser, "User Registered Successfully!")
        )

})

export { registerUser, } 