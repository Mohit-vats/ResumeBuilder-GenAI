import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import FeatureHighlights from "../../../components/FeatureHighlights";
import ReviewForm from "../../../components/ReviewForm";
import Footer from "../../../components/Footer";

import {authUser} from "../../auth/hooks/useAuth";

export default function Home() {
  // TODO: replace with real auth state, e.g. from context, a cookie/session
  // check, or your auth provider's hook (useUser(), useSession(), etc.)

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState({ name: "Jordan" });

  const handleLogout = () => {
    // TODO: call your sign-out endpoint / clear the session
    setIsAuthenticated(false);
  };

  const handleSubmit = async ({ jobDescription, resume, selfDescription }) => {
    // TODO: wire this up to your comparison API
    console.log({ jobDescription, resume, selfDescription });
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
