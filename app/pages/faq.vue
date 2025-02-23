<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[
			{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
  }, {
   label: 'Preguntas Frecuentes (FAQ)',
   to: `/faq`
  }
	]"/>

		<UCard>
			<template #header>Preguntas Frecuentes (FAQ)</template>
			<div class="flex flex-col gap-4 m-4">
				<div>
					<strong>¿Qué es EMPLEAME?</strong>
					<p>EMPLEAME es una plataforma en línea que conecta empleadores con buscadores de empleo. Facilitamos el
						proceso de contratación y búsqueda de empleo a través de nuestra tecnología avanzada y herramientas
						intuitivas.</p>
				</div>
				<div>
					<strong>¿Cómo puedo registrarme en EMPLEAME?</strong>
					<p>Puedes registrarte en EMPLEAME visitando nuestra página de inicio y haciendo clic en el botón
						"Registrarse". Completa el formulario de registro con tu información personal y sigue las instrucciones para
						crear tu cuenta.</p>
				</div>
				<div>
					<strong>¿Cómo puedo publicar una oferta de trabajo?</strong>
					<p>Los empleadores pueden publicar ofertas de trabajo accediendo a su cuenta y seleccionando la opción
						"Publicar Oferta de Trabajo". Completa los detalles de la oferta y sigue las instrucciones para publicarla
						en nuestra plataforma.</p>
				</div>
				<div>
					<strong>¿Cómo puedo buscar empleo en EMPLEAME?</strong>
					<p>Los buscadores de empleo pueden buscar oportunidades laborales utilizando nuestra herramienta de búsqueda
						avanzada. Simplemente ingresa tus criterios de búsqueda en la barra de búsqueda y explora las ofertas
						disponibles.</p>
				</div>
				<div>
					<strong>¿Qué beneficios ofrecen las suscripciones premium?</strong>
					<p>Las suscripciones premium de EMPLEAME brindan acceso a características exclusivas, como la publicación
						ilimitada de ofertas de trabajo para empleadores y acceso prioritario a nuevas ofertas de empleo para
						buscadores de empleo. Consulta nuestra página de Suscripciones para más detalles.</p>
				</div>
				<div>
					<strong>¿Cómo puedo cancelar mi suscripción?</strong>
					<p>Puedes cancelar tu suscripción en cualquier momento accediendo a tu cuenta y seleccionando la opción
						"Cancelar Suscripción". La cancelación será efectiva al final del período de facturación actual.</p>
				</div>
				<div>
					<strong>¿Cómo protege EMPLEAME mi información personal?</strong>
					<p>En EMPLEAME, nos comprometemos a proteger tu privacidad y seguridad. Utilizamos medidas de seguridad
						avanzadas para proteger tu información personal contra el acceso no autorizado. Para más detalles, consulta
						nuestra Política de Privacidad.</p>
				</div>
				<div>
					<strong>¿Cómo puedo contactar al equipo de soporte?</strong>
					<p>Si necesitas asistencia, puedes ponerte en contacto con nuestro equipo de soporte a través de nuestro
						formulario de contacto en el sitio web, enviándonos un correo electrónico a [Tu Correo Electrónico de
						Contacto] o llamándonos al [Tu Número de Teléfono de Contacto].</p>
				</div>
				<div>
					<strong>¿Cómo puedo modificar mi perfil?</strong>
					<p>Puedes modificar tu perfil accediendo a tu cuenta y seleccionando la opción "Editar Perfil". Actualiza la
						información que desees cambiar y guarda los cambios.</p>
				</div>
				<div>
					<strong>¿Qué hago si olvido mi contraseña?</strong>
					<p>Si olvidas tu contraseña, puedes restablecerla haciendo clic en el enlace "¿Olvidaste tu contraseña?" en la
						página de inicio de sesión. Sigue las instrucciones para restablecer tu contraseña y recuperar el acceso a
						tu cuenta.</p>
				</div>
			</div>
		</UCard>
	</div>
</template>