import { GripVertical, Check, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import type { Option } from "../(dashboard)/polls/create/page";

export default function FinalOption({
  option,
  setConfirmedOptions,
  setPendingOptions,
  confirmedOptions,
  pendingOptions,
}: {
  option: Option;
  setConfirmedOptions: Dispatch<SetStateAction<Option[]>>;
  setPendingOptions: Dispatch<SetStateAction<Option[]>>;
  confirmedOptions: Option[];
  pendingOptions: Option[];
}) {
  return (
    <>
      <li
        className="flex items-center justify-between text-text
									transition-all ease-in-out gap-2"
      >
        <button
          className="cursor-pointer hover:bg-bg/70 p-2.5 rounded-lg
                  transition ease-in-out"
          type="button"
        >
          <GripVertical />
        </button>
        <input
          className="bg-bg hover:bg-light rounded-full px-4 p-2.5 w-full shadow-xl
                    focus:ring-2 focus:ring-border/70 transition ease-in-out focus:outline-none"
          value={option.value}
          disabled
        />
        <button
          className="cursor-pointer border-border/30 bg-bg hover:bg-bg/70 p-2.5 rounded-lg
                  transition ease-in-out focus:ring-2 focus:ring-border/70 focus:outline-none"
          type="button"
          onClick={() => {
            if (confirmedOptions.length + pendingOptions.length === 1) {
              setConfirmedOptions((prevOptions) =>
                prevOptions.filter((safeOption) => safeOption != option),
              );
              setPendingOptions([{ id: crypto.randomUUID(), value: "" }]);
              return;
            }
            setConfirmedOptions((prevOptions) =>
              prevOptions.filter((safeOption) => safeOption != option),
            );
          }}
        >
          <X />
        </button>
      </li>
    </>
  );
}
