"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { createSkill } from "@/actions/skillApi";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateSkillForm() {
  const [loading, setLoading] = useState(false);
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await createSkill(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Skill created successfully!");
        router.push("/dashboard/skills");
      }
    } catch {
      toast.error("Failed to create skill");
    } finally {
      setLoading(false);
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
    setPreviewIcon(null);
    const fileInput = document.getElementById("iconFile") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            asChild
            className="p-2 text-gray-400 hover:text-white"
          >
            <Link href="/dashboard/skills">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">
            Create New{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skill
            </span>
          </h1>
        </div>

        <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Skill Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Skill Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g., React, Node.js, Python"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">
                  Category *
                </Label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Mobile">Mobile Development</option>
                  <option value="Design">Design</option>
                  <option value="Testing">Testing</option>
                  <option value="Tools">Tools & Utilities</option>
                  <option value="Language">Programming Language</option>
                  <option value="Framework">Framework/Library</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="text-gray-300">
                  Skill Level
                </Label>
                <select
                  id="level"
                  name="level"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select level (optional)</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="iconFile" className="text-gray-300">
                  Skill Icon
                </Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="iconFile"
                      className="cursor-pointer bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 flex items-center gap-2 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">Choose Icon</span>
                    </Label>
                    <input
                      type="file"
                      id="iconFile"
                      name="file"
                      accept="image/*"
                      onChange={handleIconChange}
                      className="hidden"
                    />
                    {previewIcon && (
                      <Button
                        type="button"
                        onClick={clearPreview}
                        variant="destructive"
                        size="sm"
                        className="p-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {previewIcon && (
                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                      <p className="text-sm text-gray-300 mb-2">
                        Icon Preview:
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
                    Upload an icon for your skill (PNG, JPG, SVG recommended).
                    Max size: 5MB
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  asChild
                  className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  <Link href="/dashboard/skills">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Create Skill
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
