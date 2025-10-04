import { getAuthHeaders, makeApiCall, revalidateCache } from "./apiUtils";

export const updateUserPicture = async (pictureFile: File) => {
  try {
    const { session } = await getAuthHeaders(false);

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const formData = new FormData();
    const userData = {};

    formData.append("data", JSON.stringify(userData));

    if (pictureFile && pictureFile.size > 0) {
      formData.append("file", pictureFile);
    }

    const headers: Record<string, string> = {};
    const accessToken = (session as { accessToken?: string }).accessToken;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/user/${session.user.id}`;

    const { ok, data: result } = await makeApiCall(apiUrl, {
      method: "PATCH",
      headers,
      body: formData,
    });

    if (ok) {
      await revalidateCache("user");
      return { success: true, data: result?.data };
    }

    return {
      error: result?.message || result?.error || "Failed to update picture",
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to update picture",
    };
  }
};

export const updateUserProfile = async (profileData: FormData) => {
  try {
    const { session } = await getAuthHeaders(false);

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const formData = new FormData();

    const name = profileData.get("name") as string;
    const email = profileData.get("email") as string;
    const bio = profileData.get("bio") as string;
    const pictureFile = profileData.get("file") as File;

    const userData = { name, email, bio };

    formData.append("data", JSON.stringify(userData));

    if (pictureFile && pictureFile.size > 0) {
      formData.append("file", pictureFile);
    }

    const headers: Record<string, string> = {};
    const accessToken = (session as { accessToken?: string }).accessToken;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${session.user.id}`,
      {
        method: "PATCH",
        headers,
        body: formData,
      }
    );

    if (ok) {
      await revalidateCache("user");
      return { success: true, data: result?.data };
    }

    return { error: result?.message || "Failed to update profile" };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
};

export const getUserProfile = async () => {
  try {
    const { headers } = await getAuthHeaders();

    const { ok, data: result } = await makeApiCall(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/me`,
      {
        method: "GET",
        headers,
      }
    );

    if (ok) {
      return { success: true, data: result?.data };
    }

    return { error: result?.message || "Failed to fetch profile" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to fetch profile",
    };
  }
};
