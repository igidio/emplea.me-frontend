<template>
	<div class="border-dotted border-2 border-violet-500 p-4 flex flex-col gap-2 rounded-medium">
		<span class="font-semibold">Agregar asistente</span>
		<p>Puedes agregar un encargado por su número telefónico, correo electrónico o nombre de usuario, el encargado recibirá una solicitud para unirse al negocio desde su correo electrónico.</p>
		<p>El correo no expirará en ningún momento y podrá ser reenviado en caso de que se lo requiera, también si se es requerido se puede cancelar la solicitud mientras el usuario no la haya aceptado.</p>
		<div class="flex flex-row gap-2 w-full">
			<UInput
				color="gray"
				class="w-full"
				placeholder="Número telefónico / correo electrónico / nombre de usuario"
			/>
			<UButton color="black" label="Agregar"/>
		</div>
	</div>
</template>