import { Product } from "@/app/models";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../user/authVerify";
import { dbConnect } from "@/app/database/db";

// Route for all products for a particular business
export async function GET(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    const authVerify = await middleware(request);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" });
    }
    await dbConnect();
    const products = await Product.find({ business: params?._id });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
}
