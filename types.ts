
export type AppMode = 'generate' | 'refine' | 'expert';

export interface FormState {
    jobSummary: string;
    freelancerProfile: string;
    clientName: string;
    draftCoverLetter: string;
    // New fields for expert mode
    industry: string;
    clientProblem: string;
    tools: string;
    tone: string;
    timeline: string;
    socialProof: string;
}

export interface CoverLetterVariation {
    label: string;
    cover_letter: string;
}

export interface GenerateApiResponse {
    job_title: string;
    client_name: string;
    variations: CoverLetterVariation[];
}

export interface RefineApiResponse {
    refined_letter: string;
}

export interface ExpertVariation {
    version_name: string;
    cover_letter: string;
    readability_score: number;
    persuasiveness_score: number;
    score_notes: string;
}

export interface ExpertApiResponse {
    variations: ExpertVariation[];
}


export type ApiResponse = GenerateApiResponse | RefineApiResponse | ExpertApiResponse;
