import type {PlanInterface} from "~/interfaces/server/plan.interface";

export interface employer_info_interface {
	ends_at: Date,
	starts_at: Date,
	featured_remaining: number,
	plan: PlanInterface,
	is_valid: boolean,
}