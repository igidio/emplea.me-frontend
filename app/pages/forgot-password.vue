<template>
	<div class="flex flex-col gap-4 items-center tablet:justify-center m-4">
		<h3>Olvidé mi contraseña</h3>
		<div class="w-full max-w-[652px] flex flex-col gap-4">
			<p>
				A continuación introduzca el correo electrónico asociado a su cuenta, se
				le enviará un enlace para reestablecer su contraseña:
			</p>
			<UInput variant="big" placeholder="correo@mail.com" />
			<div class="flex flex-row justify-end gap-4">
				<NuxtLink to="login">
					<UButton variant="big_ghost" label="Cancelar" />
				</NuxtLink>

				<NuxtLink to="login">
					<UButton variant="big" label="Confirmar" />
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
