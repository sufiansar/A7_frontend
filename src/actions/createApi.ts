"use server";

import { getUserSession } from "@/helpers/userSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// Helper function to upload image
export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      return result.url || result.imageUrl || result.filePath;
    }
    return null;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const create = async (data: FormData) => {
  const session = await getUserSession();
  const blogInfo = Object.fromEntries(data.entries());

  let coverImageUrl = blogInfo.coverImage;
  const imageFile = data.get("coverImageFile") as File;

  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImage(imageFile);
    if (uploadedUrl) {
      coverImageUrl = uploadedUrl;
    }
  }

  const modifiedData = {
    title: blogInfo.title,
    content: blogInfo.content,
    excerpt: blogInfo.excerpt || "",
    tags: blogInfo.tags
      ? blogInfo.tags
          .toString()
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [],
    coverImage: coverImageUrl || "",
    published: blogInfo.published === "true",
    authorId: session?.user?.id,
    isFeatured: Boolean(blogInfo.isFeatured),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();

  if (result?.id) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs");
    revalidatePath("/dashboard/blogs");
    return { success: true, id: result.id };
  }
  return { success: false, error: result.message || "Failed to create blog" };
};

export const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["BLOGS"],
      },
    });

    if (!res.ok) {
      console.warn("Failed to fetch blogs from API");
      return [];
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.blogs)) {
      return data.blogs;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn("API response is not in expected format");
      return [];
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlogById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["BLOGS", `BLOG_${id}`],
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch blog with id: ${id}`);
      return null;
    }

    const data = await res.json();

    if (data && data.id) {
      return data;
    } else if (data && data.blog) {
      return data.blog;
    } else if (data && data.data) {
      return data.data;
    } else {
      console.warn("API response is not in expected format");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    return null;
  }
};

// Blog Update Function
export const updateBlog = async (id: string, data: FormData) => {
  try {
    const session = await getUserSession();
    const blogInfo = Object.fromEntries(data.entries());

    // Handle image upload if present
    let coverImageUrl = blogInfo.coverImage;
    const imageFile = data.get("coverImageFile") as File;

    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        coverImageUrl = uploadedUrl;
      }
    }

    const modifiedData = {
      title: blogInfo.title,
      content: blogInfo.content,
      excerpt: blogInfo.excerpt || "",
      tags: blogInfo.tags
        ? blogInfo.tags
            .toString()
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [],
      coverImage: coverImageUrl || "",
      published: blogInfo.published === "true",
      authorId: session?.user?.id,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedData),
    });

    const result = await res.json();

    if (res.ok) {
      revalidateTag("BLOGS");
      revalidateTag(`BLOG_${id}`);
      revalidatePath("/blogs");
      revalidatePath(`/blogs/${id}`);
      revalidatePath("/dashboard/blogs");
    }

    return result;
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);
    return { error: "Failed to update blog" };
  }
};

// Blog Delete Function
export const deleteBlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      revalidateTag("BLOGS");
      revalidateTag(`BLOG_${id}`);
      revalidatePath("/blogs");
      revalidatePath("/dashboard/blogs");
      return { success: true };
    } else {
      const error = await res.json();
      return { error: error.message || "Failed to delete blog" };
    }
  } catch (error) {
    console.error(`Error deleting blog with id ${id}:`, error);
    return { error: "Failed to delete blog" };
  }
};

// Project API functions
export const getProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["PROJECTS"],
      },
    });

    if (!res.ok) {
      console.warn("Failed to fetch projects from API");
      return [];
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.projects)) {
      return data.projects;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn("API response is not in expected format");
      return [];
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const getProjectById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["PROJECTS", `PROJECT_${id}`],
        },
      }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch project with id: ${id}`);
      return null;
    }

    const data = await res.json();

    if (data && data.id) {
      return data;
    } else if (data && data.project) {
      return data.project;
    } else if (data && data.data) {
      return data.data;
    } else {
      console.warn("API response is not in expected format");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    return null;
  }
};
