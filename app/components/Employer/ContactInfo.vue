<template>
	<UCard>
		<h6 class="font-bold inline-block mb-4">Contacto</h6>


		<div class="flex flex-col relative overflow-hidden gap-2">
			<div
				class="z-[2] absolute center-absolute font-semibold w-[90%] center-text bg-white p-2 rounded-medium border border-slate-200"
				v-if="info?.show_employer === false && info.type == 'EMPLOYER' || (!is_available && ['GUEST','SEEKER'].includes(info?.type as any))"
			>
				{{ (!is_available && ['GUEST','SEEKER'].includes(info?.type as any)) ? 'Esta información ya no está disponible.' : '' }}
				{{ info?.show_employer === false && info.type == 'EMPLOYER' ? 'Solo un aplicante a trabajo puede ver esta información.' : ''}}
			</div>



			<UButton
				class="z-[2] absolute center-absolute"
				@click="show_info()"
				v-else-if="is_hidden"
			>
				Me interesa
			</UButton>

			<div
				class="absolute z-[1] backdrop-blur-sm h-full w-full bg-white/30"
				v-if="is_hidden"
			/>

			<div class="flex flex-col desktop:flex-col tablet:flex-row gap-2">
				<div class="flex flex-col grow" v-if="computed_phone && computed_phone.length > 0">
					<span class="font-semibold mb-2">Teléfono</span>
					<div class="flex flex-col gap-2">
						<itemLink
							:icon="phone.icon"
							:label="phone.label.toString()"
							:link="phone.link"
							v-for="phone in computed_phone"
						/>
					</div>
				</div>
				<div class="flex flex-col grow" v-if="computed_social_media && computed_social_media.length > 0">
					<span class="font-semibold mb-2">Redes sociales</span>
					<div class="flex flex-col gap-2">
						<itemLink
							:icon="social.icon"
							:label="social.label"
							:link="social.link"
							v-for="social in computed_social_media"
						/>
					</div>
				</div>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import type {EmployerSocialInterface, PhoneInterface} from "~/interfaces";

const userStore = useUserStore()
const {user_role} = userStore
const {is_open_modal_login} = storeToRefs(userStore);

interface Props {
	phone?: PhoneInterface[]
	social_media?: EmployerSocialInterface[];
	info?: {
		type: "GUEST" | "SUPER" | "EMPLOYER" | "ATTENDANT" | "SEEKER";
		can_modify: boolean;
		show_employer: boolean;
	},
	is_hidden: boolean;
	is_available: boolean;
}
const props = defineProps<Props>();

const show_info = () => {
	if (user_role === undefined) is_open_modal_login.value = true;
};

const computed_phone = computed(() => {
	if (!props.phone) return [];
	return props.phone.map((e) => {
		let object: any = {
			label: e.phone,
			icon: e.has_whatsapp ? "ri:whatsapp-line" : "ri:phone-line",
		};

		if (e.has_whatsapp) object.link = `https://wa.me/591${e.phone}`;
		return object;
	})
	}
);

const computed_social_media = computed(() => {
	if (!props.social_media) return [];
	return props.social_media.map((e) => ({
		label: e.name,
		icon: e.social.icon,
		link: `${e.social.prefix}${e.identifier}`,
	}))
	}
);
</script>