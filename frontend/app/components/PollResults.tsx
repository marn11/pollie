// bdl dik any
import { Facehash } from "facehash";
import { useState } from "react";
import Image from "next/image";
import { FullPollData } from "@/poll-types";
import { X } from "lucide-react";

export default function PollResults({ data }: { data: FullPollData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 p-6 w-md max-w-xl rounded-2xl border border-border/30 bg-bg-dark shadow-lg">
        <div className="flex items-center gap-3 bg-bg/40 p-3 rounded-xl border border-border/10">
          <div className="rounded-full overflow-hidden border border-border/50 w-10 h-10">
            {data.creator.avatar ? (
              <Image
                width={40}
                height={40}
                src={data.creator.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <Facehash name={data.creator.seed} size={40} variant="gradient" />
            )}
          </div>
          <div>
            <p className="text-xs text-text/40 uppercase font-semibold">
              Created by
            </p>
            <p className="text-sm font-medium">{data.creator.name}</p>
          </div>
        </div>
        <h2 className="font-bold text-2xl">{data.title}</h2>
        <div className="flex flex-col gap-4">
          {data.options.map((opt: any) => (
            <div key={opt.id} className="w-full">
              <div className="flex items-center justify-between text-sm mb-1 px-1">
                <span className="font-medium text-[16px]">{opt.text}</span>
                <span className="text-text/60 text-sm">
                  {opt._count} votes ({opt.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{ width: `${opt.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-base	 text-text/40 border-t border-border/10 pt-4">
          <span>Total: {data.totalVotes} vote(s)</span>
          <button
            onClick={() => setIsModalOpen(true)}
            type="submit"
            className="shadow-sm hover:bg-info/80 bg-info text-bg-dark cursor-pointer
              font-semibold p-2 px-4 focus:ring-2 focus:ring-info/70
              inset-shadow-sm inset-shadow-black focus:outline-none
              rounded-2xl hover:-translate-y-1 transition-all ease-in-out"
          >
            See Voters
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-bg-dark border border-border/30 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between p-6 border-b border-border/30">
                <h3 className="text-xl font-bold">Poll Participants</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-bg rounded-xl cursor-pointer transition ease-in-out"
                >
                  <X strokeWidth={3} size={20} />
                </button>
              </div>

              <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
                {data.voters.map((voter, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 bg-bg/70 rounded-2xl border border-border/5"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border/20 bg-bg">
                      {voter.avatar ? (
                        <Image
                          width={40}
                          height={40}
                          src={voter.avatar}
                          alt={voter.name}
                          className="object-cover"
                        />
                      ) : (
                        <Facehash name={voter.seed} size={40} />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        {voter.name}
                      </span>
                        <span className="text-sm text-text/30 italic ml-auto">
                          voted for {voter.optionText}
                        </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
