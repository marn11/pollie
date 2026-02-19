import { Check, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import type { Option } from "../(dashboard)/polls/create/page";

export default function EditOption({
  pendingOptions,
  confirmedOptions,
  setConfirmedOptions,
  setPendingOptions,
  option,
}: {
  setPendingOptions: Dispatch<SetStateAction<Option[]>>;
  setConfirmedOptions: Dispatch<SetStateAction<Option[]>>;
  pendingOptions: Option[];
  confirmedOptions: Option[];
  option: Option;
}) {
  return (
    <>
      <li
        className="flex items-center justify-between text-text
									transition-all ease-in-out gap-2"
      >
        <input
          value={option.value}
          onChange={(e) =>
            setPendingOptions((prev) =>
              prev.map((opt) =>
                opt.id === option.id ? { ...opt, value: e.target.value } : opt,
              ),
            )
          }
          className="border hover:bg-bg border-border/30 rounded-lg p-2.5 w-full
                    focus:ring-2 focus:ring-border/70 transition ease-in-out focus:outline-none"
          placeholder={`New option`}
        />
        <button
          className="cursor-pointer border-border/30 bg-bg hover:bg-bg/70 p-2.5 rounded-lg
                  transition ease-in-out focus:ring-2 focus:ring-border/70 focus:outline-none"
          type="button"
          onClick={() => {
            if (confirmedOptions.length + pendingOptions.length === 1) {
              setPendingOptions([{ id: crypto.randomUUID(), value: "" }]);
              return;
            }
            setPendingOptions((prevOptions) =>
              prevOptions.filter((safeOption) => safeOption.id !== option.id),
            );
          }}
        >
          <X />
        </button>
        <button
          className="cursor-pointer border-border/30 bg-bg hover:bg-bg/70 p-2.5 rounded-lg
                  transition ease-in-out focus:ring-2 focus:ring-border/70 focus:outline-none"
          type="button"
          onClick={() => {
            if (!option.value.trim()) return;
            setConfirmedOptions((prev) => [...prev, option]);
            setPendingOptions((prev) =>
              prev.filter((opt) => opt.id !== option.id),
            );
          }}
        >
          <Check />
        </button>
      </li>
    </>
  );
}
