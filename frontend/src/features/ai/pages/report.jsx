import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MatchScoreCard from "../../../components/MatchScoreCard";
import QuestionSection from "../../../components/QuestionSection";
import SkillGapList from "../../../components/SkillGapList";
import PreparationTimeline from "../../../components/PreparationTimeline";
import EmptyReport from "../../../components/EmptyReport";

// `report` should match `interviewReportJsonSchema`:
// { matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan }
//
// TODO: wire this up to the actual response from the home page — e.g. React
// Router's `location.state`, a global store/context, or a fetch by report id
// from the URL (`/report/:id`). Left as a prop here so this page stays
// framework-agnostic.
export default function Report({ report = null }) {
  // TODO: replace with real auth state shared across pages (context/provider)
  const [isAuthenticated] = useState(false);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#0B0E14] font-sans antialiased">
        <Navbar isAuthenticated={isAuthenticated} />
        <main>
          <EmptyReport />
        </main>
        <Footer />
      </div>
    );
  }

  const { matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan } = report;

  return (
    <div className="min-h-screen bg-[#0B0E14] font-sans antialiased">
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        <section className="mx-auto max-w-2xl px-6 pt-16 pb-8 sm:pt-20">
          <h1 className="font-serif text-3xl text-[#E7E9EC] sm:text-4xl">Your interview report</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#8B94A3]">
            Based on the job description and resume you submitted, here's how you match up and how
            to prepare.
          </p>
          <div className="mt-8">
            <MatchScoreCard score={matchScore} />
          </div>
        </section>

        <QuestionSection
          title="Technical questions"
          description="Likely questions based on the role's technical requirements."
          questions={technicalQuestions}
        />

        <QuestionSection
          title="Behavioral questions"
          description="Questions probing how you've handled real situations."
          questions={behavioralQuestions}
        />

        <SkillGapList skillGaps={skillGaps} />

        <PreparationTimeline preparationPlan={preparationPlan} />
      </main>
      <Footer />
    </div>
  );
}
