export interface Voter {
  name: string;
  avatar: string | null;
  optionText: string;
  seed: string;
}

export interface PollOption {
  id: number;
  text: string;
  count: number;
  percentage: number;
}

export interface FullPollData {
  id: number;
  title: string;
  description: string;
  isAnonymous: boolean;
  creator: {
    name: string;
    avatar: string | null;
    seed: string;
  };
  hasVoted: boolean;
  selectedOptionId: number | null;
  totalVotes: number;
  options: PollOption[];
  voters: Voter[];
}