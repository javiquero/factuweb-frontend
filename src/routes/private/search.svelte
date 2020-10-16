<!-- // SAPPER preLoad Section -->
	<script context="module">
		export async function preload(page, session, query) {
			 return {query: page.query.q}

		}
	</script>

<script>
	import ThumbItem from "@/components/thumbItem.svelte";
	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import ModalDetails from "@/components/modalDetails.svelte";
	import { siteName, contactEmail } from "@/config";
	import { stores } from "@sapper/app"
	import { post } from "@/lib/api";

	const { session } = stores()

	export let query = "";

	let remoteData= undefined;
	$:remoteData = getRemoteData(query)

	function getRemoteData(text){
		return new Promise(async (resolve, reject) =>{
			if (text =="") return resolve([]);
			try {
				let items = await post(`products/search`,{q: text},$session.token);
				return resolve(items);
			} catch (error) {
				console.error(error);
				return reject(error);
			}
		});
	}

	async function download(){
		let data = await post(`image/download/search`,{q: query},$session.token);
		var iframe = document.createElement('iframe');
			iframe.style.display = "none";
			var blob = new Blob([data], { type: 'application/zip' });
        	iframe.src = window.URL.createObjectURL(blob);
			document.body.appendChild(iframe);


	}

	let selectedProduct = undefined;
	function onSelectThumb(event){
		selectedProduct= event.detail;
		console.log(event);
	}
</script>

<svelte:head>
  <title>{siteName} </title>
</svelte:head>
<main>


	<section class="items-section">
	<!-- <div class="container-fluid"> -->
		<div class="container-xl">
			{#await remoteData}
				<div class="row">
						<div class="col mb-3">
							<PreText></PreText>
						</div>
					<div class="col text-right">
						<PreText></PreText>
					</div>
				</div>

				<div class="row">
					{#each Array(9) as _, i}
						<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-4"><PreThumbItem /></div>
					{/each}
				</div>
			{:then items}
					<div class="row">
						<div class="col mb-3">
							<h1>Resultados de la busqueda</h1>
							<h4>Se han encontrado {items.length} resultados</h4>
						</div>
						<div class="col text-right">
							<div class="dropdown">
								<a href="/api/image/download/search?q={query}" download class="btn btn-light btn-sm" role="button" >
									Descargar imagenes
								</a>
							</div>
						</div>
					</div>

				{#if items.length == 0}
					<div class="row">
						<div class="col">
							No se han encontrado artículos o ha habido un problema al
							recuperar la información del servidor.
						</div>
					</div>
				{:else}
					<div class="row">
						{#each items as item}
							<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-4">
								<ThumbItem on:select="{onSelectThumb}" fart={item} />
							</div>

						{/each}
					</div>
					<ModalDetails items="{items}" selected="{selectedProduct}"></ModalDetails>
				{/if}


			{:catch error}
				<div class="alert alert-danger" role="alert">
						<h4 class="alert-heading">Error al recibir información!</h4>
					{error.message}
					<hr>
					<p class="mb-0">Recargue la página y si el problema persiste contacte con {contactEmail}.</p>
				</div>
			{/await}


		</div>
	</section>
</main>
