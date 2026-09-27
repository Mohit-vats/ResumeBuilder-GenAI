import Button from "./Button";

export default function EmptyReport() {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <h1 className="font-serif text-2xl text-[#E7E9EC]">No report yet</h1>
      <p className="mt-2 text-sm text-[#8B94A3]">
        Start a comparison from the home page to generate a match score, interview questions, and a
        preparation plan.
      </p>
      <Button href="/" variant="primary" className="mt-6">
        Go to home page
      </Button>
    </section>
  );
}
