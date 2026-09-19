const { GoogleGenAI }  = require("@google/genai");
const z = require("zod");


const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});

const interviewReportJsonSchema = {
  type: "object",

  properties: {

    matchScore: {
      type: "number",
      description:
        "Match score from 0 to 100 based on how well the candidate matches the job description."
    },

    technicalQuestions: {
      type: "array",
      minItems: 5,
      maxItems: 7,
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "Technical interview question."
          },
          intention: {
            type: "string",
            description:
              "What technical skill or knowledge the interviewer wants to evaluate."
          },
          answer: {
            type: "string",
            description:
              "A strong candidate answer to the question."
          }
        },
        required: ["question", "intention", "answer"]
      }
    },

    behavioralQuestions: {
      type: "array",
      minItems : 3,
      maxItems: 7,
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "Behavioral interview question."
          },
          intention: {
            type: "string",
            description:
              "The behavioral competency or trait being evaluated."
          },
          answer: {
            type: "string",
            description:
              "A strong example answer based on the candidate's background."
          }
        },
        required: ["question", "intention", "answer"]
      }
    },

    skillGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
            description: "The missing or weak skill."
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "Severity of the skill gap."
          }
        },
        required: ["skill", "severity"]
      }
    },

    preparationPlan: {
      type: "array",
      minItems : 3,
      maxItems : 7,
      items: {
        type: "object",
        properties: {
          day: {
            type: "integer",
            description: "Preparation day number."
          },
          focus: {
            type: "string",
            description: "Main focus for the day."
          },
          tasks: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Tasks to complete that day."
          }
        },
        required: ["day", "focus", "tasks"]
      }
    }

  },

  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan"
  ]
};

const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);

const generateReport = async (jobDescription,resume,selfDescription) => {        
    const prompt = `
    You are an expert technical recruiter and interview preparation assistant.

    Analyze the candidate's resume and self-description against the job description and generate a personalized interview preparation report.

    JOB DESCRIPTION:
    ${jobDescription}

    CANDIDATE RESUME:
    ${resume}

    CANDIDATE SELF-DESCRIPTION:
    ${selfDescription}

    Generate the following:

    1. MATCH SCORE
    Calculate a matchScore from 0 to 100.

    Base the score primarily on required qualifications and skills, then consider preferred qualifications, relevant projects, experience, and education.

    Missing important required skills should significantly reduce the score.
    Do not give a high score simply because the candidate has several related technologies.
    Only consider skills and experience that are actually demonstrated in the provided information.

    2. TECHNICAL QUESTIONS
    Generate 5 relevant technical interview questions for this specific role.

    For each question provide:
    - question
    - intention
    - concise, technically accurate answer

    Questions should focus on important technologies and concepts from the job description and the candidate's background.

    If the candidate has explicitly demonstrated experience with a technology, the answer may refer to that experience.

    If the candidate only lists a technology as a skill, explain the concept without inventing a specific project experience.

    If the candidate has no demonstrated experience with a technology, explain the concept or phrase the answer as what the candidate would do.

    3. BEHAVIORAL QUESTIONS
    Generate 3 relevant behavioral interview questions based on the role and the candidate's background.

    For each question provide:
    - question
    - intention
    - concise example answer

    Behavioral answers must be grounded in the provided resume and self-description.

    Do NOT invent:
    - specific incidents
    - bugs
    - responsibilities
    - achievements
    - metrics
    - team interactions
    - companies
    - projects
    - technologies used
    - outcomes

    If the provided information does not contain a suitable real experience, provide a general interview-ready answer without claiming that the event actually happened.

    Do not create fictional STAR stories.

    4. SKILL GAPS
    Identify important skills explicitly required or preferred by the job description that are missing or weakly demonstrated in the candidate's background.

    For each skill provide:
    - skill
    - severity: "low", "medium", or "high"

    Use:
    - high: important required skill that is missing or barely demonstrated
    - medium: relevant preferred skill or partially demonstrated skill
    - low: minor gap that is useful but not central to the role

    Do not identify unrelated technologies as skill gaps.

    5. PREPARATION PLAN
    Create a 5-day practical interview preparation plan based on the candidate's skill gaps and the job requirements.

    For each day provide:
    - day
    - focus
    - tasks

    Prioritize important skill gaps and interview-relevant topics.

    IMPORTANT RULES:
    - Treat the resume and self-description as the source of truth about the candidate's actual experience.
    - Treat the job description as the source of truth for job requirements.
    - Never fabricate candidate experience, credentials, projects, achievements, incidents, responsibilities, or technologies used.
    - Do not claim the candidate performed an action unless the provided information supports it.
    - Distinguish between skills the candidate actually demonstrates and skills they need to learn.
    - Keep technical and behavioral answers concise and interview-ready.
    - Do not encourage the candidate to claim experience they do not have.
    - Return only the structured response matching the provided schema.
    `;

    const interaction = await ai.interactions.create({
        model: "gemini-3.1-flash-lite",
        input: prompt,
        response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema: interviewReportJsonSchema
        },
    });
    const interviewReport = interviewReportSchema.parse(JSON.parse(interaction.output_text));
    console.log(JSON.stringify(interviewReport, null, 2));
}

module.exports = generateReport



