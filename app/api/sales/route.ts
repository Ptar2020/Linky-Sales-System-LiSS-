import { dbConnect } from "@/app/database/db";
import { Sale, Product } from "@/app/models";
import { ProductInterface } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../user/authVerify";

// Create a sale
export async function POST(request: NextRequest) {
  try {
    const saleData = await request.json();
    const authVerify = await middleware(request);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" });
    }
    await dbConnect();
    const availableState = await Product.findOne({
      _id: saleData.product,
    });
    availableState.available = false;
    await availableState.save();
    await new Sale(saleData).save();
    return NextResponse.json({ success: "Sold!" });
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error experienced",
    });
  }
}

// This is to retrieve sales by all sellers of a business
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
    const businessSales = await Sale.find().populate("seller");
    return NextResponse.json(businessSales);
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error experienced",
    });
  }
}
