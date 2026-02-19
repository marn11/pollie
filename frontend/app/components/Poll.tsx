import { MiniPollType } from "../(dashboard)/dashboard/page";
import ViewPoll from "./ViewPoll";
import { Facehash } from "facehash";
import Image from "next/image";

export default function Poll({ poll }: { poll: MiniPollType }) {
  const { creator, isAnonymous } = poll;
  return (
    <>
      <div
        className="flex flex-col gap-4 rounded-2xl bg-bg-dark p-6 w-[18rem]
						h-fit border border-border/30 shadow-sm hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="shrink-0">
            {!isAnonymous && creator.avatar ? (
              <Image
                src={creator.avatar}
                alt={creator.name}
                className="w-8 h-8 rounded-full object-cover border border-border/50"
                width={32}
                height={32}
              />
            ) : (
              <div className="rounded-full overflow-hidden border border-border/50 w-8 h-8">
                <Facehash
                  name={creator.seed}
                  size={32}
                  variant="gradient"
                  intensity3d="subtle"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-wider text-text/40 font-bold">
              Created by
            </span>
            <span className="text-sm font-medium text-text/90 truncate w-32">
              {creator.name}
            </span>
          </div>
        </div>
        <h2 className="font-semibold text-xl line-clamp-2 min-h-14">{poll.title}</h2>
        <div className="text-text/60 flex gap-2 font-light text-sm items-center">
          <span className="bg-bg px-2 py-0.5 rounded-md border border-border/20">{poll._count.votes} vote(s)</span>
          <span>●</span>
          <span>Vote to see results</span>
        </div>
        <div className="w-full flex justify-center">
          <ViewPoll pollId={poll.id} />
        </div>
      </div>
    </>
  );
}
