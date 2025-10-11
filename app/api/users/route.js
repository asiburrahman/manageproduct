import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const collection = await dbConnect("users");
  const users = await collection.find({}).toArray();

 

  return NextResponse.json(users);
}