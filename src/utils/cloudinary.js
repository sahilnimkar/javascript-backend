import {v2 as cloudinary} from "cloudinary"
import fs from "fs"   //file system in node.js 


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (loclFilePath) => {
    try {
        if (!loclFilePath) return null 
        const response = await cloudinary.uploader.upload(loclFilePath, {
            resource_type : "auto"

        })
        //file uploaded successfully
        console.log("file is uploaded on cloudinary", 
            response.url)
        return response

    } catch (error) {

        fs.unlinkSync(  loclFilePath) // this will remove local server saved temerory file if upload failed
        return null
    }
}


cloudinary.v2.uploader.upload("",
    {public_id : "olympic_flag"},
    function(error,result){console.log(result);}
)

export {uploadOnCloudinary}