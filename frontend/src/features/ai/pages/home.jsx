import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import FeatureHighlights from "../../../components/FeatureHighlights";
import ReviewForm from "../../../components/ReviewForm";
import Footer from "../../../components/Footer";

export default function Home() {
  const handleSubmit = async ({ jobDescription, resume, selfDescription }) => {
    // TODO: wire this up to your comparison API
    console.log({ jobDescription, resume, selfDescription });
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <FeatureHighlights />
        <ReviewForm onSubmit={handleSubmit} />
      </main>
      <Footer />
    </div>
  );
}
