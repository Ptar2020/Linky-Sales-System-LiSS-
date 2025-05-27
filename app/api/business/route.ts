import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../user/authVerify";
import { dbConnect } from "@/app/database/db";
import { Business, User } from "@/app/models";
import { BusinessInterface } from "@/app/types";

// Create new business
export async function POST(request: NextRequest) {
  try {
    const authVerify = await middleware(request);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" });
    }
    const data = await request.json();
    await dbConnect();
    await new Business(data).save();
    return NextResponse.json({ success: "Business added" });
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : " Error experienced",
    });
  }
}

//Retreat all businesses
export async function GET() {
  try {
    await dbConnect();
    const businesses = await Business.find();
    const users = await User.find();
    console.log(businesses);
    console.log(users);
    // users.filter(user=>user.business == businesses._id)
    return NextResponse.json(businesses);
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error experienced",
    });
  }
}
