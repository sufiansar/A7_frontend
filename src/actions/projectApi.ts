import { getAuthHeaders, makeApiCall, revalidateCache } from "./apiUtils";
import { ProjectUpdateData } from "@/types";

export const getProjectsPublic = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_API) {
      return [];
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      next: { tags: ["projects"], revalidate: 60 },
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

export const getProjects = async () => {
  try {
    const { headers } = await getAuthHeaders();

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects`,
      {
        method: "GET",
        headers,
      }
    );

    return ok ? result?.data || [] : [];
  } catch {
    return [];
  }
};

export const getProjectById = async (id: string) => {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_API) {
      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        next: { tags: ["projects", `project-${id}`], revalidate: 60 },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data || null;
  } catch {
    return null;
  }
};

export const createProject = async (data: FormData) => {
  try {
    const { session } = await getAuthHeaders(false);

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const excerpt = data.get("excerpt") as string;
    const technologies = data.get("technologies") as string;
    const githubUrl = data.get("githubUrl") as string;
    const liveUrl = data.get("liveUrl") as string;
    const featured = data.get("featured") === "true";
    const status = data.get("status") as string;
    const imageFile = data.get("file") as File;

    const formData = new FormData();
    const projectData = {
      title,
      description,
      excerpt,
      technologies: technologies
        ? technologies.split(",").map((tech) => tech.trim())
        : [],
      githubUrl,
      liveUrl,
      featured,
      status,
    };

    formData.append("data", JSON.stringify(projectData));
    if (imageFile && imageFile.size > 0) {
      formData.append("file", imageFile);
    }

    const headers: Record<string, string> = {};
    const accessToken = (session as { accessToken?: string }).accessToken;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/create`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

    if (ok) {
      revalidateCache("projects");
      return { success: true, data: result?.data };
    }

    return { error: result?.message || "Failed to create project" };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to create project",
    };
  }
};

export const updateProject = async (id: string, data: FormData) => {
  try {
    const { session } = await getAuthHeaders(false);

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const excerpt = data.get("excerpt") as string;
    const technologies = data.get("technologies") as string;
    const githubUrl = data.get("githubUrl") as string;
    const liveUrl = data.get("liveUrl") as string;
    const featured = data.get("featured") === "true";
    const status = data.get("status") as string;
    const imageFile = data.get("file") as File;
    const existingImageUrl = data.get("existingImageUrl") as string;

    const formData = new FormData();
    const projectData: ProjectUpdateData = {
      title,
      description,
      excerpt,
      technologies: technologies
        ? technologies.split(",").map((tech) => tech.trim())
        : [],
      githubUrl,
      liveUrl,
      featured,
      status,
    };

    if (!imageFile || imageFile.size === 0) {
      if (existingImageUrl) {
        projectData.imageUrl = existingImageUrl;
      }
    }

    formData.append("data", JSON.stringify(projectData));
    if (imageFile && imageFile.size > 0) {
      formData.append("file", imageFile);
    }

    const headers: Record<string, string> = {};
    const accessToken = (session as { accessToken?: string }).accessToken;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "PATCH",
        headers,
        body: formData,
      }
    );

    if (ok) {
      revalidateCache("projects", id);
      return { success: true, data: result?.data };
    }

    return { error: result?.message || "Failed to update project" };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
};

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
    return {
      error:
        error instanceof Error ? error.message : "Failed to delete project",
    };
  }
};
