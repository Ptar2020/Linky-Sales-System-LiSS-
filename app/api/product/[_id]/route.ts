import { Product, Sale } from "@/app/models";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../user/authVerify";
import { dbConnect } from "@/app/database/db";

// Get all products for a particular business
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
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error experienced",
    });
  }
}

// Edit a product
export async function PATCH(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  const authVerify = await middleware(request);
  if (!authVerify) {
    return NextResponse.json({ msg: "Unauthorized access" });
  }
  const data = await request.json();
  await dbConnect();
  const productToEdit = await Product.findById(params._id);
  if (!productToEdit) {
    return NextResponse.json({ msg: "No such product exists" });
  }
  // Apply updates and save
  Object.assign(productToEdit, data);
  await productToEdit.save();
}

// Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    const authVerify = await middleware(request);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" }, { status: 401 });
    }
    await dbConnect();

    // Find the product to delete
    const productToDelete = await Product.findById(params._id);
    if (!productToDelete) {
      return NextResponse.json(
        { msg: "No such product exists" },
        { status: 404 }
      );
    }

    // Delete associated sale, if it exists
    const sale = await Sale.findOne({ product: params._id });
    if (sale) {
      await Sale.deleteOne({ _id: sale._id }); // Use proper filter
    }

    // Delete the product
    await Product.deleteOne({ _id: params._id });

    return NextResponse.json(
      { success: "Product and associated sale deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
}
