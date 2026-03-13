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
      className={`group grid w-full grid-cols-[auto,minmax(0,1fr)] items-center gap-3 rounded-[1.2rem] border border-slate-200/90 bg-white/94 px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_12px_28px_-26px_rgba(15,23,42,0.14)] transition-all duration-180 ease-smooth focus-within:border-brand-accent/30 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-accent/18 dark:border-slate-700/80 dark:bg-slate-900/82 dark:shadow-none dark:focus-within:bg-slate-900 sm:flex sm:px-3.5 ${className}`}
      role="search"
    >
      <span
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100/90 text-slate-400 transition duration-180 ease-smooth group-focus-within:bg-indigo-50 group-focus-within:text-brand-accent dark:bg-slate-800 dark:text-slate-500 dark:group-focus-within:bg-slate-800 ${iconClassName}`}
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
        className={`min-w-0 w-full flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500 sm:text-[0.96rem] ${inputClassName}`}
      />
      {showButton ? (
        <button
          type="submit"
          className={`ui-button-primary col-span-2 h-10 w-full shrink-0 justify-center whitespace-nowrap px-4 sm:col-auto sm:w-auto ${buttonClassName}`}
        >
          {buttonLabel}
        </button>
      ) : null}
    </form>
  );
}

export default SearchBar;
