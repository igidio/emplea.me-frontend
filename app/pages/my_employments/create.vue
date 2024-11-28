<template>
	<div class="flex flex-col gap-4">
		<h4>Crear publicación de trabajo</h4>
		
		<div class="flex flex-row w-full gap-4">
			
			<UCard class="grow">
				<div class="grow flex flex-col gap-4">
					<UFormGroup
						label="Título"
						required
					>
						<UInput color="gray" size="lg" placeholder="Nombre del nuevo trabajo"/>
					</UFormGroup>
					
					<UFormGroup
						label="Categoría:"
						required
					>
						<USelectMenu
							size="lg"
							color="gray"
							searchable
							searchable-placeholder="Seleccione"
							v-model="values.category"
							:options="categories"
							option-attribute="name"
						/>
					</UFormGroup>
					
					<div class="flex flex-row gap-4">
						<UFormGroup
							label="Salario"
							class="grow"
						>
							<UInput color="gray" size="lg" placeholder="Salario en Bolivianos"/>
						</UFormGroup>
						
						<UFormGroup
							label="Tipo de salario"
							class="grow"
						>
							<USelect color="gray" size="lg">
							
							</USelect>
						</UFormGroup>
					
					
					</div>
					
					<UFormGroup
						label="Descripción"
					>
						<UTextarea color="gray" size="lg">
						
						</UTextarea>
					</UFormGroup>
					
					<UFormGroup
						label="Lugar"
						required
					>
						<USelect color="gray" size="lg">
						
						</USelect>
					</UFormGroup>
					
					<UFormGroup
						label="Modalidad"
						required
					>
						<USelect color="gray" size="lg">
						
						</USelect>
					</UFormGroup>
				</div>
				<template #footer>
					<div class="flex flex-row gap-4 justify-end">
						<UButton color="black" size="lg">Cancelar</UButton>
						<UButton size="lg">Guardar</UButton>
					</div>
				</template>
			</UCard>
			
			<UCard class="w-96 h-fit">
				<div class="gap-4 flex flex-col">
					<h6>Habilidades necesarias</h6>
					<UButton label="✏️ Editar" color="black" block/>
				</div>
			</UCard>
		
		</div>
	</div>
</template>

<script setup lang="ts">
import {usePostStore} from "~/stores/post.pinia";
import type {CategoryInterface} from "~/interfaces";

const {categories} = usePostStore()

interface SearchModelInterface {
	category: CategoryInterface
}

const values = ref({
	category: '',
	
})
</script>