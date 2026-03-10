import { useId } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search prompts...",
  buttonLabel = "Search",
  showButton = true,
  className = "",
  inputClassName = ""
}) {
  const inputId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!onSubmit) return;
    onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`group flex w-full items-center gap-3 rounded-full border border-slate-200/90 bg-white/95 px-4 py-2.5 shadow-soft transition duration-300 focus-within:border-brand-accent focus-within:shadow-[0_18px_32px_-28px_rgba(142,90,43,0.45)] focus-within:ring-2 focus-within:ring-brand-accent/20 ${className}`}
      role="search"
    >
      <FaSearch className="shrink-0 text-slate-400 transition group-focus-within:text-brand-accent" />
      <label className="sr-only" htmlFor={inputId}>
        Search prompts
      </label>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-[0.95rem] ${inputClassName}`}
      />
      {showButton ? (
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-full bg-brand-ink px-5 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-brand-ink/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
        >
          {buttonLabel}
        </button>
      ) : null}
    </form>
  );
}

export default SearchBar;
