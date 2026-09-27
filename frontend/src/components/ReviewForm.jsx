import { useState } from "react";
import TextAreaField from "./TextAreaField";
import ResumeUploadField from "./ResumeUploadField";
import Button from "./Button";

const MAX_RESUME_MB = 10;

export default function ReviewForm({ onSubmit }) {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!jobDescription.trim()) {
      next.jobDescription = "Add the job description to compare against.";
    }
    if (!resume) {
      next.resume = "Upload your resume as a PDF.";
    } else if (resume.type !== "application/pdf") {
      next.resume = "Only PDF files are accepted.";
    } else if (resume.size > MAX_RESUME_MB * 1024 * 1024) {
      next.resume = `File is larger than ${MAX_RESUME_MB}MB.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.({ jobDescription, resume, selfDescription });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="compare" className="mx-auto max-w-2xl px-6 pb-24">
      <div className="rounded-lg border border-[#1B212B] bg-[#0F131A]/60 p-6 sm:p-8">
        <h2 className="font-serif text-xl text-[#E7E9EC]">Compare your resume</h2>
        <p className="mt-1.5 text-sm text-[#8B94A3]">
          Fill in the job description and resume below. Everything else is optional.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
          <TextAreaField
            id="job-description"
            label="Job description"
            required
            rows={8}
            placeholder="Paste the full job posting here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            error={errors.jobDescription}
          />

          <ResumeUploadField
            id="resume"
            label="Resume"
            required
            file={resume}
            onChange={setResume}
            error={errors.resume}
          />

          <TextAreaField
            id="self-description"
            label="About you"
            optional
            rows={5}
            placeholder="Anything not on your resume worth considering — goals, context, constraints..."
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
          />

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-[#5C6472]">* Required</p>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Comparing…" : "Compare"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
