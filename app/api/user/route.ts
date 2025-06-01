import { dbConnect } from "@/app/database/db";
import { User, About } from "@/app/models";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "./authVerify";
import { UserInterface } from "@/app/types";

// Get all users
export async function GET(request: NextRequest) {
  try {
    const authVerify = await middleware(request);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" });
    }
    await dbConnect();
    // const users: UserInterface[] = await User.find()
    const users = await User.find()
      .select("-password ")
      .populate("business")
      .lean();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error experienced",
    });
  }
}
