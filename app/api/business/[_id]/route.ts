import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../user/authVerify";
import { dbConnect } from "@/app/database/db";
import { BusinessInterface } from "@/app/types";
import { Product, Business, User } from "@/app/models";

// Delete a business with all it's products
export async function DELETE(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    console.log(params);
    // Middleware check
    const authVerify = await middleware(req);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" }, { status: 401 });
    }

    // DB connection
    await dbConnect();

    // Find the business to delete
    const businessToDelete = await Business.findById(params._id);
    // const businessToDelete: BusinessInterface | null = await Business.findById(
    //   params._id
    // );
    console.log(businessToDelete);
    if (!businessToDelete) {
      return NextResponse.json(
        { msg: "Business does not exist" },
        { status: 404 }
      );
    }

    // Delete associated products
    await Product.deleteMany({ business: params._id });

    // Delete associated users
    await User.deleteMany({ business: params._id });

    // Delete the business
    await businessToDelete.deleteOne();

    // Return success message
    return NextResponse.json(
      { success: "Business and associates deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        msg:
          err instanceof Error ? err.message : "Unexpected error experienced",
      },
      { status: 500 }
    );
  }
}
