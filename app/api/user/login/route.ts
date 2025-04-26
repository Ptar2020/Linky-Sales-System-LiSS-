import { dbConnect } from "@/app/database/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); //Connect to the database
    const { username, password } = await request.json();
    console.log(username);
    console.log(password);
    // Retrieve userdata equivalent to the input data
    const user = await User.find({ username: username });
    console.log(user);
  } catch (error) {
    return NextResponse.json({ msg: error });
  }
}
