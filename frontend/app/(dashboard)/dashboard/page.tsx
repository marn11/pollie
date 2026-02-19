"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import Poll from "@/app/components/Poll";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface MiniPollType {
  id: number;
  title: string;
  description: string;
  isAnonymous: boolean;
  creator: { name: string; avatar: string; seed: string };
  _count: {
    votes: number;
  };
}

export default function Page() {
  const [polls, setPolls] = useState<MiniPollType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL! + `polls`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch polls");
        return;
      }
      setPolls(data);
    } catch (err) {
      toast.error("Something went wrong. Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);
  return (
    <>
      <div className="text-text h-full flex flex-col gap-4">
        <div className="flex items-center justify-between px-6">
          <h1 className="text-2xl font-semibold">Latest polls created:</h1>
          <Link href={"/polls/create"}>
            <button
              className="flex items-center gap-2
												shadow-sm 
																hover:bg-primary/80 bg-primary text-bg-dark cursor-pointer
															font-semibold p-2 px-4
              inset-shadow-sm inset-shadow-border
              rounded-2xl hover:-translate-y-1 transition-all ease-in-out"
            >
              <Plus color="#0b1610" strokeWidth={3} />
              <span className="font-semibold">New poll</span>
            </button>
          </Link>
        </div>
        <div className="flex gap-3 flex-wrap overflow-auto min-h-0 p-4 rounded-2xl shadow-inner">
          {isLoading ? (
            <p className="text-text/50 animate-pulse">Loading polls...</p>
          ) : polls.length > 0 ? (
            polls.map((poll) => <Poll key={poll.id} poll={poll} />)
          ) : (
            <p className="text-text/50">
              No polls found. Be the first to create one!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
