import type SocialMediaInterface from "~/interfaces/social_media.interface";

export default [
	{
		type: "X (Twitter)",
		prefixUrl: "https://x.com/",
		icon: "ri:twitter-x-line",
		slug: "x",
	},
	{
		type: "Facebook",
		prefixUrl: "https://facebook.com/",
		icon: "ri:facebook-circle-line",
		slug: "facebook",
	},
	{
		type: "Instagram",
		prefixUrl: "https://instagram.com/",
		icon: "ri:instagram-line",
		slug: "instagram",
	},
	{
		type: "TikTok",
		prefixUrl: "https://tiktok.com/",
		icon: "ri:tiktok-line",
		slug: "tiktok",
	},
	{
		type: "LinkedIn",
		prefixUrl: "https://linkedin.com/in/",
		icon: "ri:linkedin-box-line",
		slug: "linkedin",
	},
] satisfies SocialMediaInterface[];
