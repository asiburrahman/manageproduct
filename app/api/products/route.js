import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const collection = await dbConnect("products");
  const products = await collection.find({}).toArray();

 

  return NextResponse.json(products);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("products");

    const newProduct = {
      ...body,
      price: parseFloat(body.price),
      stock: parseInt(body.stock),
      discount: parseInt(body.discount),
      rating: parseFloat(body.rating),
      createdAt: new Date(),
    };

    await collection.insertOne(newProduct);

    return NextResponse.json({ message: "Product added!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}