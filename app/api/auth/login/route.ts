import DBConnect from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  await DBConnect();

  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Ensure JWT secret is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });

    // Set HTTP-Only Cookie
    response.cookies.set("token", token, {
      httpOnly: true, 
      secure: true,
      sameSite: "strict",
      path: "/", 
      maxAge: 60 * 60, 
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred", details: (error as Error).message },
      { status: 500 }
    );
  }
}
