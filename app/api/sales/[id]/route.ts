import { dbConnect } from "@/app/database/db";
import { Sale, Product } from "@/app/models";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../user/authVerify";

// Get sales per user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authVerify = await middleware(request);
  if (!authVerify) {
    return NextResponse.json({ msg: "Unauthorized response" });
  }
  await dbConnect();
  const allSalesData = await Sale.find({
    seller: params.id,
  }).populate("product");

  return NextResponse.json(allSalesData);
}
