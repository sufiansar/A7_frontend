"use server";

import { getUserSession } from "@/helpers/userSession";
import { revalidatePath, revalidateTag } from "next/cache";

const getAuthHeaders = async () => {
  const session = await getUserSession();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to perform this action");
  }

  const headers: any = {
    "Content-Type": "application/json",
  };

  const accessToken = (session as any).accessToken;
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return { headers, session };
};

const makeApiCall = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  const result = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data: result,
  };
};

const processArrayField = (field: string | null): string[] => {
  if (!field) return [];
  return field
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const revalidateCache = (type: "blogs" | "projects", id?: string) => {
  const upperType = type.toUpperCase();
  revalidateTag(upperType);

  if (id) {
    revalidateTag(`${upperType.slice(0, -1)}_${id}`);
  }

  revalidatePath(`/${type}`);
  revalidatePath(`/dashboard/${type}`);

  if (id) {
    revalidatePath(`/${type}/${id}`);
  }
};

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

// export const create = async (data: FormData) => {
//   const session = await getUserSession();
//   const blogInfo = Object.fromEntries(data.entries());

//   let coverImageUrl = blogInfo.coverImage;
//   const imageFile = data.get("coverImageFile") as File;

//   if (imageFile && imageFile.size > 0) {
//     const uploadedUrl = await uploadImage(imageFile);
//     if (uploadedUrl) {
//       coverImageUrl = uploadedUrl;
//     }
//   }

//   const modifiedData = {
//     title: blogInfo.title,
//     content: blogInfo.content,
//     excerpt: blogInfo.excerpt || "",
//     tags: blogInfo.tags
//       ? blogInfo.tags
//           .toString()
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter((tag) => tag.length > 0)
//       : [],
//     coverImage: coverImageUrl || "",
//     published: blogInfo.published === "true",
//     authorId: session?.user?.id,
//     isFeatured: Boolean(blogInfo.isFeatured),
//   };

//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(modifiedData),
//   });

//   const result = await res.json();

//   if (result?.id) {
//     revalidateTag("BLOGS");
//     revalidatePath("/blogs");
//     revalidatePath("/dashboard/blogs");
//     return { success: true, id: result.id };
//   }
//   return { success: false, error: result.message || "Failed to create blog" };
// };
// Blog Create Function
export const create = async (data: FormData) => {
  try {
    const { headers, session } = await getAuthHeaders();

    // Remove Content-Type for FormData
    delete headers["Content-Type"];

    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const excerpt = data.get("excerpt") as string;
    const tagsString = data.get("tags") as string;
    const published = data.get("published") as string;
    const file = data.get("file") as File;

    const formDataToSend = new FormData();
    const blogData = {
      title,
      content,
      excerpt,
      tags: processArrayField(tagsString),
      published: published === "true",
    };

    formDataToSend.append("data", JSON.stringify(blogData));
    if (file && file.size > 0) {
      formDataToSend.append("file", file);
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/create`,
      {
        method: "POST",
        headers,
        body: formDataToSend,
      }
    );

    if (ok && result?.success) {
      revalidateCache("blogs");
      return { success: true, data: result.data };
    }

    return {
      success: false,
      error: result.message || "Failed to create blog",
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
};
// Generic fetch function for GET requests
const fetchData = async (url: string, tags: string[]) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags,
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch data from ${url}`);
      return null;
    }

    const data = await res.json();

    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.blogs)) {
      return data.blogs;
    } else if (data && Array.isArray(data.projects)) {
      return data.projects;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else if (data && (data.id || data.blog || data.project || data.data)) {
      return data.id ? data : data.blog || data.project || data.data;
    } else {
      console.warn("API response is not in expected format");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

export const getBlogs = async () => {
  return (
    fetchData(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, ["BLOGS"]) || []
  );
};

export const getBlogById = async (id: string) => {
  return fetchData(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, [
    "BLOGS",
    `BLOG_${id}`,
  ]);
};

export const getProjects = async () => {
  return (
    fetchData(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, ["PROJECTS"]) ||
    []
  );
};

export const getProjectById = async (id: string) => {
  return fetchData(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, [
    "PROJECTS",
    `PROJECT_${id}`,
  ]);
};

// Blog Update Function
export const updateBlog = async (id: string, data: FormData) => {
  try {
    const { headers } = await getAuthHeaders();
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
      tags: processArrayField(blogInfo.tags as string),
      coverImage: coverImageUrl || "",
      published: blogInfo.published === "true",
    };

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(modifiedData),
      }
    );

    if (ok) {
      revalidateCache("blogs", id);
    }

    return result;
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);
    return {
      error: error instanceof Error ? error.message : "Failed to update blog",
    };
  }
};

// Blog Delete Function
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
    console.error(`Error deleting blog with id ${id}:`, error);
    return {
      error: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
};

// Project Create Function
export const createProject = async (data: FormData) => {
  try {
    const { headers } = await getAuthHeaders();

    // Remove Content-Type for FormData
    delete headers["Content-Type"];

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const technologies = data.get("technologies") as string;
    const liveUrl = data.get("liveUrl") as string;
    const githubUrl = data.get("githubUrl") as string;
    const featured = data.get("featured") as string;
    const file = data.get("file") as File;

    const formDataToSend = new FormData();
    const projectData = {
      title,
      description,
      technologies: processArrayField(technologies),
      liveUrl,
      githubUrl,
      featured: featured === "true",
    };

    formDataToSend.append("data", JSON.stringify(projectData));
    if (file && file.size > 0) {
      formDataToSend.append("file", file);
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/create`,
      {
        method: "POST",
        headers,
        body: formDataToSend,
      }
    );

    if (ok && result?.success) {
      revalidateCache("projects");
      return { success: true, data: result.data };
    }

    return {
      success: false,
      error: result.message || "Failed to create project",
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
};

export const updateProject = async (id: string, data: FormData) => {
  try {
    const { headers } = await getAuthHeaders();
    const projectInfo = Object.fromEntries(data.entries());

    let imageUrl = projectInfo.imageUrl;
    const imageFile = data.get("imageFile") as File;

    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const modifiedData = {
      title: projectInfo.title,
      description: projectInfo.description,
      technologies: processArrayField(projectInfo.technologies as string),
      liveUrl: projectInfo.liveUrl || "",
      githubUrl: projectInfo.githubUrl || "",
      imageUrl: imageUrl || "",
      featured: projectInfo.featured === "true",
    };

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(modifiedData),
      }
    );

    if (ok) {
      revalidateCache("projects", id);
    }

    return result;
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
};

// Project Delete Function
export const deleteProject = async (id: string) => {
  try {
    const { headers } = await getAuthHeaders();

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (ok) {
      revalidateCache("projects", id);
      return { success: true };
    } else {
      return { error: result.message || "Failed to delete project" };
    }
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to delete project",
    };
  }
};
