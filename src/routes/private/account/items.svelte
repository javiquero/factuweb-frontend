<!-- // SAPPER preLoad Section -->
	<script context="module">
		export async function preload(page, session, query) {


		}
	</script>

<script>
	import ThumbItem from "@/components/thumbItem.svelte";
	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import ModalDetails from "@/components/modalDetails.svelte";
	import { siteName, contactEmail } from "@/config";
	import { stores } from "@sapper/app"
	import { get } from "@/lib/api";

	const { session } = stores()

	let page = 1;
	let perPage= 100;
	let items = [];
	let data = undefined;
	$: data= getData()

	function getData(){
		return new Promise(async (resolve, reject) =>{
			try {
				let d = await Promise.all([getSections(), getRemoteData()]);
				await Promise.all(d[0].map(async section => {
					section.numitems = 0;
					await Promise.all(section.fam.map(async fam => {
						fam.items=[];
						await Promise.all(d[1].map(async item => {
							if (item.FAMART==fam.CODFAM){
								section.numitems +=1;
								fam.items.push(item);
								if (item.CODART && item.IMGART ) items.push(item);
							}
						}));
					}));
				}));
				return resolve(d)
			} catch (error) {
				console.error(error);
				return reject(error);
			}

		});
	}

	function getSections() {
		return new Promise(async (resolve, reject) =>{
			try {
				let c = await get(`catalog`);
				// console.log(c);
				return resolve(c);
			} catch (error) {
				console.log(error);
				return reject(error);
			}
		});
	}

	function getRemoteData(){
		return new Promise(async (resolve, reject) =>{
			try {
				let items = await get(`products/list`,"",$session.token);
				return resolve(items);
			} catch (error) {
				console.error(error);
				return reject(error);
			}
		});
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
		<div class="container-fluid">
			{#await data}
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
						<div class="col-xs-12 col-sm-6 col-lg-6 col-xl-4"><PreThumbItem /></div>
					{/each}
				</div>
			{:then data}
					<div class="row mb-3">
						<div class="col-xs-12 col-sm-8 ">
							<h1>Listado de artículos comprados</h1>
						</div>
						<div class="col-xs-12 col-sm-4 text-right">
							<div class="dropdown">
								<a href="/api/image/download/products" download class="btn btn-light btn-sm" role="button" >
									Descargar imagenes
								</a>
							</div>
						</div>
					</div>

				{#if data[1].length == 0}
					<div class="row">
						<div class="col">
							No se han encontrado artículos o ha habido un problema al
							recuperar la información del servidor.
						</div>
					</div>
				{:else}
					<!-- {#each data[0] as section}
						{#if section.numitems > 0}
							<div class="row">
								<h3>{section.DESSEC}</h3>
							</div>
							{#each section.fam as fam}
								{#if fam.items.length > 0}
									<div class="row" style="padding-left: 20px;">
										<h4> <a href="#{fam.CODFAM}">{fam.DESFAM}</a></h4>
									</div>
								{/if}
							{/each}

						{/if}
					{/each} -->
					{#each data[0] as section}
						{#if section.numitems > 0}
							<div class="row" style="border-top: 1px solid #ccc;">
								<h2>{section.DESSEC}</h2>
							</div>
							{#each section.fam as fam}
								{#if fam.items.length > 0}
									<div class="row" style="padding-left: 20px;">
										<h3 id="{fam.CODFAM}">{fam.DESFAM}</h3>
									</div>
									<div class="row">
									{#each fam.items as item}
										<div class="col-xs-12 col-sm-6 col-lg-6 col-xl-4">
											<ThumbItem on:select="{onSelectThumb}" fart={item} />
										</div>
									{/each}
									</div>
								{/if}
							{/each}

						{/if}
					{/each}
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






<!-- {#await remoteData}
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
						<div class="col-xs-12 col-sm-6 col-lg-6 col-xl-4"><PreThumbItem /></div>
					{/each}
				</div>
			{:then items}
					<div class="row mb-3">
						<div class="col-xs-12 col-sm-8 ">
							<h1>Listado de artículos comprados</h1>
						</div>
						<div class="col-xs-12 col-sm-4 text-right">
							<div class="dropdown">
								<a href="/api/image/download/products" download class="btn btn-light btn-sm" role="button" >
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
							<div class="col-xs-12 col-sm-6 col-lg-6 col-xl-4">
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
			{/await} -->

		</div>
	</section>
</main>
