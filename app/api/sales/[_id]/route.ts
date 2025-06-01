import { dbConnect } from "@/app/database/db";
import { Sale, Product } from "@/app/models";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../user/authVerify";

// Get sales per user
export async function GET(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  console.log(params);
  const authVerify = await middleware(request);
  if (!authVerify) {
    return NextResponse.json({ msg: "Unauthorized response" });
  }
  await dbConnect();
  // console.log(await Sale.find());
  const userSalesData = await Sale.find({
    seller: params._id,
  }).populate("product");

  return NextResponse.json(userSalesData);
}
