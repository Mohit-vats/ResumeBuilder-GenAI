const Loading = () => {
  return (
    <main className="mx-auto max-w-2xl px-6 pt-20 text-center text-[#E7E9EC]">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#2A303B] border-t-blue-500" />

      <h1 className="mt-8 font-serif text-3xl">
        Generating your interview report
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-[#8B94A3]">
        We're analyzing your resume against the job description and
        preparing personalized interview questions and recommendations.
      </p>

      <div className="mx-auto mt-8 h-2 max-w-sm overflow-hidden rounded-full bg-[#1A1F28]">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500" />
      </div>

      <p className="mt-4 text-xs text-[#626B79]">
        This may take a little while.
      </p>
    </main>
  );
};

export default Loading;