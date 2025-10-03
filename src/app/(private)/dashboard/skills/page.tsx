"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { getSkills, deleteSkill } from "@/actions/skillApi";
import { SkillItem } from "@/interfaces";
import { useRouter } from "next/navigation";
import {
  Plus,
  Zap,
  Edit,
  Trash2,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

export default function SkillsManagementDashboard() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<SkillItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await getSkills();
      setSkills(data || []);
    } catch (error) {
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (skill: SkillItem) => {
    setSkillToDelete(skill);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!skillToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteSkill(skillToDelete.id);

      if (result.success) {
        toast.success("Skill deleted successfully!");
        await fetchSkills(); 
        setDeleteModalOpen(false);
        setSkillToDelete(null);
      } else {
        toast.error(result.error || "Failed to delete skill");
      }
    } catch (error) {
      toast.error("Failed to delete skill");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSkillToDelete(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Manage{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h1>

          <Link
            href="/dashboard/skills/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Skill
          </Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Skills</p>
                <p className="text-2xl font-bold text-white">{skills.length}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Expert Level</p>
                <p className="text-2xl font-bold text-white">
                  {
                    skills.filter(
                      (skill) => skill.level?.toLowerCase() === "expert"
                    ).length
                  }
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Advanced Level</p>
                <p className="text-2xl font-bold text-white">
                  {
                    skills.filter(
                      (skill) => skill.level?.toLowerCase() === "advanced"
                    ).length
                  }
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">With Icons</p>
                <p className="text-2xl font-bold text-white">
                  {skills.filter((skill) => skill.iconUrl).length}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">I</span>
              </div>
            </div>
          </div>
        </div>


        {skills.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No skills yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start building your skills portfolio by adding your first skill.
            </p>
            <Link
              href="/dashboard/skills/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Skill
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-blue-500 transition-colors"
              >

                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                  {skill.iconUrl ? (
                    <Image
                      src={skill.iconUrl}
                      alt={skill.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {skill.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>


                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {skill.name}
                  </h3>

                  {skill.level && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        skill.level.toLowerCase() === "expert"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : skill.level.toLowerCase() === "advanced"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : skill.level.toLowerCase() === "intermediate"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {skill.level}
                    </span>
                  )}
                </div>


                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/skills/edit/${skill.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(skill)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>


                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    Created: {new Date(skill.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Delete Skill
              </h3>
              <button
                onClick={handleDeleteCancel}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {skillToDelete?.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
