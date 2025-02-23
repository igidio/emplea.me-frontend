<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
  }, {
   label: 'Sé un premium',
      to: '/payment'
  },{
   label: 'Términos y privacidad',
   to: `/payment/terms_and_privacy`
  }]"/>

		<UCard>
			<template #header>Servicio de Suscripciones de EMPLEAME</template>
			<div class="flex flex-col gap-4 m-4">
				<p>Última actualización: 02/2025</p>
				<p>En EMPLEAME, nos comprometemos a ofrecerte servicios de alta calidad que faciliten el proceso de búsqueda y contratación de empleo. A través de nuestro servicio de suscripciones, proporcionamos herramientas y beneficios exclusivos diseñados para maximizar la eficiencia y efectividad de nuestros usuarios, tanto empleadores como buscadores de empleo. Utilizamos la plataforma de pagos Stripe para garantizar transacciones seguras y sin complicaciones.</p>

				<h6>1. Introducción al Servicio de Suscripciones</h6>
				<ol class="list-decimal list-inside">
					<li>Nuestro servicio de suscripciones está diseñado para brindarte acceso a características premium que no están disponibles para usuarios gratuitos.</li>
					<li>Con una suscripción activa, puedes disfrutar de beneficios adicionales que facilitarán tu proceso de contratación o búsqueda de empleo.</li>
				</ol>

				<h6>2. Planes de Suscripción</h6>
				<ol class="list-decimal list-inside">
					<li>Ofrecemos varios planes de suscripción para adaptarnos a tus necesidades y presupuesto.</li>
					<li>Cada plan incluye diferentes niveles de acceso a nuestras herramientas y servicios premium.</li>
					<li>Puedes consultar una descripción detallada de cada plan en nuestra página de suscripciones.</li>
				</ol>

				<h6>3. Proceso de Suscripción a través de Stripe</h6>
				<ol class="list-decimal list-inside">
					<li>Para suscribirte a uno de nuestros planes, deberás registrarte en nuestro sitio web y seleccionar el plan de tu elección.</li>
					<li>Una vez seleccionado el plan, serás redirigido a la plataforma de Stripe para completar el proceso de pago.</li>
					<li>Stripe es una plataforma de pagos segura y confiable que protege tus datos y garantiza transacciones seguras.</li>
				</ol>

				<h6>4. Beneficios de la Suscripción</h6>
				<ol class="list-decimal list-inside">
					<li>Para Empleadores:
						<ul class="list-disc list-inside ml-4">
							<li>Acceso a una base de datos ampliada de candidatos.</li>
							<li>Publicación ilimitada de ofertas de trabajo.</li>
							<li>Herramientas avanzadas de filtrado y selección de candidatos.</li>
							<li>Análisis y reportes detallados sobre el rendimiento de tus ofertas de trabajo.</li>
						</ul>
					</li>
					<li>Para Buscadores de Empleo:
						<ul class="list-disc list-inside ml-4">
							<li>Acceso prioritario a nuevas ofertas de trabajo.</li>
							<li>Funciones avanzadas de búsqueda de empleo.</li>
							<li>Notificaciones personalizadas de oportunidades de empleo.</li>
							<li>Asesoramiento y recursos exclusivos para mejorar tu perfil y CV.</li>
						</ul>
					</li>
				</ol>

				<h6>5. Gestión de la Suscripción</h6>
				<ol class="list-decimal list-inside">
					<li>Puedes gestionar tu suscripción a través de tu cuenta en EMPLEAME.</li>
					<li>La renovación de la suscripción se realizará automáticamente a menos que canceles la suscripción antes de la fecha de renovación.</li>
					<li>Puedes cancelar tu suscripción en cualquier momento desde tu cuenta. La cancelación será efectiva al final del período de facturación actual.</li>
				</ol>

				<h6>6. Política de Reembolsos</h6>
				<ol class="list-decimal list-inside">
					<li>Ofrecemos una política de reembolsos flexible para garantizar tu satisfacción con nuestro servicio.</li>
					<li>Si no estás satisfecho con tu suscripción, puedes solicitar un reembolso dentro de los primeros 7 días posteriores a la suscripción.</li>
					<li>Los reembolsos se procesarán a través de Stripe y pueden tardar algunos días hábiles en reflejarse en tu cuenta.</li>
				</ol>

				<h6>7. Contacto y Soporte</h6>
				<ol class="list-decimal list-inside">
					<li>Si tienes alguna pregunta o necesitas asistencia con tu suscripción, nuestro equipo de soporte está disponible para ayudarte.</li>
					<li>Puedes contactarnos a través de contacto@empleame.com o a través de la sección de soporte en nuestro sitio web.</li>
				</ol>
			</div>
		</UCard>
	</div>
</template>

<script setup lang="ts">
</script>