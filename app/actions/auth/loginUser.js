"use server";

import dbConnect from "@/app/lib/dbConnect";
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = await dbConnect("users"); // ✅ Added await here too
  const user = await userCollection.findOne({ email });
  // console.log(user);

  if (!user) return null;

  const isPasswordOK = await bcrypt.compare(password, user.password); // ✅ Await added

  if (!isPasswordOK) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image || null,
    role: user.role || "user",
  };
};