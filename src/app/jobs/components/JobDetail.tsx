// src/components/JobDetail.tsx (o donde tengas el componente)
"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { fetchJobById } from "@/state/api/fetchJob";

interface JobDetailProps {
  jobId?: string;
}

export default function JobDetail({ jobId = "b1a947d7-ec97-4380-b1de-0416f0f5c3e4" }: JobDetailProps) {
  const dispatch = useAppDispatch();
  const { job, loading, error } = useAppSelector((state) => state.job);

  useEffect(() => {
    if (jobId) {
      fetchJobById(jobId, dispatch);
    }
  }, [jobId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading job details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3 className="text-red-800 font-medium">Error loading job</h3>
        <p className="text-red-600 mt-1">{error}</p>
        <button 
          onClick={() => fetchJobById(jobId, dispatch)}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No job data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
        
        {job.company && (
          <p className="text-lg text-gray-600 mb-2">
            <strong>Company:</strong> {job.company}
          </p>
        )}
        
        {job.location && (
          <p className="text-lg text-gray-600 mb-2">
            <strong>Location:</strong> {job.location}
          </p>
        )}
        
        {job.salary && (
          <p className="text-lg text-gray-600 mb-4">
            <strong>Salary:</strong> {job.salary}
          </p>
        )}
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>
        
        {job.requirements && job.requirements.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Requirements</h2>
            <ul className="list-disc list-inside space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Debug info - remover en producción */}
        <details className="mt-6 bg-gray-50 p-4 rounded">
          <summary className="cursor-pointer text-sm text-gray-600">Debug Info</summary>
          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(job, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}