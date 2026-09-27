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

    Base the score primarily on the required qualifications and skills in the job description. Then consider preferred qualifications, relevant projects, experience, and education.

    Only award credit for skills and experience explicitly demonstrated in the resume or self-description.

    Missing important required qualifications should significantly reduce the score.

    Do not assume that knowledge of one technology implies knowledge of another related technology.

    Do not give a high score simply because the candidate has many technologies listed. Consider the importance of each requirement and the strength of the evidence.

    2. TECHNICAL QUESTIONS

    Generate exactly 5 technical interview questions relevant to this job.

    Prioritize important technologies and concepts that appear in the job description or are demonstrated in the candidate's background.

    For each question provide:
    - question
    - intention
    - concise, technically accurate answer

    Questions must be internally consistent. Do not mix incompatible data types, programming problems, or concepts in the same question.

    When writing answers:
    - If the candidate explicitly demonstrated experience with the topic, the answer may refer to that experience.
    - If the candidate only lists the technology as a skill, explain the concept without inventing a specific project experience.
    - If the candidate has no demonstrated experience with the technology, answer conceptually or use wording such as "I would..." rather than "I have..." or "I use...".
    - Do not invent specific implementations, project details, metrics, or outcomes.

    3. BEHAVIORAL QUESTIONS

    Generate exactly 3 behavioral interview questions relevant to this role.

    For each question provide:
    - question
    - intention
    - concise example answer

    Behavioral answers must be strictly grounded in the candidate's provided information.

    Do NOT invent:
    - specific incidents
    - bugs
    - debugging experiences
    - code reviews
    - feedback received
    - team interactions
    - responsibilities
    - achievements
    - metrics
    - companies
    - projects
    - technologies used
    - outcomes

    Do not create fictional STAR stories.

    If the resume or self-description does not contain a specific real experience suitable for the question, provide a general interview-ready answer without claiming that the event actually happened.

    For example, prefer:
    "I would approach disagreements by..."
    over:
    "During my internship, I had a disagreement where..."

    unless the provided information explicitly describes that event.

    4. SKILL GAPS

    Identify important skills explicitly required or preferred by the job description that are missing or weakly demonstrated in the candidate's background.

    For each skill provide:
    - skill
    - severity: "low", "medium", or "high"

    Use:
    - high: important required skill that is missing or barely demonstrated
    - medium: relevant preferred skill or partially demonstrated skill
    - low: minor gap that is useful but not central to the role

    Only identify skills that are explicitly mentioned or clearly required by the job description.

    Do not introduce unrelated technologies or skills.

    5. PREPARATION PLAN

    Generate exactly 5 days of interview preparation.

    Base the plan primarily on:
    - identified skill gaps
    - important job requirements
    - technical interview topics
    - behavioral interview preparation

    Prioritize important required skill gaps before lower-priority topics.

    For each day provide:
    - day
    - focus
    - tasks

    Tasks must be specific, actionable, and relevant to the job.

    IMPORTANT GROUNDING RULES:

    - Treat the resume and self-description as the only source of truth about the candidate's actual experience.
    - Treat the job description as the source of truth for job requirements.
    - Never fabricate candidate experience, credentials, projects, achievements, incidents, responsibilities, metrics, or technologies used.
    - Never turn a hypothetical example into a claim about the candidate's past.
    - Do not write "I did X", "I implemented X", "I used X", or "During my internship..." unless the provided information explicitly supports that claim.
    - When evidence is insufficient, use conceptual or hypothetical wording such as "I would..." instead.
    - Distinguish clearly between demonstrated skills and skills the candidate needs to learn.
    - Keep answers concise and interview-ready.
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