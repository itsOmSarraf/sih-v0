'use client';
import { useState } from 'react';
import searchUUID from 'app/actions/searchComplaint';
import { Complaintread } from '@/lib/schema';

export default function SearchTicket() {
  const [inputValue, setInputValue] = useState('');
  const [complaintData, setComplaintData] = useState<Complaintread | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setComplaintData(null);
    setError(null);
    setShowProgress(true);

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
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        {/* Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Search Ticket
          </h1>
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter UUID"
              className="flex-1 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Search
            </button>
          </form>

          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>

        {/* Complaint Details */}
        {complaintData && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-8 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Complaint Details
            </h2>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-700">PNR:</strong>{' '}
                {complaintData.PNR}
              </p>
              <p>
                <strong className="text-gray-700">UUID:</strong>{' '}
                {complaintData.uuid}
              </p>
              <p>
                <strong className="text-gray-700">Created at:</strong>{' '}
                {new Date(complaintData.created_at).toLocaleString()}
              </p>
              <p>
                <strong className="text-gray-700">Status:</strong>{' '}
                {complaintData.status}
              </p>
              <p>
                <strong className="text-gray-700">Department:</strong>{' '}
                {complaintData.department}
              </p>
              <p>
                <strong className="text-gray-700">Subtype:</strong>{' '}
                {complaintData.subtype}
              </p>
              <p>
                <strong className="text-gray-700">AI Summary:</strong>{' '}
                {complaintData.oneLineAI}
              </p>
              <p>
                <strong className="text-gray-700">Original Query:</strong>{' '}
                {complaintData.originalQuery}
              </p>
              <p>
                <strong className="text-gray-700">Severity:</strong>{' '}
                {complaintData.severity}
              </p>
            </div>
          </div>
        )}

        {/* Progress Indicator */}

        {showProgress && (
          <div className="w-screen">
            <ol className="flex items-center mx-auto">
              <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg
                    className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                  </svg>
                </span>
              </li>
              <li className="flex items-center w-full">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg
                    className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                  </svg>
                </span>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
