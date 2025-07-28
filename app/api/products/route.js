import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const collection = await dbConnect("products");
  const products = await collection.find({}).toArray();

 

  return NextResponse.json(products);
}
