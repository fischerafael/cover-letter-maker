import { usePageLanding } from "../hook";

export const PageLanding = () => {
  const { state, methods } = usePageLanding();

  return (
    <div>
      <input
        placeholder="Your CV"
        value={state.cv}
        onChange={(e) => methods.onChange("cv", e.target.value)}
      />
      <input
        placeholder="Job Description"
        value={state.jobDescription}
        onChange={(e) => methods.onChange("jobDescription", e.target.value)}
      />
      <input
        placeholder="Language"
        value={state.language}
        onChange={(e) => methods.onChange("language", e.target.value)}
      />
      <input
        placeholder="API Key"
        type="password"
        value={state.apiKey}
        onChange={(e) => methods.onChange("apiKey", e.target.value)}
      />
      <button onClick={methods.generateCoverLetter}>
        Generate Cover Letter
      </button>

      {state.response && <p>{state.response}</p>}
    </div>
  );
};
