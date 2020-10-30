<script>
	import { siteName } from "@/config.js";
	import { stores	} from "@sapper/app";
	const {page, session} = stores();
	import { onMount } from 'svelte';

	let hash;

	function _goToHash(_hash){
		hash = _hash;
		window.location.hash = _hash
		document.getElementById(_hash).scrollIntoView(true);
		let scrolledY = window.scrollY;
		if(scrolledY){
			window.scroll(0, scrolledY - 100);
		}
	}
	function getCoords(elem) { // crossbrowser version
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var top  = box.top +  scrollTop - clientTop;

		return { top: Math.round(top) };
	}

	onMount(async () => {
		hash = window.location.hash.substring(1);

		window.onscroll=function () {
			let elements = document.getElementsByClassName('hash-link');
			for (let i = 0; i < elements.length; i++) {
				let element = elements[i];
				let cords = getCoords(element);
				if (cords.top<window.pageYOffset + 20 && cords.top + element.offsetHeight > window.pageYOffset + 20){
					hash = element.id;
					window.location.hash = element.id;
				}
			}
		}


	});

</script>


<svelte:head>
	<title>{$session.info.NOMEMP || siteName} | Política de cookies</title>

	<meta data-hid="description" name="description" content="Página de información sobre cookies · {$session.info.NOMEMP || siteName}" />
	<meta data-hid="title" name="title" content="Política de cookies - {$session.info.NOMEMP || siteName}" />

	<meta data-hid="og:description" name="og:description" content="Página de información sobre cookies · {$session.info.NOMEMP || siteName}" />
	<meta data-hid="og:title" name="og:title" content="Política de cookies - {$session.info.NOMEMP || siteName}" />
</svelte:head>

<div class="cookies-class">
	<section>
			<div class="cookies-head" >
				<div class="container">
					<div class="row">
						<div class="col-md-4 col-sm-12 text-center">
							<img src="/images/cookies.png" alt="Niño comiendo cookie.">
						</div>

						<div class="col-md-8 col-sm-12 text-justify">
						<h1>Política de Cookies</h1>
						<span>Una cookie es un pequeño archivo de texto que los sitios web instalan en el ordenador o el dispositivo móvil de los usuarios que los visitan. Este pequeño archivo de texto permite que un sitio web recuerde tus acciones y preferencias durante un período de tiempo determinado, de modo que no tengas que volver a introducir tu información de inicio de sesión o de configuración cada vez que visites una nueva página de nuestro sitio web.</span>
						</div>
					</div>
				</div>
			</div>
		</section>

	<section >
		<div class="cookies-text">
			<div class="container">
				<div class="row">
					<div class="col-md-4">
						<div id="menufixed" class="list-group">
							<button on:click={()=>_goToHash('uso')} type="button" class="list-group-item list-group-item-action {hash=='uso'?'active':''}">Uso en {$session.info.NOMEMP || siteName}</button>
							<button on:click={()=>_goToHash('seg')} type="button" class="list-group-item list-group-item-action {hash=='seg'?'active':''}">Seguridad/Autenticación</button>
							<button on:click={()=>_goToHash('rend')} type="button" class="list-group-item list-group-item-action {hash=='rend'?'active':''}">Rendimiento/Análisis e investigación</button>
							<button on:click={()=>_goToHash('pref')} type="button" class="list-group-item list-group-item-action {hash=='pref'?'active':''}">Preferencias/Localización</button>
							<button on:click={()=>_goToHash('tecno')} type="button" class="list-group-item list-group-item-action {hash=='tecno'?'active':''}">Tecnologías de «no seguimiento»</button>
							<button on:click={()=>_goToHash('gescoo')} type="button" class="list-group-item list-group-item-action {hash=='gescoo'?'active':''}">Cómo gestionar las cookies</button>
							<button on:click={()=>_goToHash('pol')} type="button" class="list-group-item list-group-item-action {hash=='pol'?'active':''}" >Cambios en la Política de Cookies</button>
						</div>
					</div>
					<div class="col-md-8 text-justify" >
						<h3 class="hash-link" id="uso">Uso en {$session.info.NOMEMP || siteName}</h3>

						<p>
						En resumen, {$session.info.NOMEMP || siteName} utiliza cookies y otras tecnologías de seguimiento para prestar su servicio. Aunque las cookies no son imprescindibles para que el sitio web funcione, si las habilitas disfrutarás de una mejor experiencia de navegación. Si decides borrar o bloquear las cookies, es posible que algunas de las funciones de este sitio web no se ejecuten correctamente.</p>
						<p>Las cookies no se utilizan para identificarte personalmente ni para otros fines que no sean los descritos en este documento.</p>

						<h4 class="hash-link" id="seg">Seguridad/Autenticación:</h4>

						<p>Algunas funciones de las cookies y otras tecnologías similares son necesarias y vitales para garantizar que {$session.info.NOMEMP || siteName} funcione correctamente para los visitantes y miembros; como preservar la seguridad, la protección e integridad de {$session.info.NOMEMP || siteName}, la autenticación y el inicio de sesión (incluido el hecho de recordar los permisos y consentimientos aceptados) y garantizar que las transacciones se puedan realizar de forma segura.</p>

						<h4 class="hash-link" id="rend">Rendimiento/Análisis e investigación:</h4>

						<p>Algunas tecnologías ayudan a proporcionar datos de rendimiento sobre el funcionamiento de {$session.info.NOMEMP || siteName} para poder realizar mejoras en la plataforma. Los datos recopilados en el sitio web y la funcionalidad y velocidad de la aplicación, la forma en que se utiliza {$session.info.NOMEMP || siteName} y la detección y recopilación de informes sobre errores ayudan a mejorar {$session.info.NOMEMP || siteName} y los servicios que ofrecemos.</p>

						<h4 class="hash-link" id="pref">Preferencias/Localización:</h4>

						<p>Las cookies permiten personalizar tus vistas y configuraciones. Algunas cookies nos ayudan a brindar experiencias más localizadas, por ejemplo, asegurándonos de que veas {$session.info.NOMEMP || siteName} en tu idioma preferido.</p>

						<h4 class="hash-link" id="tecno">Tecnologías de «no seguimiento»</h4>
						<p>Hacemos caso omiso a las señales de «No rastrear» del navegador web.</p>


						<h4 class="hash-link" id="gescoo">Cómo gestionar las cookies</h4>
						<p>Puedes controlar el uso de las cookies en tu navegador. Si no aceptas o eliminas las cookies, es posible que nuestros servicios no funcionen con normalidad. Cada navegador te ofrece distintas formas para gestionar las cookies. Consulta el menú de ayuda de tu navegador para determinar la mejor manera de modificar el almacenamiento de las cookies de tu navegador.</p>


						<h4 class="hash-link" id="pol">Cambios en la Política de Cookies</h4>
						<p>	Actualizamos periódicamente esta Política de Cookies para adaptarnos a los cambios en cuestiones legales y operativas, para definir nuevas cookies y tecnologías de seguimiento, y para determinar cómo afectan esos cambios a la manera en que tratamos tu información. Si vamos a utilizar la información de una manera muy distinta a la indicada en el momento de su recopilación o a realizar algún cambio importante en nuestras prácticas de privacidad, te lo haremos saber. Publicaremos esos cambios mediante un aviso destacado en nuestro sitio web.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>




	<style lang="scss">
		.cookies-class{

			#menufixed{
				position: sticky;
				top:100px;
				z-index: 1;
			}

			a {color: black;}
			.selected{
				color: rgb(255,66,77);;
			}
			h1, h3{
				font-weight: bold;
				margin-bottom:20px;
			}
			h4{
				margin-bottom:20px;

			}
			.cookies-text{
				margin-top:60px;
				h4{
					margin-top: 60px;
				}
			}
			.cookies-head{

				padding-top:100px;
				padding-bottom:100px;
				margin-top:20px;
				background-color: rgb(245, 244, 242);//#f5f5f7;
				width:100%;
				min-height:250px;
				span{

				}
			}
		}
	</style>
