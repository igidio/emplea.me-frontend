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

			<div class="flex flex-row gap-4 w-full">
				<div class="flex flex-col gap-4">
					<UCard class="flex flex-col gap-4">
						<span class="font-semibold text-xl mb-2 inline-block">Datos sobre publicaciones</span>
						{{ data?.admin.posts_per_day }}
					</UCard>
					<UCard class="flex flex-col gap-4">
						<span class="font-semibold text-xl mb-2 inline-block">Empleadores con más publicaciones</span>
						{{ data?.admin.posts_per_employer }}
					</UCard>
					<UCard class="flex flex-col gap-4">
						<span class="font-semibold text-xl mb-2 inline-block">Categorías más populares</span>
						{{ data?.admin.post_per_category }}
					</UCard>
					<UCard class="flex flex-col gap-4">
						<span class="font-semibold text-xl mb-2 inline-block">Alcance de las publicaciones destacadas</span>
						{{ data?.admin.post_reach }}
					</UCard>
				</div>
				<div class="flex flex-col gap-4">
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
import "echarts";

const {data} = useAsyncQuery<{ admin: admin_interface }>(gqlAdmin.admin)
</script>