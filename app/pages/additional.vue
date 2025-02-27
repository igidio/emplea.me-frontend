<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
  }, {
   label: 'Adicional',
   to: `/additional`
  }]"/>


		<div class="flex flex-col gap-4">
			<h5>Adicional</h5>

			<nav class="flex flex-wrap gap-4">
				<UButton
					v-for="(section, index) in sections"
					:key="index"
					@click="() => {
						activeSection = index;
						$router.push({query: {o: index}});
					}"
					:color="(activeSection === index) ? 'black' : 'gray'"
					:label="section.title"
				/>
			</nav>

			<UCard v-if="activeSection === 0">
				<template #header>Acerca de EMPLEAME</template>
				<div class="flex flex-col gap-4 m-4">
					<p>En EMPLEAME, estamos dedicados a conectar empleadores con buscadores de empleo de manera eficiente y
						efectiva. Nuestra misión es facilitar el proceso de contratación, creando un puente sólido entre las
						empresas que buscan talento y las personas que buscan nuevas oportunidades laborales.</p>

					<h6>Nuestra Historia</h6>
					<p>EMPLEAME nació de la necesidad de simplificar y optimizar el proceso de contratación en un mundo cada vez
						más digitalizado. Fundada en 2023, nuestra plataforma ha crecido rápidamente, ayudando a miles
						de empresas a encontrar el talento adecuado y a muchos profesionales a encontrar el trabajo de sus
						sueños.</p>

					<h6>Nuestra Misión</h6>
					<p>Nuestra misión es proporcionar una plataforma intuitiva y efectiva que facilite el encuentro entre
						empleadores y buscadores de empleo. Nos esforzamos por ofrecer un servicio de alta calidad que no solo
						simplifique el proceso de contratación, sino que también mejore la experiencia de todos nuestros
						usuarios.</p>

					<h6>Nuestros Valores</h6>
					<ul class="list-disc list-inside ml-4">
						<li><strong>Innovación:</strong> Nos apasiona la tecnología y estamos comprometidos a utilizarla para
							mejorar continuamente nuestros servicios.
						</li>
						<li><strong>Transparencia:</strong> Valoramos la honestidad y la claridad en todas nuestras interacciones
							con usuarios y clientes.
						</li>
						<li><strong>Inclusión:</strong> Creemos en la igualdad de oportunidades y nos esforzamos por crear un
							espacio donde todos puedan encontrar su lugar.
						</li>
						<li><strong>Calidad:</strong> Trabajamos diligentemente para ofrecer un servicio excepcional que supere las
							expectativas de nuestros usuarios.
						</li>
					</ul>

					<h6>Nuestro Equipo</h6>
					<p>Detrás de EMPLEAME hay un equipo de profesionales dedicados y apasionados que trabajan incansablemente para
						ofrecerte la mejor experiencia posible. Desde desarrolladores de software hasta expertos en recursos
						humanos, cada miembro de nuestro equipo juega un papel crucial en nuestro éxito y en el tuyo.</p>

					<h6>Por Qué Elegirnos</h6>
					<ul class="list-disc list-inside ml-4">
						<li><strong>Tecnología Avanzada:</strong> Utilizamos las últimas tecnologías para garantizar que nuestra
							plataforma sea rápida, segura y fácil de usar.
						</li>
						<li><strong>Enfoque en el Usuario:</strong> Escuchamos tus necesidades y continuamente mejoramos nuestros
							servicios basándonos en tus comentarios.
						</li>
						<li><strong>Resultados Comprobados:</strong> Hemos ayudado a numerosas empresas y profesionales a alcanzar
							sus objetivos de contratación y empleo.
						</li>
					</ul>
				</div>
			</UCard>

			<UCard v-if="activeSection === 1">
				<template #header>Contáctanos</template>
				<div class="flex flex-col gap-4 m-4">
					<p>En EMPLEAME, estamos aquí para ayudarte. Si tienes alguna pregunta, inquietud o necesitas asistencia con
						nuestros servicios, no dudes en ponerte en contacto con nosotros. Queremos asegurarnos de que tengas la
						mejor experiencia posible al utilizar nuestra plataforma.</p>

					<h6>Información de Contacto:</h6>
					<p><strong>Correo Electrónico:</strong> Puedes enviarnos un correo electrónico a contacto@empleame.com y te
						responderemos lo antes posible.</p>
					<p><strong>Teléfono:</strong> Llámanos al +591 71234567 durante nuestro horario de
						atención y estaremos encantados de asistirte.</p>
					<p><strong>Dirección:</strong> Si prefieres visitarnos en persona, nuestra dirección es Zona Sur, Calle 123.
					</p>

					<h6>Horario de Atención:</h6>
					<p>Nuestro equipo de soporte está disponible de lunes a viernes, de 08:00 a 19:30. Fuera de
						este horario, puedes enviarnos un correo electrónico y te responderemos al siguiente día hábil.</p>

					<h6>Formulario de Contacto:</h6>
					<p>También puedes utilizar nuestro formulario de contacto en el sitio web para enviarnos tus preguntas o
						comentarios. Simplemente completa los campos requeridos y envía el formulario. Nos pondremos en contacto
						contigo lo antes posible.</p>

					<h6>Redes Sociales:</h6>
					<p>Síguenos en nuestras redes sociales para estar al tanto de las últimas noticias, actualizaciones y
						oportunidades laborales:</p>
					<ul class="list-disc list-inside ml-4">
						<li><strong>Facebook:</strong>
							<ULink>Empleame</ULink>
						</li>
						<li><strong>Twitter:</strong>
							<ULink>@empleame_bo</ULink>
						</li>
						<li><strong>LinkedIn:</strong>
							<ULink>Empleame</ULink>
						</li>
					</ul>

					<h6>Preguntas Frecuentes:</h6>
					<p>Antes de contactarnos, te recomendamos visitar nuestra sección de Preguntas Frecuentes (FAQ) en el sitio
						web. Allí encontrarás respuestas a las preguntas más comunes sobre nuestros servicios y cómo
						utilizarlos.</p>

					<h6>Nos Importa tu Opinión:</h6>
					<p>En EMPLEAME, valoramos tus comentarios y sugerencias. Si tienes alguna idea sobre cómo podemos mejorar
						nuestros servicios, no dudes en compartirla con nosotros. Tu opinión es importante para nosotros y nos ayuda
						a ofrecerte una mejor experiencia.</p>
				</div>
			</UCard>

			<UCard v-if="activeSection === 2">
				<template #header>Política de Privacidad de EMPLEAME</template>
				<div class="flex flex-col gap-4 m-4">
					<p>Última actualización: {{ new Date().toLocaleDateString() }}</p>
					<p>En EMPLEAME, estamos comprometidos a proteger tu privacidad y a manejar tu información personal con el
						mayor cuidado y respeto. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la
						información personal de nuestros usuarios. Al utilizar nuestros servicios, aceptas las prácticas descritas
						en esta política.</p>

					<h6>1. Información que Recopilamos</h6>
					<ol class="list-decimal list-inside">
						<li>Información de Registro: Al registrarte en nuestra plataforma, recopilamos información personal, como tu
							nombre, dirección de correo electrónico, número de teléfono y cualquier otra información relevante que
							proporciones.
						</li>
						<li>Información de Uso: Recopilamos información sobre cómo utilizas nuestros servicios, incluidas las
							páginas que visitas, el tiempo que pasas en nuestro sitio y las ofertas de trabajo a las que aplicas.
						</li>
						<li>Información de Pago: Si te suscribes a nuestros servicios premium, recopilamos información de pago a
							través de Stripe, nuestra plataforma de pagos segura y confiable.
						</li>
					</ol>

					<h6>2. Uso de la Información</h6>
					<ol class="list-decimal list-inside">
						<li>Utilizamos la información que recopilamos para proporcionar y mejorar nuestros servicios, personalizar
							tu experiencia y comunicarte información relevante.
						</li>
						<li>Podemos utilizar tu información para enviarte notificaciones, actualizaciones y ofertas especiales,
							siempre y cuando hayas dado tu consentimiento para recibir dichas comunicaciones.
						</li>
						<li>Utilizamos la información de uso para analizar tendencias y mejorar la funcionalidad y el rendimiento de
							nuestra plataforma.
						</li>
					</ol>

					<h6>3. Compartir Información con Terceros</h6>
					<ol class="list-decimal list-inside">
						<li>No vendemos ni alquilamos tu información personal a terceros.</li>
						<li>Podemos compartir tu información con terceros proveedores de servicios que nos ayudan a operar nuestro
							negocio y proporcionar nuestros servicios, como Stripe para el procesamiento de pagos.
						</li>
						<li>Podemos divulgar tu información cuando sea necesario para cumplir con la ley, hacer cumplir nuestros
							términos y condiciones o proteger nuestros derechos, propiedad o seguridad.
						</li>
					</ol>

					<h6>4. Seguridad de la Información</h6>
					<ol class="list-decimal list-inside">
						<li>Nos comprometemos a proteger la seguridad de tu información personal. Utilizamos medidas de seguridad
							adecuadas para proteger tu información contra el acceso no autorizado, la alteración, la divulgación o la
							destrucción.
						</li>
						<li>Sin embargo, ninguna transmisión de datos por Internet o almacenamiento electrónico es completamente
							segura. Aunque nos esforzamos por proteger tu información personal, no podemos garantizar su seguridad
							absoluta.
						</li>
					</ol>

					<h6>5. Tus Derechos</h6>
					<ol class="list-decimal list-inside">
						<li>Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Puedes
							hacerlo a través de tu cuenta en nuestro sitio web o contactándonos directamente.
						</li>
						<li>Tienes derecho a optar por no recibir nuestras comunicaciones de marketing en cualquier momento. Puedes
							darte de baja siguiendo las instrucciones en nuestros correos electrónicos de marketing o contactándonos.
						</li>
					</ol>

					<h6>6. Cambios en la Política de Privacidad</h6>
					<ol class="list-decimal list-inside">
						<li>Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Te
							notificaremos cualquier cambio significativo a través de nuestro sitio web o por correo electrónico.
						</li>
						<li>Es tu responsabilidad revisar periódicamente esta Política de Privacidad para estar al tanto de
							cualquier cambio.
						</li>
					</ol>
				</div>
			</UCard>
		</div>
	</div>

</template>

<script setup lang="ts">
const activeSection = ref(0)
const route = useRoute()

useHead({
	title: 'Adicional'
})

if (route.query.o) {
	activeSection.value = parseInt(route.query.o as string)
}

const sections = [
	{title: 'Acerca de'},
	{title: 'Contáctanos'},
	{title: 'Políticas de privacidad'}
]
</script>

<style scoped>
p {
	@apply text-justify;
}
</style>