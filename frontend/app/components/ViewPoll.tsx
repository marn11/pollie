import { Eye } from "lucide-react";
import Link from "next/link";

export default function ViewPoll({pollId} : {pollId: number}) {
  return (
    <>
      <Link href={`/polls/${pollId}`}>
      <button className="scale flex items-center px-4 py-2 rounded-2xl bg-primary
						 hover:bg-primary/80 gap-2 cursor-pointer text-bg-dark font-semibold
							 transition-all ease-in-out
							inset-shadow-sm inset-shadow-border ">
        <Eye color="#0b1610" strokeWidth={2} />
        <span className="font-semibold hidden lg:block">
          See options
        </span>
      </button>
      </Link>
    </>
  );
}
