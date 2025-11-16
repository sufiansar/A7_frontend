"use client";

import { useState, useRef, useEffect } from "react";
import { ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MultiImageUploadProps {
  onChange: (files: File[]) => void;
  initialImages?: string[];
  className?: string;
}

export default function MultiImageUpload({
  onChange,
  initialImages = [],
  className = "",
}: MultiImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>(initialImages || []);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];

  const openFileDialog = () => fileInputRef.current?.click();

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    const arr = Array.from(selected).filter((f) =>
      acceptedTypes.includes(f.type)
    );

    const newPreviews = arr.map((f) => URL.createObjectURL(f));
    setPreviews((p) => [...p, ...newPreviews]);
    setFiles((f) => {
      const merged = [...f, ...arr];
      return merged;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files ?? null);
  };

  const handleRemove = (index: number) => {
    setPreviews((p) => p.filter((_, i) => i !== index));
    setFiles((f) => {
      const next = f.filter((_, i) => i !== index);
      return next;
    });
  };

  // Notify parent about file changes but do it from an effect
  // to avoid updating parent while this component is rendering.
  useEffect(() => {
    onChange(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        multiple
        className="sr-only"
        onChange={handleChange}
      />

      <div className="border border-dashed rounded-lg p-3 bg-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-gray-700 p-2 rounded-md">
              <ImageIcon className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-200">
                Project Gallery
              </div>
              <div className="text-xs text-gray-400">
                Add multiple images to showcase your project
              </div>
            </div>
          </div>
          <div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={openFileDialog}
            >
              <UploadIcon className="w-4 h-4 mr-2" /> Add Images
            </Button>
          </div>
        </div>

        {previews.length === 0 ? (
          <div className="text-sm text-gray-400">No images added yet</div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {previews.map((src, i) => (
              <div key={i} className="relative rounded overflow-hidden">
                <img src={src} className="w-full h-24 object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 shadow-lg"
                  aria-label="Remove image"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
