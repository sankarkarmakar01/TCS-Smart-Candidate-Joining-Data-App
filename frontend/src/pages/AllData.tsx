"use client";

import Link from "next/link";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

interface JoiningData {
  _id: string;
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
  status: string;
  updatedAt: string;
}

interface ApiResponse {
  data: JoiningData[];
  message?: string;
  success?: boolean;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string; ringColor: string }
> = {
  APPLIED: {
    label: "Applied",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    ringColor: "ring-indigo-200",
  },
  INTERVIEW_SCHEDULED: {
    label: "Interview Scheduled",
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    ringColor: "ring-teal-200",
  },
  OFFERED: {
    label: "Offer Sent",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    ringColor: "ring-purple-200",
  },
  "1ST_SURVEY_SENT": {
    label: "1st Survey Sent",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    ringColor: "ring-amber-200",
  },
  "2ND_SURVEY_SENT": {
    label: "2nd Survey Sent",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    ringColor: "ring-blue-200",
  },
  JOINING_LETTER_ACCEPTED: {
    label: "Joining Accepted",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    ringColor: "ring-emerald-200",
  },
  JOINED: {
    label: "Joined",
    color: "text-green-700",
    bgColor: "bg-green-50",
    ringColor: "ring-green-200",
  },
  REJECTED: {
    label: "Rejected",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    ringColor: "ring-rose-200",
  },
  PENDING: {
    label: "Pending",
    color: "text-gray-700",
    bgColor: "bg-gray-50",
    ringColor: "ring-gray-200",
  },
};

const AllData: React.FC = () => {
  const [joiningData, setJoiningData] = useState<JoiningData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setLoaded(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-data`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const responseData: ApiResponse = await response.json();
      if (responseData.data && Array.isArray(responseData.data)) {
        setJoiningData(responseData.data);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Failed to fetch data: ${errorMessage}`);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setLoaded(true), 100);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        timeZone: "Asia/Kolkata",
      }),
    []
  );

  const formatDate = useCallback(
    (dateString: string): string => {
      try {
        return dateFormatter.format(new Date(dateString));
      } catch {
        return "Not Get Yet";
      }
    },
    [dateFormatter]
  );

  const getStatusConfig = useCallback((status: string) => {
    return (
      STATUS_CONFIG[status] || {
        label: status,
        color: "text-gray-700",
        bgColor: "bg-gray-50",
        ringColor: "ring-gray-200",
      }
    );
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/update/${id}`);
  };

  const DataField: React.FC<{
    label: string;
    value: string;
    isDate?: boolean;
  }> = ({ label, value, isDate = false }) => (
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </span>
      <span className={`mt-1 text-base font-medium text-gray-900`}>
        {isDate ? formatDate(value) : value || "—"}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-gray-300 border-t-gray-900 mb-6"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading candidate data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchData}
            className="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      <div
        className={`transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header + Stats + Button Container */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              TCS Smart Candidate Joining Data
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Track and manage all candidate onboarding progress
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
            {[
              {
                label: "Total Candidates",
                value: joiningData.length,
                color: "text-gray-900",
              },
              {
                label: "Active Process",
                value: joiningData.filter((d) => !d.status.includes("REJECTED"))
                  .length,
                color: "text-blue-600",
              },
              {
                label: "Joining Letter Accepted",
                value: joiningData.filter((d) =>
                  d.status.includes("JOINING_LETTER_ACCEPTED")
                ).length,
                color: "text-amber-600",
              },
              {
                label: "Joined In TCS",
                value: joiningData.filter((d) => d.status.includes("JOINED"))
                  .length,
                color: "text-emerald-600",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold mt-3 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Candidate Button */}
          <div className="flex justify-center mb-4">
            <Link href="/add">
              <button
                className="
                w-full max-w-md 
                px-8 py-4 
                bg-gray-900 text-white 
                font-semibold text-lg 
                rounded-xl 
                shadow-lg hover:shadow-xl 
                hover:bg-gray-800 
                focus:outline-none focus:ring-4 focus:ring-gray-300 
                transition-all duration-300 
                flex items-center justify-center gap-3 
                transform hover:scale-105 active:scale-95
                cursor-pointer
              "
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Candidate
              </button>
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {joiningData.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
              <div className="text-7xl mb-6">📄</div>
              <h3 className="text-2xl font-bold text-gray-800">
                No Records Found
              </h3>
              <p className="text-gray-500 mt-3 text-lg">
                There are currently no candidate records to display.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {joiningData.map((item, index) => {
                const statusConfig = getStatusConfig(item.status);

                return (
                  <div
                    key={`${item.fullName}-${index}`}
                    className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col h-full overflow-hidden transform hover:-translate-y-2"
                  >
                    {/* Header */}
                    <div className="p-6 sm:p-7 border-b border-gray-100 bg-linear-to-r from-gray-50/80 to-transparent">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        {item.fullName}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${statusConfig.bgColor} ${statusConfig.color} ring-8 ${statusConfig.ringColor} ring-opacity-40 shadow-sm`}
                        >
                          {statusConfig.label}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">
                          Updated {formatDate(item.updatedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Addresses */}
                    <div className="p-6 sm:p-7 space-y-6 border-b border-gray-100">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                          Present Address
                        </p>
                        <p className="text-base font-medium text-gray-900 line-clamp-2">
                          {item.presentAddress || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                          Permanent Address
                        </p>
                        <p className="text-base font-medium text-gray-900 line-clamp-2">
                          {item.permanentAddress || "—"}
                        </p>
                      </div>
                    </div>

                    {/* Timeline, Survey & Joining */}
                    <div className="p-6 sm:p-7 space-y-6 border-b border-gray-100">
                      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest">
                        Timeline, Survey & Joining
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <DataField
                          label="Interview Date"
                          value={
                            item.interviewDate !== null
                              ? item.interviewDate
                              : ""
                          }
                          isDate
                        />
                        <DataField
                          label="Interview Location"
                          value={
                            item.interviewLocation !== null
                              ? item.interviewLocation
                              : ""
                          }
                        />
                        <DataField
                          label="Offer Letter Date"
                          value={
                            item.offerLetterDate !== null
                              ? item.offerLetterDate
                              : ""
                          }
                          isDate
                        />
                        <DataField
                          label="1st Survey"
                          value={
                            item.firstSurveyMailDate !== null
                              ? item.firstSurveyMailDate
                              : ""
                          }
                          isDate
                        />
                        <DataField
                          label="2nd Survey"
                          value={
                            item.secondSurveyMailDate !== null
                              ? item.secondSurveyMailDate
                              : ""
                          }
                          isDate
                        />
                        <DataField
                          label="Joining Letter"
                          value={
                            item.joiningLetterDate !== null
                              ? item.joiningLetterDate
                              : ""
                          }
                          isDate
                        />
                        <DataField
                          label="Joining Date"
                          value={
                            item.joiningDate !== null ? item.joiningDate : ""
                          }
                          isDate
                        />
                        <DataField
                          label="Joining Location"
                          value={
                            item.joiningLocation !== null
                              ? item.joiningLocation
                              : ""
                          }
                        />
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-auto p-6 sm:p-7 bg-gray-50 border-t border-gray-100">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="w-full px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 transform hover:scale-105 active:scale-97 cursor-pointer"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit Candidate
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
          <p className="text-center text-sm font-medium text-gray-600">
            Showing {joiningData.length} candidate
            {joiningData.length !== 1 ? "s" : ""} • Last updated:{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllData;
