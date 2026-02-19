"use client";
import Switch from "react-switch";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import PollResults from "./PollResults";
import toast from "react-hot-toast";
import { FullPollData } from "@/poll-types";

export default function PollVoter({ pollId }: { pollId: number }) {
  const [loading, setLoading] = useState(true);
  const [voteAnon, setVoteAnon] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [pollData, setPollData] = useState<FullPollData | null>(null);

  const fetchPoll = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}polls/${pollId}`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();
      console.log(data);
      setPollData(data);
    } catch (err) {
      toast.error("Failed to load poll.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, [pollId]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOptionId) return toast.error("Please select an option!");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}polls/${pollId}/vote`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          optionId: selectedOptionId,
          voteAnonymous: voteAnon,
        }),
      },
    );
    if (res.ok) {
      toast.success("Successfully voted!");
      fetchPoll();
    } else {
      const err = await res.json();
      toast.error(err.message || "Failed to vote");
    }
  };
  if (loading)
    return <div className="animate-pulse text-text/50">Loading poll...</div>;
  if (!pollData) return <div className="text-error">Poll not found.</div>;
  if (pollData.hasVoted) {
    return <PollResults data={pollData} />;
  }

  return (
    <form
      className="flex flex-col gap-3 p-6 h-fit w-md max-w-xl 
          rounded-2xl border border-border-muted/30 bg-bg-dark shadow-lg overflow-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-3xl text-text">{pollData.title}</h2>
      <p className="text-text/60 text-base -mt-2">{pollData.description}</p>
      <div className="text-text/70 mt-3 flex gap-2 font-light text-sm items-center">
        <span>{pollData.totalVotes} vote(s)</span>
        <span>●</span>
        <span>Vote to see results</span>
      </div>
      <ul className="flex flex-col gap-2 my-2">
        {pollData.options.map((opt: any) => (
          <li key={opt.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedOptionId(opt.id)}
              className={`cursor-pointer flex-1 text-left font-medium px-4 py-3 rounded-xl transition-all ease-in-out border
            ${selectedOptionId === opt.id ? "bg-primary text-bg-dark border-primary" : "bg-bg hover:bg-bg/70 border-border/20"}`}
            >
              {opt.text}
            </button>
            {selectedOptionId === opt.id && <Check strokeWidth={3} className={`text-primary`} />}
          </li>
        ))}
      </ul>
      <label className="flex items-center justify-between border-t border-border/10 pt-4">
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-text/90">
            Vote anonymously
          </span>
          <span className="text-text/50 text-sm font-light">
            (No one can find out what your vote was)
          </span>
        </div>
        <Switch
          onColor="#00ff9d"
          uncheckedIcon={false}
          checkedIcon={false}
          onChange={() => setVoteAnon(!voteAnon)}
          checked={voteAnon}
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
          Submit vote!
        </button>
      </div>
    </form>
  );
}
