import { Status } from "@/pages/AddData";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  icon,
  value,
  ...props
}) => {
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
