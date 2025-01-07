import BlogPost from "@/Models/blogpost.model";
import { connectMongodb } from "@/lib/connectmongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, content } = await request.json();

  try {
    await connectMongodb();
  } catch (error) {
    return NextResponse.json(
      { message: "Error connection to db" },
      { status: 500 }
    );
  }

  const titleExist = await BlogPost.findOne({
    title,
    content,
  });

  if (!titleExist) {
    await BlogPost.create({
      title,
      content,
    });
    return NextResponse.json(
      { message: "Blogpost created successfully" },
      {
        status: 201,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "Error creating blog",
      },
      {
        status: 409,
      }
    );
  }
}

export async function GET() {
  try {
    await connectMongodb();
  } catch (error) {
    return NextResponse.json(
      { message: "Error connecting to the database" },
      { status: 500 }
    );
  }

  try {
    const blogposts = await BlogPost.find().limit(5);
    return NextResponse.json(blogposts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blogposts", error: error.message },
      { status: 500 }
    );
  }
}
