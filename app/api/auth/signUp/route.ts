import DBConnect from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await DBConnect();

    const { name, email, password } = await req.json();

    console.log(name,email,password)

     if (!name || !email || !password) {
       return NextResponse.json({ message: "All fields are required" }, { status: 400 });
     }



     const existingUser = await User.findOne({ email });
     if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
     }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
