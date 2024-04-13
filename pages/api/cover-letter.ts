import type { NextApiRequest, NextApiResponse } from "next";
import OpenA from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const openai = new OpenA({ apiKey: req.headers.api_key as string });

  const finalPrompt = `
    ${promptInstructions}
    ${`- Escreva a cover letter em ${req.body.language}`}

    <cv>${req.body.cv}<cv>

    <job-description>${req.body.job_description}<job-description>

    
  `;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: roleMessage,
      },
      { role: "user", content: finalPrompt },
    ],
    temperature: 0.5,
    max_tokens: 4000,
    top_p: 0.95,
    model: "gpt-3.5-turbo",
  });

  const response = completion.choices[0];

  return res.status(200).json({ cover_letter: response.message.content });
}

const roleMessage = `
  - Você é um profissional de RH experiente em contratar profissionais de tecnologia e programadores, e está ajudando um programador a escrever uma cover letter.
`;

const promptInstructions = `
  - Analise o <cv> e a <job-description>
  - Identifique no <cv> as tech skills mais relevantes (linguagens de programação, frameworks, metodologias, clouds), alinhadas com as exigências da <job-description>
  - Identifique no <cv> skills não ténicas e informações sobre a formação (graduções, mestrados e doutorados, caso existam) que também possam estar alinhadas com as exigências da <job-description>
  - Com base nisso, escreva uma cover letter para o hiring manager
  - Tente aplicara o framework STAR - Situation, Task, Action & Results
  - A cover letter deve ter no máximo 20 linhas de comprimento  
`;
