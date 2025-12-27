"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";

type Status =
  | "APPLIED"
  | "INTERVIEW_SCHEDULED"
  | "OFFERED"
  | "1ST_SURVEY_SENT"
  | "2ND_SURVEY_SENT"
  | "JOINING_LETTER_ACCEPTED"
  | "JOINED"
  | "REJECTED"
  | "PENDING"
  | "";

interface FormData {
  fullName: string;
  permanentAddress: string;
  presentAddress: string;
  interviewDate: string;
  interviewLocation: string;
  offerLetterDate: string;
  firstSurveyMailDate: string;
  secondSurveyMailDate: string;
  joiningLetterDate: string;
  joiningDate: string;
  joiningLocation: string;
  status: Status;
}

interface ApiResponse {
  success: boolean;
  data: FormData;
}

const initialState: FormData = {
  fullName: "",
  permanentAddress: "",
  presentAddress: "",
  interviewDate: "",
  interviewLocation: "",
  offerLetterDate: "",
  firstSurveyMailDate: "",
  secondSurveyMailDate: "",
  joiningLetterDate: "",
  joiningDate: "",
  joiningLocation: "",
  status: "",
};

const UpdateCandidatePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [formData, setFormData] = useState<FormData>(initialState);
  const [apiData, setApiData] = useState<FormData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatDate = (date?: string | null) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (!id) {
      setError("No candidate ID provided");
      setFetching(false);
      return;
    }

    const fetchCandidate = async () => {
      try {
        setFetching(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-single-data/${id}`
        );

        if (!res.ok) {
          throw new Error(`Fetch failed (${res.status})`);
        }

        const json: ApiResponse = await res.json();
        const candidate = json.data;

        const mapped: FormData = {
          fullName: candidate.fullName || "",
          permanentAddress: candidate.permanentAddress || "",
          presentAddress: candidate.presentAddress || "",
          interviewDate: formatDate(candidate.interviewDate),
          interviewLocation: candidate.interviewLocation || "",
          offerLetterDate: formatDate(candidate.offerLetterDate),
          firstSurveyMailDate: formatDate(candidate.firstSurveyMailDate),
          secondSurveyMailDate: formatDate(candidate.secondSurveyMailDate),
          joiningLetterDate: formatDate(candidate.joiningLetterDate),
          joiningDate: formatDate(candidate.joiningDate),
          joiningLocation: candidate.joiningLocation || "",
          status: candidate.status || "",
        };

        setApiData(candidate);
        setFormData(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setFetching(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-data/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update failed");
      }

      setSuccess("Candidate updated successfully!");

      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (!apiData) return;

    setFormData({
      fullName: apiData.fullName || "",
      permanentAddress: apiData.permanentAddress || "",
      presentAddress: apiData.presentAddress || "",
      interviewDate: formatDate(apiData.interviewDate),
      interviewLocation: apiData.interviewLocation || "",
      offerLetterDate: formatDate(apiData.offerLetterDate),
      firstSurveyMailDate: formatDate(apiData.firstSurveyMailDate),
      secondSurveyMailDate: formatDate(apiData.secondSurveyMailDate),
      joiningLetterDate: formatDate(apiData.joiningLetterDate),
      joiningDate: formatDate(apiData.joiningDate),
      joiningLocation: apiData.joiningLocation || "",
      status: apiData.status || "",
    });

    setError(null);
    setSuccess(null);
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin delay-75"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading candidate data...
          </p>
          <p className="mt-2 text-sm text-gray-400">ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error && !formData.fullName) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Candidate
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 animate-gradient">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-20"></div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-green-500 to-blue-600 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl md:text-4xl sm:text-5xl font-bold text-gray-900 mb-4 bg-clip-text bg-linear-to-r from-gray-900 to-gray-600">
            Update Candidate
          </h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Update candidate information. All changes are tracked through the
            hiring pipeline.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-2xl p-8 sm:p-10 space-y-10 transform hover:shadow-3xl transition-all duration-500 animate-slide-up"
        >
          {/* Glass effect border */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-blue-50/20 to-green-50/20 -z-10"></div>

          {/* Error Alert with animation */}
          {error && (
            <div className="animate-shake bg-linear-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-xl text-sm font-medium shadow-md">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Full Name & Status */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              icon="👤"
            />

            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              icon="📊"
            />
          </section>

          {/* Addresses */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Textarea
              label="Present Address"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              icon="🏠"
            />
            <Textarea
              label="Permanent Address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              icon="📍"
            />
          </section>

          {/* Timeline, Survey & Joining */}
          <section className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-linear-to-r from-blue-100 to-purple-100 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-700 uppercase tracking-widest">
                Timeline, Survey & Joining Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="space-y-7">
                <Input
                  type="date"
                  label="Interview Date"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleChange}
                  icon="🗓️"
                />
                <Input
                  label="Interview Location"
                  name="interviewLocation"
                  value={formData.interviewLocation}
                  onChange={handleChange}
                  icon="🏢"
                />
                <Input
                  type="date"
                  label="Offer Letter Date"
                  name="offerLetterDate"
                  value={formData.offerLetterDate}
                  onChange={handleChange}
                  icon="📄"
                />
                <Input
                  type="date"
                  label="1st Survey Date"
                  name="firstSurveyMailDate"
                  value={formData.firstSurveyMailDate}
                  onChange={handleChange}
                  icon="📧"
                />
              </div>
              <div className="space-y-7">
                <Input
                  type="date"
                  label="2nd Survey Date"
                  name="secondSurveyMailDate"
                  value={formData.secondSurveyMailDate}
                  onChange={handleChange}
                  icon="📨"
                />
                <Input
                  type="date"
                  label="Joining Letter Date"
                  name="joiningLetterDate"
                  value={formData.joiningLetterDate}
                  onChange={handleChange}
                  icon="✍️"
                />
                <Input
                  type="date"
                  label="Joining Date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  icon="🎉"
                />
                <Input
                  label="Joining Location"
                  name="joiningLocation"
                  value={formData.joiningLocation}
                  onChange={handleChange}
                  icon="🏢"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full px-8 py-4 bg-linear-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-2xl
                         hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300/50
                         transition-all duration-300 shadow-lg hover:shadow-2xl
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:from-gray-900
                         transform hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <div className="flex items-center justify-center space-x-3 ">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Updating Candidate...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="relative">
                      Update Candidate
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl border border-green-300/20 group-hover:border-green-300/40 transition-colors"></div>
            </button>

            {/* Cancel/Back button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-8 py-3 text-gray-600 font-medium rounded-xl
                           hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200
                           transition-all duration-200 border border-gray-200 hover:border-gray-300 cursor-pointer"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                  </svg>
                  <span>Back to Dashboard</span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 text-blue-600 font-medium rounded-xl
                           hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200
                           transition-all duration-200 border border-blue-200 hover:border-blue-300 cursor-pointer"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  <span>Reset Changes</span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCandidatePage;
