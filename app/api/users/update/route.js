import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, image } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const collection = await dbConnect("users");

    // We can update the user by their ObjectId if it's a valid hex, or providerAccountId if they are from OAuth.
    // In credentials login, `token.id` is the ObjectId string.
    let query;
    try {
      query = { _id: new ObjectId(token.id) };
    } catch (e) {
      // If token.id is not an ObjectId (e.g., from OAuth provider fallback), check providerAccountId
      query = { providerAccountId: token.id };
    }

    const updateResult = await collection.updateOne(
      query,
      {
        $set: {
          name: name.trim(),
          image: image ? image.trim() : "",
          updatedAt: new Date(),
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully", name, image });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
