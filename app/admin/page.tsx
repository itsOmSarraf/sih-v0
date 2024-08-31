'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import getAllComplaints from "app/actions/allComplaints";
import { updateComplaintStatus } from "app/actions/updateComplaintStatus";

// Define the type for a complaint
type Complaint = {
    uuid: string;
    PNR: string;
    status: 'to-do' | 'in-progress' | 'resolved';
    originalQuery: string;
    department: string;
    subtype: string;
    oneLineAI: string;
    severity: 'low' | 'medium' | 'high';
    created_at: Date;
    updated_at: Date;
    feedback?: string | null;
    stars?: number | null;
};

const ComplaintCard = ({ complaint, onStatusChange }: { complaint: Complaint; onStatusChange: (uuid: string, newStatus: 'to-do' | 'in-progress' | 'resolved') => void }) => {
    const nextStatus = {
        'to-do': 'in-progress',
        'in-progress': 'resolved',
        'resolved': 'to-do'
    };

    return (
        <Card className="mb-2">
            <CardContent className="p-4">
                <h3 className="font-bold">{complaint.PNR}</h3>
                <p>Query: {complaint.originalQuery}</p>
                <p>Department: {complaint.department}</p>
                <p>Severity: {complaint.severity}</p>
                <Button
                    onClick={() => onStatusChange(complaint.uuid, nextStatus[complaint.status] as 'to-do' | 'in-progress' | 'resolved')}
                    className="mt-2"
                >
                    Move to {nextStatus[complaint.status]}
                </Button>
            </CardContent>
        </Card>
    );
};

const KanbanColumn = ({ title, complaints, onStatusChange }: { title: string; complaints: Complaint[]; onStatusChange: (uuid: string, newStatus: 'to-do' | 'in-progress' | 'resolved') => void }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {complaints.map((complaint) => (
                <ComplaintCard key={complaint.uuid} complaint={complaint} onStatusChange={onStatusChange} />
            ))}
        </div>
    );
};

export default function ComplaintsKanbanBoard() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                setIsLoading(true);
                const allComplaints = await getAllComplaints() as Complaint[];
                console.log('Fetched complaints:', allComplaints);
                setComplaints(allComplaints);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    const handleStatusChange = async (uuid: string, newStatus: 'to-do' | 'in-progress' | 'resolved') => {
        try {
            console.log(`Updating complaint ${uuid} to status ${newStatus}`);
            const updatedComplaint = await updateComplaintStatus(uuid, newStatus);

            setComplaints((prevComplaints: any) => {
                const newComplaints = prevComplaints.map((complaint: any) =>
                    complaint.uuid === uuid ? updatedComplaint : complaint
                );
                console.log('Updated complaints state:', newComplaints);
                return newComplaints;
            });
        } catch (error) {
            console.error('Failed to update complaint status:', error);

        }
    };

    const todoComplaints = complaints.filter(c => c.status === 'to-do');
    const inProgressComplaints = complaints.filter(c => c.status === 'in-progress');
    const resolvedComplaints = complaints.filter(c => c.status === 'resolved');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Complaints Kanban Board</h1>
            <div className="flex space-x-4">
                <KanbanColumn title="To Do" complaints={todoComplaints} onStatusChange={handleStatusChange} />
                <KanbanColumn title="In Progress" complaints={inProgressComplaints} onStatusChange={handleStatusChange} />
                <KanbanColumn title="Resolved" complaints={resolvedComplaints} onStatusChange={handleStatusChange} />
            </div>
        </div>
    );
}