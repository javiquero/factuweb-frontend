<!-- // SAPPER preLoad Section -->
<script context="module">
	export async function preload(page, session, query) {
		const { section } = page.params;
		if (session.token != undefined && session.token != null ) {
			return this.redirect(302, "/private/search?q="+sectipage.query.q);
		}else{
			return {query: page.query.q}
		}
	}
</script>
<script>

	import ThumbItem from "@/components/thumbItem.svelte";
	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import ModalDetails from "@/components/modalDetails.svelte";
	import { siteName, contactEmail } from "@/config";
	import { stores } from "@sapper/app"
	import { post, get } from "@/lib/api";

	const { session } = stores()
	export let query = "";

	let items = [];
	let data = undefined;
	$:data = getData(query);

	function getData(t){
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
				return resolve(c);
			} catch (error) {
				console.error(error);
				return reject(error);
			}
		});
	}

	function getRemoteData(){
		return new Promise(async (resolve, reject) =>{
			try {
				let items = await post(`products/search`,{q: query});
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
	}
</script>



<svelte:head>
	<title>{$session.info.NOMEMP || siteName} | Resultados de la búsqueda</title>

	<meta data-hid="description" name="description" content="Página de resultados de la búsqueda de productos · {$session.info.NOMEMP || siteName}" />
	<meta data-hid="title" name="title" content="Resultados de busqueda · {$session.info.NOMEMP || siteName}" />

	<meta data-hid="og:description" name="og:description" content="Página de resultados de la búsqueda de productos · {$session.info.NOMEMP || siteName}" />
	<meta data-hid="og:title" name="og:title" content="Resultados de busqueda · {$session.info.NOMEMP || siteName}" />
</svelte:head>
<main>
	<section class="items-section">
		<div class="container-xl">
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
						<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-4"><PreThumbItem /></div>
					{/each}
				</div>
			{:then data}
					<div class="row">
						<div class="col mb-3">
							<h1>Resultados de la busqueda</h1>
							<h4>Se han encontrado {data[1].length} resultados</h4>
						</div>
						<div class="col text-right">

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


		</div>
	</section>
</main>
