const FileUpload = ({
  label,
  name,
  id,
  file,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id || name}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <label
        htmlFor={id || name}
        className="flex cursor-pointer flex-col items-center justify-center
          rounded-lg border-2 border-dashed border-gray-300
          bg-gray-50 px-6 py-8 text-center
          transition hover:border-blue-400 hover:bg-blue-50"
      >
        <div className="mb-2 text-3xl">📄</div>

        {file ? (
          <>
            <p className="font-medium text-gray-800">{file.name}</p>
            <p className="mt-1 text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </>
        ) : (
          <>
            <p className="font-medium text-gray-700">
              Click to upload your resume
            </p>
            <p className="mt-1 text-sm text-gray-500">
              PDF files only
            </p>
          </>
        )}

        <input
          type="file"
          id={id || name}
          name={name}
          accept=".pdf,application/pdf"
          onChange={onChange}
          required={required}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUpload;