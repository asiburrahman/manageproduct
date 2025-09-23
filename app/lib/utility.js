"use server";
import axios from "axios"
import bcrypt from "bcrypt";
import dbConnect from "./dbConnect";
let imageUploadAPI = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
// upload image and return image url
export const uploadImage = async imageFile => {
  const imageData = new FormData()
  imageData.append('image', imageFile)
  // console.log("Env Key Is: ", imageUploadAPI);
  

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${imageUploadAPI}`,
    imageData
  )
  // image url response from imgbb
  return data?.data?.display_url
}

export const saveUserDataInDB = async (payload) =>{
    const userCollection = await dbConnect("users");

    // console.log(payload);
     // Validation
    const { email, password } = payload;
    if (!email || !password) return null;

    const user = await userCollection.findOne({ email: payload.email })

    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10)
        payload.password = hashedPassword
        const result = await userCollection.insertOne(payload);
        result.insertedId = result.insertedId.toString()
        // console.log(result);
        
        return result;
    }
    return null;
    

}