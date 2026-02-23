import { FaSearch } from "react-icons/fa";

function SearchBar({ value, onChange, placeholder = "Search prompts...", className = "" }) {
  return (
    <label
      className={`group flex w-full items-center gap-2 rounded-xl border border-brand-border bg-white px-4 py-2 text-sm transition duration-300 focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/40 dark:border-slate-700 dark:bg-slate-900 ${className}`}
      aria-label="Search prompts"
    >
      <FaSearch className="text-slate-400 transition group-focus-within:text-brand-secondary dark:text-slate-500 dark:group-focus-within:text-brand-accent" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </label>
  );
}

export default SearchBar;
