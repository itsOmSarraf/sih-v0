'use client'
import { useState } from "react";
import searchUUID from "app/actions/searchComplaint";
import { Complaintread } from "@/lib/schema";

export default function SearchTicket() {
    const [inputValue, setInputValue] = useState('');
    const [complaintData, setComplaintData] = useState<Complaintread | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setComplaintData(null);
        setError(null);

        try {
            const result = await searchUUID(inputValue);
            if (Array.isArray(result) && result.length > 0) {
                setComplaintData(result[0]);
            } else {
                setError('No data found');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        }

        setInputValue(''); // Clear input after submission
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter UUID"
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Search</button>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            {complaintData && (
                <div className="border p-4 rounded">
                    <h2 className="text-xl font-bold mb-2">Complaint Details</h2>
                    <p><strong>PNR:</strong> {complaintData.PNR}</p>
                    <p><strong>UUID:</strong> {complaintData.uuid}</p>
                    <p><strong>Created at:</strong> {new Date(complaintData.created_at).toLocaleString()}</p>
                    <p><strong>Status:</strong> {complaintData.status}</p>
                    <p><strong>Department:</strong> {complaintData.department}</p>
                    <p><strong>Subtype:</strong> {complaintData.subtype}</p>
                    <p><strong>AI Summary:</strong> {complaintData.oneLineAI}</p>
                    <p><strong>Original Query:</strong> {complaintData.originalQuery}</p>
                    <p><strong>Severity:</strong> {complaintData.severity}</p>
                </div>
            )}
        </div>
    );
}