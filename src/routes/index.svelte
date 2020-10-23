
<script context="module">
	export async function preload(page, session, query) {
		const { section } = page.params;
		if (session.token != undefined && session.token != null ) {
			return this.redirect(302, "/private");
		}
	}
</script>
<script>
	import { siteName } from "@/config.js";
	import { stores	} from "@sapper/app";
	const {session} = stores();
</script>

<style lang="scss">
	.head{
		background-image: linear-gradient(80.9deg,rgba(210,229,248,.3) 23.12%,rgba(249,201,184,.3) 91.44%),linear-gradient(102.49deg,rgba(115,175,225,.37) 0%,rgba(249,205,188,.37) 49.38%,rgba(191,235,200,.5) 100.86%);
		// height:260px;
		text-align: center;
		padding-top:30px;
		padding-bottom:30px;
		.main-logo{
			background-image: url('/logo.svg');
			height:180px;
			background-size: 100px;
			background-position: top center;
			background-repeat: no-repeat;
		}
		span{
			font-family: 'Paytone One';
    		font-weight: 400;
    		font-style: normal;
    		font-size: 25px;
		    line-height: 25px;
    		color: rgba(0, 0, 0, 0.6);
		}
	}


	section {
		margin-top: 40px;
		img {
			max-width:100%;
		}
		.background-logo{
			background-image: url('/logo.svg');
			height:200px;
			background-size: 100px;
			background-position: top center;
			background-repeat: no-repeat;
		}
		.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:100%;}
	}

	.pasos{
		background-color: #f5f5f7;
		width:100%;
		min-height:250px;
		padding: 40px;
		.subtitle, .title{
			margin-bottom:15px;
		}
	}
</style>

<svelte:head>
  <title>{$session.info.NOMEMP || siteName}</title>
  <meta data-hid="description" name="description" content="Site {$session.info.NOMEMP || siteName}" />
  <meta data-hid="og:title" name="og_title" content="Site {$session.info.NOMEMP || siteName}" />
</svelte:head>

<div>
	<div class="head">
		<div class="main-logo" ></div>
		<span>Bienvenido a {$session.info.NOMEMP || siteName}!</span>
		<p>No lo pienses más y entra a ver nuestro catálogo</p>
		<a href="/section/0" class="btn btn-primary">Ver catálogo</a>
	</div>

	<section >
		<div class="container">
			<h1 class="text-center">
				<strong>Somos un equipo que quiere estar a tu lado</strong>
			</h1>
			<p class="text-center mb-30 " style="margin-right:25%; margin-left:25%">
				En factuWeb estamos trabajando duro para que tu puedas vender mas.
				Nuestra misión es ayudarte y así tengas más tiempo para dedicarle a lo
				que te apasiona.
			</p>
			<div class="text-center mb-5">
				<img src="/images/para-empresas.svg" alt="" />
			</div>
		</div>
	</section>

	<section>
		<div class="pasos" >
			<div class="container">
				<div class="row">
					<div class="col-sm-4">
						<div class="title">Paso 1</div>
						<div class="subtitle"style="font-weight: bold;">Hazte cliente</div>
						<p>
							Si todavía no eres cliente contacta con nosotros para que te abramos ficha.
						</p>
					</div>

					<div class="col-sm-4">
						<div class="title">Paso 2</div>
						<div class="subtitle"style="font-weight: bold;">Introduce tus datos</div>
						<p>
							Para empezar, introduce las credenciales de tu empresa.
						</p>
					</div>

					<div class="col-sm-4">
						<div class="title">Paso 3</div>
						<div class="subtitle"style="font-weight: bold;">Accede a todos nuestros productos</div>
						<p>
							Visualiza nuestro catálogo con mas de 7000 productos.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="container">
			<div class="row align-items-center">
				<div class="col-md-6">
					<div class="text-center ">
						<img src="/images/work-team-bg.svg" alt="" />
					</div>
				</div>
				<div class="col-md-6">
					<p class="">
						Nos encanta poder ofrecerte este servicio.<br><br>

						Queremos dar la mejor tecnología a nuestros clientes, así como a sus equipos.<br><br>

						Trabajamos para conseguir que nuestros clientes puedan acceder a todos nuestros productos de la manera mas comoda.<br><br>

						Los negocios cada día disponen de más información, facilitamos todo el proceso, podemos dar las mejores herramientas para su visualización.<br><br>
					</p>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="gmap_canvas">
			<iframe id="gmap_canvas" title="" style="height: 500px;width:100%;"
			src="https://maps.google.com/maps?q=Software%20DELSOL.&t=&z=18&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no"
			marginheight="0" marginwidth="0"></iframe>
		</div>
	</section>
</div>

