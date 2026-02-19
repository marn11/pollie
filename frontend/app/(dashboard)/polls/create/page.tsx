"use client";
import Switch from "react-switch";
import { useState } from "react";
import { Plus } from "lucide-react";
import FinalOption from "@/app/components/FinalOption";
import EditOption from "@/app/components/EditOption";
import toast from "react-hot-toast";

export type Option = {
  id: string;
  value: string;
};

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [pendingOptions, setPendingOptions] = useState<Option[]>([
    {
      id: crypto.randomUUID(),
      value: "",
    },
  ]);
  const [confirmedOptions, setConfirmedOptions] = useState<Option[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = [...confirmedOptions.map((op) => op.value)].filter(
      (val) => val.trim() !== "",
    );
    if (options.length < 2) {
      toast.error("You need at least 2 options!");
      return;
    }
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL! + "polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          isAnonymous: isAnon,
          options: options,
        }),
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Poll created successfully!");
        setTitle("");
        setDescription("");
        setConfirmedOptions([]);
        setPendingOptions([
          {
            id: crypto.randomUUID(),
            value: "",
          },
        ]);
        setIsAnon(false);
      } else {
        const errorData = await res.json();
        if (Array.isArray(errorData.message)) {
          errorData.message.map((msg: string) => toast.error(msg));
        } else toast.error(errorData.message || "Failed to create poll");
      }
    } catch (err) {
      toast.error("Something went wrong. Is the server running?");
    }
  };
  return (
    <>
      <div className="h-full flex justify-center text-text overflow-auto py-10 px-4">
        <form
          className="p-6 w-md max-w-xl
          rounded-2xl border border-border-muted/30 bg-bg-dark shadow-lg overflow-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold my-4">Create a new Poll</h2>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-text/90">
                Ask a question*
              </span>
              <input
                type="text"
                required
                placeholder="Poll title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus:outline-none p-3 border hover:bg-bg-dark border-border-muted/30 rounded-xl bg-bg text-text focus:ring-2 focus:ring-border/70
                transition ease-in-out"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-text/90">
                Description*
              </span>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Poll description"
                className="focus:outline-none p-3 border hover:bg-bg-dark border-border-muted/30 rounded-xl bg-bg text-text focus:ring-2 focus:ring-border/70
                transition ease-in-out"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-text/90">
                Options*
              </span>
              <ul className="flex flex-col gap-2">
                {confirmedOptions.map((option) => (
                  <FinalOption
                    confirmedOptions={confirmedOptions}
                    setConfirmedOptions={setConfirmedOptions}
                    setPendingOptions={setPendingOptions}
                    pendingOptions={pendingOptions}
                    key={option.id}
                    option={option}
                  />
                ))}
                {pendingOptions.map((option) => (
                  <EditOption
                    setPendingOptions={setPendingOptions}
                    setConfirmedOptions={setConfirmedOptions}
                    pendingOptions={pendingOptions}
                    confirmedOptions={confirmedOptions}
                    key={option.id}
                    option={option}
                  />
                ))}
              </ul>
              <button
                className="flex items-center justify-center gap-2 shadow-sm font-semibold py-2 px-4
            hover:bg-info/80 bg-info text-bg-dark cursor-pointer focus:ring-2 focus:ring-white/30
              inset-shadow-sm inset-shadow-bg w-full my-3 focus:outline-none
              rounded-xl hover:-translate-y-1 transition-all ease-in-out"
                onClick={() => {
                  if (pendingOptions.length + confirmedOptions.length >= 8) {
                    toast.error("You can't exceed 8 options!");
                    return;
                  }
                  setPendingOptions((prev) => [
                    ...prev,
                    { id: crypto.randomUUID(), value: "" },
                  ]);
                }}
                type="button"
              >
                <Plus color="#0b1610" strokeWidth={3} />
                <span className="font-semibold">New option</span>
              </button>
            </div>
          </div>
          <label className="flex items-center justify-between my-1">
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-text/90">
                Make this an anonymous poll
              </span>
              <span className="text-text/70 text-sm font-light">
                (No one can find out who created this poll)
              </span>
            </div>
            <Switch
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              uncheckedIcon={false}
              checkedIcon={false}
              onChange={() => setIsAnon(!isAnon)}
              checked={isAnon}
            />
          </label>
          <div className="flex items-center justify-center gap-3 mt-6 w-full">
            <button
              type="submit"
              className="shadow-sm hover:bg-primary/80 bg-primary text-bg-dark cursor-pointer
              font-semibold p-2 px-4 focus:ring-2 focus:ring-primary/70
              inset-shadow-sm inset-shadow-border focus:outline-none
              rounded-2xl hover:-translate-y-1 transition-all ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
