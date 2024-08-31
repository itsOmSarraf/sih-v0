'use client';
import { useState, useEffect } from 'react';
import searchUUID from 'app/actions/searchComplaint';
import { Complaintread } from '@/lib/schema';
import Navbar from '@/components/Navbar';
import { uuid } from 'drizzle-orm/pg-core';

export default function SearchTicket({ params }: { params: { slug: string } }) {
    const [complaintData, setComplaintData] = useState<Complaintread | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    console.log(uuid)
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const result = await searchUUID(params.slug);
                console.log(result)
                if (Array.isArray(result) && result.length > 0) {
                    setComplaintData(result[0]);
                } else if (result === 'no data found') {
                    setError('No data found for the given UUID');
                } else {
                    setError('An unexpected error occurred');
                }
            } catch (err) {
                setError('An error occurred while fetching data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [params.slug]);

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4">Search Result for UUID: {params.slug}</h1>

                {loading && (
                    <div className="mt-4">
                        <p>Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 text-red-500">
                        <p>{error}</p>
                    </div>
                )}

                {complaintData && (
                    <div className="bg-white p-6 rounded-lg shadow-md mt-8 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Complaint Details
                        </h2>
                        <div className="space-y-2">
                            <p><strong className="text-gray-700">PNR:</strong> {complaintData.PNR}</p>
                            <p><strong className="text-gray-700">UUID:</strong> {complaintData.uuid}</p>
                            <p><strong className="text-gray-700">Created at:</strong> {new Date(complaintData.created_at).toLocaleString()}</p>
                            <p><strong className="text-gray-700">Status:</strong> {complaintData.status}</p>
                            <p><strong className="text-gray-700">Department:</strong> {complaintData.department}</p>
                            <p><strong className="text-gray-700">Subtype:</strong> {complaintData.subtype}</p>
                            <p><strong className="text-gray-700">AI Summary:</strong> {complaintData.oneLineAI}</p>
                            <p><strong className="text-gray-700">Original Query:</strong> {complaintData.originalQuery}</p>
                            <p><strong className="text-gray-700">Severity:</strong> {complaintData.severity}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}