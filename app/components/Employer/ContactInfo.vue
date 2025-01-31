<template>
	<UCard>
		<span class="font-bold inline-block mb-4">Información de la empresa</span>


		<div class="flex flex-col relative overflow-hidden gap-2">
			<div
				class="z-[2] absolute center-absolute font-semibold w-[90%] center-text bg-white p-2 rounded-medium border border-slate-200"
				v-if="info?.show_employer === false && info.type == 'EMPLOYER'"
			>
				Solo un aplicante a trabajo puede ver esta información
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
				<div class="flex flex-col grow">
					<span class="font-semibold mb-2">Contacto telefónico</span>
					<div class="flex flex-col gap-2">

						<itemLink
							:icon="phone.icon"
							:label="phone.label.toString()"
							:link="phone.link"
							v-for="phone in phones"
						/>
					</div>
				</div>
				<div class="flex flex-col grow">
					<span class="font-semibold mb-2">Redes sociales</span>
					<div class="flex flex-col gap-2" v-if="employer.social_media.length > 0">
						<itemLink
							:icon="social.icon"
							:label="social.label"
							:link="social.link"
							v-for="social in social_media"
						/>
					</div>
				</div>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
interface Props {
	phones: PhoneInterface[];
}

defineProps<Props>();
</script>