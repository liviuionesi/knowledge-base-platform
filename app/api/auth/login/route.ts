import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface User {
  username: string;
  password: string;
  displayName: string;
  role: string;
  active: boolean;
}

interface UsersData {
  users: User[];
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Read users from data/users.json
    const usersFilePath = path.join(process.cwd(), "data", "users.json");
    
    let usersData: UsersData;
    try {
      const fileContents = fs.readFileSync(usersFilePath, "utf8");
      usersData = JSON.parse(fileContents);
    } catch (error) {
      console.error("Error reading users.json:", error);
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Find user by username
    const user = usersData.users.find(
      (u) => u.username === username && u.active === true
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Validate password
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Create the response
    const response = NextResponse.json({ 
      success: true,
      user: {
        username: user.username,
        displayName: user.displayName,
        role: user.role
      }
    });

    // Set the session cookie
    // Max age: 30 days (seconds)
    const thirtyDays = 30 * 24 * 60 * 60;
    
    // Store username in cookie for potential future personalization
    response.cookies.set("phenix_session", `${user.username}:authenticated`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: thirtyDays,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
