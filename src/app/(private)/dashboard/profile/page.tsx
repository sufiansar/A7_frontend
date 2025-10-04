"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, Save, Camera } from "lucide-react";
import toast from "react-hot-toast";
import {
  updateUserPicture,
  updateUserProfile,
  getUserProfile,
} from "@/actions/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    const loadProfileData = async () => {
      if (session?.user?.id) {
        try {
          const profileResult = await getUserProfile();

          if (profileResult.success && profileResult.data) {
            const userData = profileResult.data;

            setFormData({
              name: userData.name || "",
              email: userData.email || "",
              bio: userData.bio || "",
            });

            const currentImage = userData.picture || session?.user?.image || "";
            setProfileImage(currentImage);
          }
        } catch {
          if (session?.user) {
            setFormData({
              name: session.user.name || "",
              email: session.user.email || "",
              bio: "",
            });
            const currentImage = session.user.image || "";
            setProfileImage(currentImage);
          }
        }
      }
    };

    if (session?.user) {
      loadProfileData();
    }
  }, [session]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateUserPicture(file);

      if (result.success && result.data) {
        const newPictureUrl =
          result.data.picture ||
          result.data.image ||
          result.data.profilePicture;

        if (newPictureUrl) {
          setProfileImage(newPictureUrl);

          if (session?.user) {
            await update({
              ...session,
              user: { ...session.user, image: newPictureUrl },
            });
          }

          toast.success("Profile picture updated!");
        } else {
          toast.success("Upload completed, but no image URL returned");
        }
      } else {
        const errorMessage = result.error || "Failed to update picture";
        toast.error(errorMessage);
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("bio", formData.bio);

      const result = await updateUserProfile(formDataToSend);

      if (result.success) {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            email: formData.email,
          },
        });
        toast.success("Profile updated!");
      } else {
        const errorMessage = result.error || "Failed to update profile";
        toast.error(errorMessage);
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-20 h-20 object-cover"
                    key={profileImage}
                  />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                <Camera className="w-3 h-3 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Profile Picture</h2>
              <p className="text-gray-400 text-sm">
                Click the camera to change
              </p>
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <Label className="text-gray-300">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              placeholder="Your email"
            />
          </div>

          <div>
            <Label className="text-gray-300">Bio</Label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              placeholder="Tell us about yourself..."
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
