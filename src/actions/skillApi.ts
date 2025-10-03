import { getAuthHeaders, makeApiCall, revalidateCache } from "./apiUtils";

export const getSkillsPublic = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_API) {
      return [];
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
      next: { tags: ["skills"], revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

export const getSkills = async () => {
  try {
    const { headers } = await getAuthHeaders();

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills`,
      {
        method: "GET",
        headers,
      }
    );

    return ok ? result?.data || [] : [];
  } catch (error) {
    return [];
  }
};

export const getSkillById = async (id: string) => {
  try {
    const { headers } = await getAuthHeaders();

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`;

    const { ok, data: result } = await makeApiCall(apiUrl, {
      method: "GET",
      headers,
    });

    if (!ok || !result?.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    return null;
  }
};

export const createSkill = async (data: FormData) => {
  try {
    const { session } = await getAuthHeaders(false);

    const name = data.get("name") as string;
    const level = data.get("level") as string;
    const iconFile = data.get("file") as File;

    const formDataToSend = new FormData();
    const skillData = {
      name,
      level,
    };

    formDataToSend.append("data", JSON.stringify(skillData));
    if (iconFile && iconFile.size > 0) {
      formDataToSend.append("file", iconFile);
    }

    const headers: Record<string, string> = {};
    const accessToken = (session as { accessToken?: string }).accessToken;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/create`,
      {
        method: "POST",
        headers,
        body: formDataToSend,
      }
    );

    if (ok) {
      revalidateCache("skills");
      return { success: true, data: result?.data };
    }

    return { error: result?.message || "Failed to create skill" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create skill",
    };
  }
};

export const updateSkill = async (id: string, data: FormData) => {
  try {
    const { session } = await getAuthHeaders(false);

    const name = data.get("name") as string;
    const level = data.get("level") as string;
    const iconFile = data.get("file") as File;

    const formData = new FormData();
    const skillData = { name, level };

    formData.append("data", JSON.stringify(skillData));

    if (iconFile && iconFile.size > 0) {
      formData.append("file", iconFile);
    }

    const headers: Record<string, string> = {};
    const accessToken = (session as { accessToken?: string }).accessToken;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        method: "PATCH",
        headers,
        body: formData,
      }
    );

    if (ok) {
      revalidateCache("skills", id);
      return { success: true, data: result?.data };
    }

    return { error: result?.message || "Failed to update skill" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update skill",
    };
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const { headers } = await getAuthHeaders();

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (ok) {
      revalidateCache("skills", id);
      return { success: true };
    } else {
      return { error: result.message || "Failed to delete skill" };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to delete skill",
    };
  }
};
