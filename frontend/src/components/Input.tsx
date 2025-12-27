interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, ...props }) => (
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
