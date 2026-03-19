
import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { callGemini } from './services/geminiService';
import type { ApiResponse, FormState, AppMode } from './types';

const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>('generate');
    const [formState, setFormState] = useState<FormState>({
        jobSummary: '',
        freelancerProfile: '',
        clientName: '',
        draftCoverLetter: '',
        industry: '',
        clientProblem: '',
        tools: '',
        tone: 'Professional',
        timeline: '',
        socialProof: '',
    });
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setApiResponse(null);

        try {
            const result = await callGemini(formState, mode);
            setApiResponse(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [formState, mode]);

    return (
        <div className="min-h-screen font-sans">
            <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
                        Upwork Cover Letter Generator
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Craft winning proposals that feel human, not robotic.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <InputForm
                            mode={mode}
                            setMode={setMode}
                            formState={formState}
                            setFormState={setFormState}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="mt-8 lg:mt-0">
                        <OutputDisplay
                            mode={mode}
                            apiResponse={apiResponse}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
