import { getAuthHeaders, makeApiCall, revalidateCache } from "./apiUtils";

export const getBlogsPublic = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_API) {
      return [];
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      next: { tags: ["blogs"], revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data?.data || [];
  } catch {
    return [];
  }
};

export const getBlogs = async () => {
  try {
    const { headers } = await getAuthHeaders();

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs`,
      {
        method: "GET",
        headers,
      }
    );

    if (ok && result?.data) {
      return result.data;
    }

    return [];
  } catch {
    return [];
  }
};

export const getBlogById = async (id: string) => {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_API) {
      return null;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      next: { tags: ["blogs", `blog-${id}`], revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data || null;
  } catch {
    return null;
  }
};

export const createBlog = async (data: FormData) => {
  try {
    const { getSession } = await import("next-auth/react");
    const session = await getSession();

    if (!session?.user?.id) {
      return { error: "User authentication required" };
    }

    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const excerpt = data.get("excerpt") as string;
    const tags = data.get("tags") as string;
    const published = data.get("published") === "true";
    const coverImageFile = data.get("file") as File;

    if (!title?.trim()) {
      return { error: "Title is required" };
    }

    if (!content?.trim()) {
      return { error: "Content is required" };
    }

    const formData = new FormData();

    const tagsArray = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    const baseSlug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    const slug = `${baseSlug}-${Date.now()}`;

    const blogData = {
      title: title.trim(),
      slug: slug,
      content: content.trim(),
      excerpt: excerpt?.trim() || "",
      tags: tagsArray,
      published: Boolean(published),
      authorId: session.user.id,
    };

    formData.append("data", JSON.stringify(blogData));

    if (coverImageFile && coverImageFile.size > 0) {
      formData.append("file", coverImageFile);
    }

    const headers: Record<string, string> = {};
    const accessToken = (session as { accessToken?: string }).accessToken;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/create`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

    if (ok) {
      revalidateCache("blogs");
      return { success: true, data: result?.data };
    }

    return { error: result?.message || "Failed to create blog" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create blog",
    };
  }
};

export const updateBlog = async (id: string, data: FormData) => {
  try {
    const { session } = await getAuthHeaders(false);

    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const excerpt = data.get("excerpt") as string;
    const tags = data.get("tags") as string;
    const published = data.get("published") === "true";
    const coverImageFile = data.get("file") as File;

    const formData = new FormData();

    const tagsArray = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    const blogData = {
      title: title.trim(),
      slug: slug,
      content: content.trim(),
      excerpt: excerpt?.trim() || "",
      tags: tagsArray,
      published: Boolean(published),
    };

    formData.append("data", JSON.stringify(blogData));

    if (coverImageFile && coverImageFile.size > 0) {
      formData.append("file", coverImageFile);
    }

    const headers: Record<string, string> = {};
    const accessToken = (session as { accessToken?: string }).accessToken;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`,
      {
        method: "PATCH",
        headers,
        body: formData,
      }
    );

    if (ok) {
      revalidateCache("blogs", id);
      return { success: true, data: result?.data };
    }

    return { error: result?.message || "Failed to update blog" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update blog",
    };
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const { headers } = await getAuthHeaders();

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (ok) {
      revalidateCache("blogs", id);
      return { success: true };
    } else {
      return { error: result.message || "Failed to delete blog" };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
};
