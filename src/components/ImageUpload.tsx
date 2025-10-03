"use client";

import { useState, useRef } from "react";
import { ImageIcon, UploadIcon, XIcon, AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  initialImage?: string;
  className?: string;
}

export default function ImageUpload({
  onImageChange,
  initialImage,
  className = "",
}: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; 
  const acceptedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${maxSizeMB}MB`;
    }
    if (!acceptedTypes.includes(file.type)) {
      return "Please select a valid image file (PNG, JPG, GIF, WebP)";
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    setError("");

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview);
    onImageChange(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setError("");
    onImageChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const currentImage = preview || initialImage;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex min-h-40 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed bg-gray-800 p-4 transition-colors border-gray-600 ${
          isDragging ? "bg-gray-700/50" : ""
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={acceptedTypes.join(",")}
          className="sr-only"
          aria-label="Upload cover image"
        />

        {currentImage ? (
          <div className="relative w-full h-full min-h-[200px]">
            <img
              src={currentImage}
              alt="Cover preview"
              className="w-full h-full object-cover rounded-md"
            />
            <Button
              type="button"
              onClick={handleRemove}
              size="icon"
              className="absolute -top-2 -right-2 size-6 rounded-full border-2 border-gray-900 bg-red-600 hover:bg-red-700 shadow-lg"
              aria-label="Remove image"
            >
              <XIcon className="size-3" />
            </Button>
            <div className="absolute bottom-2 left-2 right-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                className="w-full bg-gray-900/80 border-gray-600 text-white hover:bg-gray-800"
              >
                <UploadIcon className="size-3 mr-1" />
                Replace Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
            <div
              className="bg-gray-700 mb-3 flex size-12 shrink-0 items-center justify-center rounded-full border border-gray-600"
              aria-hidden="true"
            >
              <ImageIcon className="size-5 text-gray-400" />
            </div>
            <p className="mb-1 text-sm font-medium text-gray-300">
              Drop your cover image here
            </p>
            <p className="text-gray-400 text-xs mb-3">
              PNG, JPG, GIF or WebP (max. {maxSizeMB}MB)
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openFileDialog}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <UploadIcon className="size-3 mr-1" />
              Select Image
            </Button>
          </div>
        )}
      </div>

      {error && (
        <div
          className="text-red-400 flex items-center gap-1 text-xs bg-red-500/10 border border-red-500/20 rounded p-2"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
