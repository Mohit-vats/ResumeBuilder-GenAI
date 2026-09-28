import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import FeatureHighlights from "../../../components/FeatureHighlights";
import ReviewForm from "../../../components/ReviewForm";
import Footer from "../../../components/Footer";

import {authUser} from "../../auth/hooks/useAuth";
import useInterview from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, handleLogout } = authUser();
  const { generateInterviewReport } = useInterview();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user);

  const handleSubmit = async ({ jobDescription, resume, selfDescription }) => {
    await generateInterviewReport({ jobDescription, resume, selfDescription });
    navigate("/report");
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] font-sans antialiased">
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
      <main>
        <Hero />
        <FeatureHighlights />
        <ReviewForm onSubmit={handleSubmit} />
      </main>
      <Footer />
    </div>
  );
}
