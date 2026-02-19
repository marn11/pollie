"use client";

import ViewPoll from "./ViewPoll";
import { useEffect, useState } from "react";

export default function Poll() {
  return (
    <>
      <div
        className="flex flex-col gap-3 rounded-2xl bg-bg-dark p-6 w-[18rem]
						h-fit border border-border/30 shadow-sm"
      >
        <h2 className="font-semibold text-xl">
          Who deserves to be the next president of the US?
        </h2>
        <div className="text-text/70 flex gap-2 font-light text-base items-center">
          <span>0 votes</span>
          <span>●</span>
          <span>Vote to see results</span>
        </div>
        <div className="w-full flex justify-center">
          <ViewPoll pollId={1} />
        </div>
      </div>
    </>
  );
}
