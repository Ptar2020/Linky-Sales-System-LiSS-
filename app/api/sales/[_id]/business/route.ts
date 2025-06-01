import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../../user/authVerify";
import { dbConnect } from "@/app/database/db";
import { Sale, Product } from "@/app/models";
import { SaleInterface } from "@/app/types";

// Get all sales for each business
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
    const businessSales: SaleInterface[] = await Sale.find({
      "product?.business?._id": params._id,
    })
      .populate("seller")
      .populate("product");
    // console.log(businessSales);
    if (businessSales.length < 1) {
      return NextResponse.json({ msg: "No sales reports for this business" });
    }
    return NextResponse.json(businessSales);
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error experienced",
    });
  }
}
// Product.business._id = user.business._id
//seller.business._id
//product.business._id
