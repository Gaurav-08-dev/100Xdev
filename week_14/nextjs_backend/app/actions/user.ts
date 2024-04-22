"use server";
import { NextResponse } from "next/server";
import client from "../../db";

export async function signup(username: string, password: string) {
  try {
    await client.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    return "Signup!!";
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while signing up",
      },
      {
        status: 411,
      }
    );
  }
}
