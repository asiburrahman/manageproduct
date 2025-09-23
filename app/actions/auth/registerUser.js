"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNamesObj } from "@/app/lib/dbConnect";

export const registerUser = async (payload) => {
    const userCollection = dbConnect('users')

    // Validation
    const { email, password } = payload;
    if (!email || !password) return null;

    const user = await userCollection.findOne({ email: payload.email })

    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10)
        payload.password = hashedPassword
        payload.role = "user"
        const result = await userCollection.insertOne(payload);
        result.insertedId = result.insertedId.toString()
        return result;
    }
    return null;


}