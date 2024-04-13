import axios from "axios";
import React, { useState } from "react";

interface IState {
  cv: string;
  jobDescription: string;
  language: string;
  apiKey: string;
  response: string;
}

export const usePageLanding = () => {
  const [state, setState] = useState<IState>({
    cv: "",
    jobDescription: "",
    language: "",
    apiKey: "",
    response: "",
  });

  const onChange = (key: keyof IState, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const generateCoverLetter = async () => {
    const { data } = await axios.post(
      "/api/cover-letter",
      {
        cv: state.cv,
        job_description: state.jobDescription,
        language: state.language,
      },
      {
        headers: {
          api_key: state.apiKey,
        },
      }
    );

    console.log("[data]", data);
    const coverLetter = data.cover_letter as string;
    setState((prev) => ({ ...prev, response: coverLetter }));
  };

  return {
    state: {
      ...state,
    },
    methods: {
      onChange,
      generateCoverLetter,
    },
  };
};
