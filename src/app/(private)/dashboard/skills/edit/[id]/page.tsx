"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { updateSkill } from "@/actions/skillApi";
import { SkillItem, DynamicPageProps } from "@/interfaces";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Image from "next/image";

export default function EditSkillForm({ params }: DynamicPageProps) {
  const { id } = use(params);
  const [skill, setSkill] = useState<SkillItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setLoading(true);

        const { getSkills } = await import("@/actions/skillApi");
        const allSkills = await getSkills();

        const skillData = allSkills?.find((skill: any) => {
          return skill._id === id || skill.id === id;
        });

        if (skillData) {
          setSkill(skillData);
          setPreviewIcon(skillData.iconUrl || null);
        } else {
          toast.error("Skill not found");
          router.push("/dashboard/skills");
        }
      } catch (error) {
        toast.error("Failed to fetch skill");
        router.push("/dashboard/skills");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSkill();
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateSkill(id, formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success("Skill updated successfully!");
        router.push("/dashboard/skills");
      } else {
        toast.success("Skill updated successfully!");
        router.push("/dashboard/skills");
      }
    } catch (error) {
      toast.error("Failed to update skill");
    } finally {
      setUpdating(false);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewIcon(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    setPreviewIcon(skill?.iconUrl || null);
    const fileInput = document.getElementById("iconFile") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading skill...</div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Skill not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">

        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard/skills"
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold">
            Edit{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {skill.name}
            </span>
          </h1>
        </div>


        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Skill Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={skill.name}
                placeholder="e.g., React, Node.js, Python"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>


            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Skill Level
              </label>
              <select
                id="level"
                name="level"
                defaultValue={skill.level || ""}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="">Select level (optional)</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>


            <div>
              <label
                htmlFor="iconFile"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Skill Icon
              </label>
              <div className="space-y-4">

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="iconFile"
                    className="cursor-pointer bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-3 flex items-center gap-2 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Change Icon</span>
                  </label>
                  <input
                    type="file"
                    id="iconFile"
                    name="file"
                    accept="image/*"
                    onChange={handleIconChange}
                    className="hidden"
                  />
                  {previewIcon && previewIcon !== skill.iconUrl && (
                    <button
                      type="button"
                      onClick={clearPreview}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>


                {previewIcon && (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-300 mb-2">
                      {previewIcon === skill.iconUrl
                        ? "Current Icon:"
                        : "New Icon Preview:"}
                    </p>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                      <Image
                        src={previewIcon}
                        alt="Icon preview"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-400">
                  Upload a new icon for your skill (PNG, JPG, SVG recommended).
                  Max size: 5MB
                </p>
              </div>
            </div>


            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                Skill Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(skill.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {new Date(skill.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>


            <div className="flex gap-4 pt-6">
              <Link
                href="/dashboard/skills"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {updating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Skill
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
