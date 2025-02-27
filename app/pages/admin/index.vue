<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Panel',
      to: `/admin`
		}]"/>
		<hr/>
		<div class="flex flex-col gap-4">
			<h6>Publicaciones: Total {{ data?.admin.last_posts.total }}</h6>
			<div class="grid grid-cols-2 tablet:grid-cols-4 gap-4">
				<div class="bg-violet-200 flex flex-col items-end gap-2 p-4 rounded-medium shadow-sm">
					<span class="font-semibold">Publicaciones en la última semana</span>
					<span class="text-3xl font-bold">{{ data?.admin.last_posts.last_week }}</span>
				</div>
				<div class="bg-violet-200 flex flex-col items-end gap-2 p-4 rounded-medium shadow-sm">
					<span class="font-semibold">Publicaciones en el último mes</span>
					<span class="text-3xl font-bold">{{ data?.admin.last_posts.last_month }}</span>
				</div>
				<div class="bg-violet-200 flex flex-col items-end gap-2 p-4 rounded-medium shadow-sm">
					<span class="font-semibold">Publicaciones con interacciones</span>
					<span class="text-3xl font-bold">{{ data?.admin.last_posts.total_interactions }}</span>
				</div>
				<div class="bg-violet-200 flex flex-col items-end gap-2 p-4 rounded-medium shadow-sm">
					<span class="font-semibold">Interacciones en promedio</span>
					<span class="text-3xl font-bold">{{ data?.admin.last_posts.average_interactions }}</span>
				</div>
			</div>
			<h6>Usuarios: Total {{ data?.admin.admin_user.users_total }}</h6>
			<div class="grid grid-cols-2 tablet:grid-cols-4 gap-4">
				<div class="bg-violet-200 flex flex-col items-end gap-2 p-4 rounded-medium shadow-sm">
					<span class="font-semibold">Superusuario</span>
					<span class="text-3xl font-bold">{{ data?.admin.admin_user.users_super }}</span>
				</div>
				<div class="bg-violet-200 flex flex-col items-end gap-2 p-4 rounded-medium shadow-sm">
					<span class="font-semibold">Administrador</span>
					<span class="text-3xl font-bold">{{ data?.admin.admin_user.users_admin }}</span>
				</div>
				<div class="bg-violet-200 flex flex-col items-end gap-2 p-4 rounded-medium shadow-sm">
					<span class="font-semibold">Empleadores</span>
					<span class="text-3xl font-bold">{{ data?.admin.admin_user.users_employer }}</span>
				</div>
				<div class="bg-violet-200 flex flex-col items-end gap-2 p-4 rounded-medium shadow-sm">
					<span class="font-semibold">Aplicantes</span>
					<span class="text-3xl font-bold">{{ data?.admin.admin_user.users_seeker }}</span>
				</div>
			</div>

			<div class="flex flex-col desktop:flex-row gap-4 w-full">
				<div class="flex flex-col gap-4 grow-0 desktop:flex-1">
					<UCard class="flex flex-col gap-4">
						<span class="font-semibold text-xl mb-4 inline-block">Publicaciones por día</span>
						<VisXYContainer :data="data_posts_per_day.data" :xScale="xScale">
							<VisStackedBar :x="data_posts_per_day.x" :y="data_posts_per_day.y" color="#a611a5" />
							<VisAxis type="x" :tickFormat="(value:any) => Intl.DateTimeFormat().format(value)" :tickTextHideOverlapping="true" :numTicks="6" />
							<VisAxis type="y" label="Cantidad de publicaciones" />
						</VisXYContainer>
					</UCard>

					<div class="flex flex-row gap-4">

					<UCard class="flex flex-col gap-4 w-1/2">
						<span class="font-semibold text-xl mb-2 inline-block">Empleadores con más publicaciones</span>
						<VisSingleContainer :height="100">

							<VisTooltip
								:triggers="{ [Donut.selectors.segment]: (d: any) => `${d.data.name}: ${d.data.value} publicaciones.`}"/>
							<VisDonut
								:value="(d:any) => d.value"
								:data="data_posts_per_employer.data"
								:showEmptySegments="true"
								:padAngle="0.01"
								:arcWidth="20"
							/>
						</VisSingleContainer>
							<VisBulletLegend :items="data_posts_per_employer.legend as BulletLegendItemInterface[]" class="mt-6" labelMaxWidth="50px"/>

					</UCard>

					<UCard class="flex flex-col gap-4 w-1/2">
						<span class="font-semibold text-xl mb-2 inline-block">Categorías más populares</span>
						<VisSingleContainer :height="200">

							<VisTooltip
								:triggers="{ [Donut.selectors.segment]: (d: any) => `${d.data.name}: ${d.data.value} publicaciones.`}"/>
							<VisDonut
								:value="(d:any) => d.value"
								:data="data_posts_per_category.data"
								:showEmptySegments="true"
								:padAngle="0.01"
								:arcWidth="20"
							/>
						</VisSingleContainer>
							<VisBulletLegend :items="data_posts_per_category.legend as BulletLegendItemInterface[]" class="mt-6"/>
					</UCard>
					</div>
					<UCard class="flex flex-col gap-4">
						<span class="font-semibold text-xl mb-2 inline-block">Alcance de las publicaciones destacadas</span>
						<VisBulletLegend :items="data_post_reach.items"/>
						<VisXYContainer :data="data_post_reach.data" :xScale="xScale" >
							<VisLine :x="info_post_reach.x" :y="info_post_reach.y" :color="data_post_reach.color"/>
							<VisAxis type="x" :tickTextHideOverlapping="true" :numTicks="6" :tickFormat="(value:any) => Intl.DateTimeFormat().format(value)"/>
							<VisAxis type="y" label="Interacciones"/>
						</VisXYContainer>
					</UCard>
				</div>
				<div class="flex flex-col gap-4 w-full desktop:min-w-56 desktop:max-w-56">
					<UCard class="flex flex-col gap-4">
						<span class="font-semibold text-xl mb-2 inline-block">Habilidades más demandadas</span>
						<div class="flex flex-col gap-3 text-sm">
							<div v-for="(e, index) in data?.admin.posts_per_skill">
								<div class="flex flex-row place-content-between">
									<div class="font-semibold">{{ index + 1 }}.</div>
									<div>{{ e.total }} publ.</div>
								</div>
								<span>{{ e.skill }}</span>
							</div>
						</div>
					</UCard>

					<UCard class="flex flex-col gap-4">
						<span class="font-semibold text-xl mb-2 inline-block">Top 10 locaciones</span>

						<div class="flex flex-col gap-3 text-sm">
							<div v-for="(e, index) in data?.admin.top_ten_posts_per_location">
								<div class="flex flex-row place-content-between">
									<div class="font-semibold">{{ index + 1 }}.</div>
									<div>{{ e.total }} publ.</div>
								</div>
								<span>{{ e.location }}</span>
							</div>
						</div>
					</UCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {gqlAdmin} from "~/queries";
import type {admin_interface} from "~/interfaces/server/admin.interface";

definePageMeta({
	middleware: 'role',
	roles: ['SUPERUSER', 'ADMIN'],
	keepalive: false,
})
useHead({
	title: 'Panel de administración'
})

const {data} = useAsyncQuery<{ admin: admin_interface }>(gqlAdmin.admin)

import {VisStackedBar, VisSingleContainer, VisDonut, VisBulletLegend, VisTooltip, VisAxis, VisLine, VisXYContainer} from '@unovis/vue'
import {type BulletLegendItemInterface, Donut, Scale} from "@unovis/ts";

const data_posts_per_employer = computed(() => ({
		data: data.value?.admin.posts_per_employer.map((e) => ({
			name: e.employer,
			value: e.total
		})),
		legend: data.value?.admin.posts_per_employer.map((e) => ({
			name: e.employer
		}))
	})
)

const data_posts_per_category = computed(() => ({
		data: data.value?.admin.post_per_category.map((e) => ({
			name: e.category,
			value: e.total
		})),
		legend: data.value?.admin.post_per_category.map((e) => ({
			name: e.category
		}))
	})
)

const xScale = Scale.scaleTime()

const info_post_reach = {
	labels: {
		featured: 'Destacados',
		not_featured: 'Posts normales',
	},
	colors: {
		featured: '#a611a5',
		not_featured: '#F4B83E'
	},
	x: (d: { date: string }) => +(new Date(d.date)),
	y: [
		(d: any) => +d.featured,
		(d: any) => +d.not_featured,
	]
}
const data_post_reach = computed(() => ({
	data: data.value?.admin.post_reach.map((item) => ({
		date: new Date(new Date().setDate(new Date().getDate() - item.day)),
		featured: item.featured,
		not_featured: item.not_featured,
	})),
	items: ['featured', 'not_featured'].map(t => ({
		name: info_post_reach.labels[t as keyof typeof info_post_reach.labels],
		color: info_post_reach.colors[t as keyof typeof info_post_reach.labels],
	})),
	color: (d: any, i: number) => i === 0 ? '#a611a5' : '#F4B83E'
}))

const data_posts_per_day = computed(() => ({
	x: (d: { date: string }) => new Date((new Date(d.date))),
	y: (d: { value: number }) => +d.value,
	data: data.value?.admin.posts_per_day.map((e) => ({
		date: new Date(new Date(e.day)),
		value: e.total
	}))
}))

</script>