'use client'
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// You would typically store this in an environment variable
// const API_KEY = process.env.;

const genAI = new GoogleGenerativeAI('AIzaSyAQKun6pRAxsGT287UMwl1B5NC3BSmvqLY');

export default function ImageUploadAndQuery() {
    const [image, setImage] = useState<File | null>(null);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!image || !query) return;

        setLoading(true);
        try {
            const imageData = await fileToGenerativePart(image);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            const result = await model.generateContent([query, imageData]);
            const text = await result.response.text();
            setResponse(text);
        } catch (error) {
            console.error('Error querying Gemini API:', error);
            setResponse('An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };

    async function fileToGenerativePart(file: File): Promise<{
        inlineData: { data: string; mimeType: string };
    }> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve({
                        inlineData: {
                            data: reader.result.split(',')[1],
                            mimeType: file.type,
                        },
                    });
                } else {
                    reject(new Error('Failed to read file'));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Image Upload and Query</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="image-upload" className="block mb-2">
                        Upload an image:
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="query" className="block mb-2">
                        Ask a question about the image:
                    </label>
                    <input
                        type="text"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border p-2 w-full"
                        placeholder="What's in this image?"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!image || !query || loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>
            {response && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Response:</h2>
                    <p className="whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    );
}