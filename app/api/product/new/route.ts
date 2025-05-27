import { dbConnect } from "@/app/database/db";
import Product from "@/app/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../user/authVerify";

// Create a new product
export async function POST(request: NextRequest) {
  try {
    const authVerify = await middleware(request);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" });
    }
    await dbConnect();
    const productData = await request.json();
    await new Product(productData).save();
    return NextResponse.json({ success: "Successful" });
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error experienced",
    });
  }
}
