import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MatchScoreCard from "../../../components/MatchScoreCard";
import QuestionSection from "../../../components/QuestionSection";
import SkillGapList from "../../../components/SkillGapList";
import PreparationTimeline from "../../../components/PreparationTimeline";
import EmptyReport from "../../../components/EmptyReport";
import { authUser } from "../../auth/hooks/useAuth";
import useInterview from "../hooks/useInterview";
import Loading from "../../../components/Loading"

import { useEffect ,useState } from "react";
import {useParams} from "react-router-dom";
import Button from "../../../components/Button";

export default function Report() {
  const { user } = authUser();
  const {interviewID} =useParams();
  const { report, loading, getInterviewReportByID,generateUpdatedResumePDF } = useInterview();
  const isAuthenticated = Boolean(user);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () =>{
    setIsGenerating(true);
    try{
      await generateUpdatedResumePDF(interviewID);
    }catch(err){
      console.log(err);
    }finally{
      setIsGenerating(false);
    }
    
  }

  useEffect(()=>{
    getInterviewReportByID(interviewID)
  },[])

  if (loading) {
    return (
      <Loading
        title="Loading your interview report"
        description="Please wait while we prepare your interview report."
      />
    );
  }

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
      <main className="px-[10%]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_200px]">
          
          <div className="order-2 lg:order-1">
              <section className="mx-auto max-w-2xl px-6 pt-16 pb-8 sm:pt-20">
              <h1 className="font-serif text-3xl text-[#E7E9EC] sm:text-4xl">Your interview report</h1>
              <p className="mt-3 text-sm leading-relaxed text-[#8B94A3]">
                Based on the job description and resume you submitted, here's how you match up and how
                to prepare.
              </p>
              
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
          </div>
          <div className="order-1 flex w-full flex-col justify-between lg:order-2 lg:sticky lg:top-8 lg:h-[calc(90vh-4rem)]">
            <MatchScoreCard score={matchScore}/>
            <Button onClick = {handleDownload} disabled={isGenerating}>
              {isGenerating ? "Generating pdf..." : "Download Updated Resume"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
