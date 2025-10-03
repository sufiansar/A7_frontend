"use server";

import { getUserSession } from "@/helpers/userSession";
import { revalidateTag } from "next/cache";

export const getAuthHeaders = async (includeContentType: boolean = true) => {
  const session = await getUserSession();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to perform this action");
  }

  const headers: Record<string, string> = {};

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  const accessToken = (session as { accessToken?: string }).accessToken;
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return { headers, session };
};

export const makeApiCall = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  const result = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data: result,
  };
};

export const processArrayField = async (
  field: string | null
): Promise<string[]> => {
  if (!field) return [];
  return field
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export const revalidateCache = async (
  type: "blogs" | "projects" | "skills" | "user",
  id?: string
) => {
  revalidateTag(type);

  if (id) {
    revalidateTag(`${type}-${id}`);
  }
};

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      return result?.data?.fileUrl || null;
    }

    return null;
  } catch {
    return null;
  }
};
