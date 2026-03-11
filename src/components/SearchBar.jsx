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
  inputClassName = "",
  buttonClassName = "",
  iconClassName = ""
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
      className={`group flex w-full items-center gap-3 rounded-[1.35rem] border border-slate-200 bg-white px-4 py-3 shadow-soft transition-all duration-180 ease-smooth focus-within:border-brand-accent/35 focus-within:shadow-panel focus-within:ring-2 focus-within:ring-brand-accent/20 ${className}`}
      role="search"
    >
      <span
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition duration-180 ease-smooth group-focus-within:bg-indigo-50 group-focus-within:text-brand-accent ${iconClassName}`}
      >
        <FaSearch />
      </span>
      <label className="sr-only" htmlFor={inputId}>
        Search prompts
      </label>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-[0.98rem] ${inputClassName}`}
      />
      {showButton ? (
        <button
          type="submit"
          className={`ui-button-primary h-11 shrink-0 whitespace-nowrap px-5 ${buttonClassName}`}
        >
          {buttonLabel}
        </button>
      ) : null}
    </form>
  );
}

export default SearchBar;
