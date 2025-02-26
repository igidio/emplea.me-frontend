export interface admin_interface {
	admin_user:                 AdminUser;
	last_posts:                 LastPosts;
	post_per_category:          PostPerCategory[];
	post_reach:                 PostReach[];
	posts_per_day:              PostsPerDay[];
	posts_per_modality:         PostsPerModality[];
	posts_per_salary_type:      PostsPerSalaryType[];
	posts_per_skill:            PostsPerSkill[];
	top_ten_posts_per_location: TopTenPostsPerLocation[];
}

export interface AdminUser {
	users_admin:    number;
	users_employer: number;
	users_seeker:   number;
	users_super:    number;
	users_total:    number;
}

export interface LastPosts {
	average_interactions: number;
	last_month:           number;
	last_week:            number;
	last_year:            number;
	total:                number;
}

export interface PostPerCategory {
	category: string;
	total:    string;
}

export interface PostReach {
	day:          number;
	featured:     string;
	not_featured: string;
}

export interface PostsPerDay {
	day:   Date;
	total: string;
}

export interface PostsPerModality {
	modality: string;
	total:    string;
}

export interface PostsPerSalaryType {
	total: string;
	type:  string;
}

export interface PostsPerSkill {
	skill: string;
	total: string;
}

export interface TopTenPostsPerLocation {
	location: string;
	total:    string;
}