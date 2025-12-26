"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Status =
  | ""
  | "APPLIED"
  | "INTERVIEW_SCHEDULED"
  | "OFFERED"
  | "1ST_SURVEY_SENT"
  | "2ND_SURVEY_SENT"
  | "JOINING_LETTER_ACCEPTED"
  | "JOINED"
  | "REJECTED"
  | "PENDING";

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

const AddCandidatePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create candidate");

      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 animate-gradient">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-20"></div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl md:text-4xl sm:text-5xl font-bold text-gray-900 mb-4 bg-clip-text bg-linear-to-r from-gray-900 to-gray-600">
            Add Your Candidature
          </h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Complete the form below to onboard a new candidate. All fields are
            tracked through the hiring pipeline.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-2xl p-8 sm:p-10 space-y-10 transform hover:shadow-3xl transition-all duration-500 animate-slide-up"
        >
          {/* Glass effect border */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-blue-50/20 to-purple-50/20 -z-10"></div>

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
                <Input
                  type="date"
                  label="Joining Letter Date"
                  name="joiningLetterDate"
                  value={formData.joiningLetterDate}
                  onChange={handleChange}
                  icon="✍️"
                />
              </div>
              <div className="space-y-7">
                <Input
                  label="Interview Location"
                  name="interviewLocation"
                  value={formData.interviewLocation}
                  onChange={handleChange}
                  icon="🏢"
                />
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
                    <span>Creating Candidate...</span>
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
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                    <span className="relative">
                      Create Candidate
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl border border-gray-300/20 group-hover:border-gray-300/40 transition-colors"></div>
            </button>

            {/* Cancel/Back button */}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full mt-4 px-8 py-3 text-gray-600 font-medium rounded-xl
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidatePage;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({ label, icon, ...props }) => (
  <div className="group relative flex flex-col">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 flex items-center space-x-2">
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </label>
    <input
      {...props}
      className="peer px-3 py-2 md:px-5 md:py-4 rounded-xl border-2 border-gray-200 text-base font-medium text-gray-900
                 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300
                 bg-white/50 hover:bg-white/80 placeholder-gray-400
                 group-hover:border-gray-300 group-hover:shadow-sm"
    />
    <div className="absolute inset-0 rounded-xl border border-transparent peer-focus:border-blue-300 pointer-events-none transition-colors duration-300"></div>
  </div>
);

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, icon, ...props }) => (
  <div className="group relative flex flex-col">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 flex items-center space-x-2">
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </label>
    <textarea
      rows={4}
      {...props}
      className="peer px-3 py-2 md:px-5 md:py-4 rounded-xl border-2 border-gray-200 text-base font-medium text-gray-900
                 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300
                 bg-white/50 hover:bg-white/80 placeholder-gray-400 resize-none
                 group-hover:border-gray-300 group-hover:shadow-sm"
    />
    <div className="absolute inset-0 rounded-xl border border-transparent peer-focus:border-blue-300 pointer-events-none transition-colors duration-300"></div>
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: string;
}

const Select: React.FC<SelectProps> = ({ label, icon, value, ...props }) => {
  const statuses: Status[] = [
    "APPLIED",
    "INTERVIEW_SCHEDULED",
    "OFFERED",
    "1ST_SURVEY_SENT",
    "2ND_SURVEY_SENT",
    "JOINING_LETTER_ACCEPTED",
    "JOINED",
    "REJECTED",
    "PENDING",
  ];

  return (
    <div className="group relative flex flex-col">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 flex items-center space-x-2">
        {icon && <span className="text-base">{icon}</span>}
        <span>{label}</span>
      </label>
      <div className="relative">
        <select
          value={value}
          {...props}
          className="peer w-full px-3 py-2 md:px-5 md:py-4 rounded-xl border-2 border-gray-200 text-base font-medium outline-none transition-all duration-300
                     bg-white/50 hover:bg-white/80 appearance-none cursor-pointer
                     group-hover:border-gray-300 group-hover:shadow-sm
                     focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                     valid:text-gray-900
                     [:not(:valid)]:text-gray-400"
        >
          <option value="" disabled>
            --Select--
          </option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 peer-focus:rotate-180">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl border border-transparent peer-focus:border-blue-300 pointer-events-none transition-colors duration-300" />
    </div>
  );
};
