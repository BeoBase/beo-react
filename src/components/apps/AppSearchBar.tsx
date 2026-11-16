import { useId } from "react";

type AppSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

// A controlled search box. It holds no state and does no filtering:
// the parent owns the text and decides what to do with it.
export default function AppSearchBar({ value, onChange }: AppSearchBarProps) {
  const inputId = useId();

  return (
    <div className="mx-auto my-2 w-[min(100%-3rem,69rem)]">
      <label htmlFor={inputId} className="sr-only">
        Search apps
      </label>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search apps..."
        autoComplete="off"
        autoFocus
        className="w-full rounded-2xl border border-white/20 bg-black/30 px-5 py-3
          text-stone-100 placeholder:text-gray-300 shadow-lg backdrop-blur-md
          focus:border-white/50 focus:outline-none"
      />
    </div>
  );
}
