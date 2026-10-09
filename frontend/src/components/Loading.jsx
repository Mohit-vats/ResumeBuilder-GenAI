const Loading = ({
  title = "Loading",
  description,
  fullScreen = true,
  className = "",
}) => {
  const Container = fullScreen ? "main" : "div";

  return (
    <Container
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`${fullScreen ? "flex min-h-screen items-center justify-center bg-[#0B0E14] px-6 py-12" : "py-12"} ${className}`.trim()}
    >
      <div className="mx-auto max-w-2xl text-center text-[#E7E9EC]">
        <div
          aria-hidden="true"
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#2A303B] border-t-blue-500"
        />

        <h1 className="mt-6 font-serif text-2xl sm:text-3xl">{title}</h1>

        {description && (
          <p className="mt-3 text-sm leading-relaxed text-[#8B94A3]">
            {description}
          </p>
        )}
      </div>
    </Container>
  );
};

export default Loading;
