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
			label: 'Términos y condiciones',
			to: `/payment/terms_and_privacy`
		}]"/>

		<UCard>
			<template #header>Términos y Condiciones de EMPLEAME</template>
			<div class="flex flex-col gap-4 m-4">
				<p>Última actualización: 01/2025</p>
				<p>Bienvenido a EMPLEAME. Estos términos y condiciones describen las reglas y regulaciones para el uso de
					nuestro sitio web y servicios. Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones
					en su totalidad. No continúes utilizando el sitio web de EMPLEAME si no aceptas todos los términos y
					condiciones establecidos en esta página.</p>

				<h6>2. Uso del Sitio Web</h6>
				<ol class="list-decimal list-inside">
					<li>El contenido de las páginas de este sitio web es solo para tu información general y uso. Está sujeto a
						cambios sin previo aviso.
					</li>
					<li>Ni nosotros ni terceros proporcionamos ninguna garantía en cuanto a la exactitud, puntualidad,
						rendimiento, integridad o idoneidad de la información y materiales encontrados u ofrecidos en este sitio web
						para cualquier propósito particular.
					</li>
					<li>El uso de cualquier información o materiales en este sitio web es bajo tu propio riesgo, por lo que no
						seremos responsables.
					</li>
				</ol>

				<h6>3. Registro de Usuarios</h6>
				<ol class="list-decimal list-inside">
					<li>Para acceder a ciertos servicios de EMPLEAME, es posible que necesites registrarte como usuario.</li>
					<li>Deberás proporcionar información precisa y completa al registrarte y mantener actualizada dicha
						información.
					</li>
					<li>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.</li>
				</ol>

				<h6>4. Publicación de Ofertas de Trabajo</h6>
				<ol class="list-decimal list-inside">
					<li>Los empleadores pueden publicar ofertas de trabajo en nuestro sitio web.</li>
					<li>Las ofertas de trabajo deben cumplir con todas las leyes y regulaciones aplicables.</li>
					<li>Nos reservamos el derecho de eliminar cualquier oferta de trabajo que consideremos inapropiada o que viole
						estos términos y condiciones.
					</li>
				</ol>

				<h6>5. Búsqueda de Empleo</h6>
				<ol class="list-decimal list-inside">
					<li>Los buscadores de empleo pueden buscar y aplicar a ofertas de trabajo publicadas en nuestro sitio web.
					</li>
					<li>Nos esforzamos por garantizar que todas las ofertas de trabajo sean legítimas, pero no podemos garantizar
						su autenticidad.
					</li>
					<li>No somos responsables de cualquier relación laboral o contrato que surja entre empleadores y buscadores de
						empleo.
					</li>
				</ol>

				<h6>6. Privacidad</h6>
				<p>Nos comprometemos a proteger tu privacidad. Consulta nuestra Política de Privacidad para obtener más
					información sobre cómo recopilamos, utilizamos y protegemos tu información personal.</p>

				<h6>7. Propiedad Intelectual</h6>
				<ol class="list-decimal list-inside">
					<li>Todo el contenido del sitio web de EMPLEAME, incluidos, entre otros, texto, gráficos, logotipos, imágenes,
						y software, es propiedad de EMPLEAME o sus licenciantes y está protegido por las leyes de derechos de autor
						y marcas comerciales.
					</li>
					<li>No puedes reproducir, duplicar, copiar, vender, revender o explotar de cualquier otra manera nuestro
						contenido sin nuestro consentimiento expreso por escrito.
					</li>
				</ol>

				<h6>8. Limitación de Responsabilidad</h6>
				<ol class="list-decimal list-inside">
					<li>En la medida en que lo permita la ley, EMPLEAME no será responsable de ninguna pérdida o daño indirecto,
						incidental, especial o consecuente que surja del uso o la imposibilidad de usar nuestro sitio web o
						servicios.
					</li>
					<li>Nuestra responsabilidad total hacia ti en relación con cualquier pérdida o daño que surja de estos
						términos y condiciones o del uso de nuestro sitio web no excederá la cantidad que has pagado a EMPLEAME, en
						su caso.
					</li>
				</ol>

				<h6>9. Modificaciones a los Términos y Condiciones</h6>
				<ol class="list-decimal list-inside">
					<li>EMPLEAME se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las
						modificaciones serán efectivas al publicarse en nuestro sitio web.
					</li>
					<li>Es tu responsabilidad revisar periódicamente estos términos y condiciones para estar al tanto de cualquier
						cambio.
					</li>
				</ol>

				<h6>10. Ley Aplicable y Jurisdicción</h6>
				<ol class="list-decimal list-inside">
					<li>Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Bolivia. Cualquier
						disputa que surja en relación con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de
						los tribunales de Bolivia.
					</li>
				</ol>

				<h6>Contacto</h6>
				<p>Si tienes alguna pregunta sobre estos términos y condiciones, no dudes en contactarnos a través del correo contacto@empleame.com</p>
			</div>

		</UCard>
	</div>
</template>
<script setup lang="ts">
</script>