import { NextRequest, NextResponse } from "next/server";
import { getSnapshot, upsertUser } from "@/cms/store";
import type { User, UserRole } from "@/types/cms";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ users: getSnapshot().users });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<User>;
  const user: User = {
    id: body.id || `user-${Date.now()}`,
    name: body.name?.trim() || "Untitled user",
    email: body.email?.trim() || "desk@goofygrab.press",
    role: (body.role as UserRole) || "author",
  };
  return NextResponse.json({ user: upsertUser(user) });
}
