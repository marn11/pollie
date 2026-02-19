"use client";
import PollVoter from "@/app/components/PollVoter";
import { useParams } from "next/navigation";
export default function Page() {
  const params = useParams();
  const pollId = Number(params.id);
  return (
    <>
      <div className="h-full flex items-center justify-center text-text">
        <PollVoter pollId={pollId} />
      </div>
    </>
  );
}

// db khsni nfkr f kifach aykon dakchi f view poll page

// khs ndir lblan dial vote then view result

// andir l3iba dial created by anonymous wla smito plus avatar mn Google

// khs ndir migration jdida nwid description dial poll

// hadchi fach fkrt l7d l2an

// vote then results

// if already voted direcrtly show results
