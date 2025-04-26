import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await User.find();
    console.log("USERS");
    console.log(users);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
