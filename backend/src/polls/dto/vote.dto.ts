import { IsInt, IsBoolean } from "class-validator";

export class VoteDto {
	@IsInt()
	optionId: number;

	@IsBoolean()
	voteAnonymous: boolean;
}