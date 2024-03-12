import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.CLOUD_API_KEY, 
  api_secret:process.env.CLOUD_API_SECRET 
});


const uploadLocalFile= async (localfilepath)=>{
    try {
        if(!localfilepath) return null;
       const response= cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        console.log("file is successfully uploaded");
        console.log(response.url)
        return response;
    } catch (error) {
        // since you are not able to upload the file it is recommended to delete them from the server
        fs.unlinkSync(localfilepath)
        console.log(err.message)
        return null;
    }
}

export {uploadLocalFile}