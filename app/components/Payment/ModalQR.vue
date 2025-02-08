<template>
	<UModal v-model="is_open">
		<UCard>
			<template #header>
				Pagar con QR
			</template>

			<div class="flex flex-col tablet:flex-row gap-8">

				<div class="self-center">
					<img
						class="w-48 aspect-[1/1]"
						src="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
						alt="QR Code"
					/>
				</div>

				<div class="flex flex-col w-full place-content-between gap-2">
						<ol class="list-decimal list-inside">
							<li>Escanea el código QR con tu aplicación de banca móvil.</li>
							<li>Ingresa el monto a pagar.</li>
							<li>Confirma la transacción.</li>
							<li>Su cuenta será actualizada cuando la transacción sea verificada.</li>
						</ol>

					<UButton class="self-end" color="black" label="Cerrar" @click="is_open = false"/>
				</div>

			</div>

		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";

const is_open:ModelRef<boolean> = defineModel('is_open', {default: false})
</script>