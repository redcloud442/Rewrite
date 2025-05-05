"use client";

import { cn } from "@/lib/utils"; // If you're using shadcn's utility
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Input } from "./input";

type FileDropzoneProps = {
  onFileAccepted: (file: File) => void;
};

export function FileDropzone({ onFileAccepted }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-4 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/10" : "border-muted"
      )}
    >
      <Input {...getInputProps()} />
      <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
      <p className="text-muted-foreground text-sm">
        {isDragActive
          ? "Drop the file here..."
          : "Drag & drop a file here, or click to browse."}
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        PDF, DOCX, TXT accepted.
      </p>
    </div>
  );
}
