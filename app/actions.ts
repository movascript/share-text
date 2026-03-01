"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, lt } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function createPostAction(
  content: string,
  expiry: string, // "10m" | "1h" | "24h" | "1w" | "1y"
  encrypted: boolean,
) {
  if (!content || content.length > 20000) {
    return { error: "متن نامعتبر یا بیش از حد طولانی است." };
  }

  const id = nanoid(8);
  const now = new Date();
  let expiresAt: Date = new Date(now.getTime() + 10 * 60 * 1000); // default 10m

  switch (expiry) {
    case "10m":
      expiresAt = new Date(now.getTime() + 10 * 60 * 1000);
      break;
    case "1h":
      expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
      break;
    case "24h":
      expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    case "1w":
      expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
    case "1y":
      expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
      break;
  }

  try {
    await db.insert(posts).values({
      id,
      content,
      expiresAt,
      encrypted,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "خطا در ذخیره سازی اطلاعات." };
  }

  redirect(`/${id}`);
}

export async function getPostData(id: string) {
  // cleanup expired content
  await db.delete(posts).where(lt(posts.expiresAt, new Date()));

  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  const post = result[0];

  if (!post) return null;

  return {
    content: post.content,
    createdAt: post.createdAt,
    encrypted: post.encrypted,
  };
}
