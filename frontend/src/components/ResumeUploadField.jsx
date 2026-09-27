import { useRef, useState } from "react";

export default function ResumeUploadField({
  id,
  label = "Resume",
  required = false,
  file,
  onChange,
  error,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList) => {
    const selected = fileList?.[0];
    if (selected) onChange(selected);
  };

  return (
    <div>
      <label htmlFor={id} className="flex items-baseline text-sm font-medium text-[#E7E9EC]">
        <span>
          {label}
          {required && (
            <span className="ml-1 text-[#E8AA3C]" aria-hidden="true">
              *
            </span>
          )}
        </span>
      </label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-4 py-8 text-center transition-colors ${
          isDragging
            ? "border-[#E8AA3C]/70 bg-[#E8AA3C]/5"
            : error
            ? "border-red-500/60"
            : "border-[#232A36] hover:border-[#3A4453]"
        }`}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="application/pdf"
          required={required}
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />

        {file ? (
          <>
            <p className="text-sm text-[#E7E9EC]">{file.name}</p>
            <p className="mt-1 text-xs text-[#5C6472]">
              {(file.size / 1024 / 1024).toFixed(1)} MB — click to replace
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-[#E7E9EC]">Click to upload or drag and drop</p>
            <p className="mt-1 text-xs text-[#5C6472]">PDF only, up to 10MB</p>
          </>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
