import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../user/authVerify";
import { dbConnect } from "@/app/database/db";
import Business from "@/app/models/Business";
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
    return NextResponse.json({ msg: error.messaeS });
  }
}

//Retreat all businesses
export async function GET() {
  try {
    await dbConnect();
    const businesses = await Business.find();
    return NextResponse.json(businesses);
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
}
