import type { NextApiRequest, NextApiResponse } from "next";
import OpenA from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const openai = new OpenA({ apiKey: req.headers.api_key as string });

  const finalPrompt = `
    ${promptInstructions}

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

  return res.status(200).json({ job_description: response });
}

const roleMessage = `
  - Você é um profissional de RH experiente em contratar profissionais de tecnologia e programadores, e está ajudando um programador a escrever uma cover letter.
`;

const promptInstructions = `
  - Analise o <cv> e a <job-description>
  - Identifique no <cv> as principais skills, habilidades e resultados alcançados que estão alinhados com a <job-description>
  - Identifique na <job-description> os requisitos principais que estão contidos no <cv>
  - Com base nisso, escreva uma cover letter para o hiring manager
  - A cover letter deve ter no máximo 15 linhas de comprimento
  - Escreva a cover letter em inglês
`;
