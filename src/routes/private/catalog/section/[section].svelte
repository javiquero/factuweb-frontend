<!-- // SAPPER preLoad Section -->
	<script context="module">
		import { get } from "../../../../lib/api";
		export async function preload(page, session, query) {
			const { section } = page.params;
			return {idSection: section}

			// let dataProducts = [];
			// let dataSection = {};
			// try {
			// 	dataSection = await get(`ffam?where={"CODFAM":"${section}"}`,"",session.token);
			// 	dataProducts = await get(`fart?where={"FAMART":"${section}", "SUWART": 1, "DSCART":0}&limit=1000`,"",session.token);
			// } catch (e) {
			// 	console.error(e);
			// 	this.error(500, e.toString());
			// }
			// await new Promise(resolve => setTimeout(resolve, 20000));
			// return {
			// 	dataProducts, sectionInfo: dataSection.length>0?dataSection[0]:{}
			// };
		}
	</script>
<!-- // End SAPPER preLoad Section -->

<script>
	import ThumbItem from "@/components/thumbItem.svelte";
	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import DetailsItem from "@/components/detailsItem.svelte";
	import AddCart from "@/components/addCart.svelte";

	import { siteName, contactEmail } from "@/config";
	// import { onMount } from 'svelte';
	import { stores } from "@sapper/app"
	const { session } = stores()

	export let idSection = 0;

	$:refresh(idSection)

	async function refresh(id){
		items =  getItemsInSection();
		infoSection =  getInfoSection();
	};

	let selART = undefined;
	function onSelectThumb(event){
		selART= event.detail;
		window.$('#modalItemDetails').modal('show');
	}

	// onMount(async () => {

	// });
	//  var items = [];
	let items = getItemsInSection()
	function getItemsInSection(){
		return new Promise(async (resolve, reject) => {
			try {
				items = await get(`fart?where={"FAMART":"${idSection}", "SUWART": 1, "DSCART":0}&limit=1000&sort=ORDART`,"",$session.token);
				return resolve (items);
			} catch (e) {
				console.error("Load items in section - ", e);
				return reject (e)
			}
		});
	}

	 let infoSection = getInfoSection();
	function getInfoSection(){
		return new Promise(async (resolve, reject) => {
			try {
				infoSection = await get(`ffam?where={"CODFAM":"${idSection}"}`,"",$session.token);
				if (infoSection && infoSection.length>0)infoSection=infoSection[0];
				return resolve (infoSection);
			} catch (e) {
				console.error("Load section - ", e);
				return reject (e)
			}
		});
	}

</script>

<svelte:head>
  <title>{siteName} - {infoSection?infoSection.DESFAM:''}</title>
</svelte:head>

<main>


	<section class="items-section">
	<!-- <div class="container-fluid"> -->


		<div class="container-xl">

			{#await infoSection}
				<div class="row">
						<div class="col mb-3">
							<PreText></PreText>
						</div>
					<div class="col text-right">
						<PreText></PreText>
					</div>
				</div>
			{:then infoSection}
					<div class="row">
						<div class="col mb-3">
							<h1>{infoSection.DESFAM}</h1>
						</div>
						<div class="col text-right">
							<div class="dropdown">
								<button class="btn btn-light btn-sm" type="button" >
									Descargar imagenes
								</button>
							</div>
						</div>
					</div>
			{:catch error}
				<div class="alert alert-danger" role="alert">
						<h4 class="alert-heading">Error al recibir información!</h4>
					{error.message}
					<hr>
					<p class="mb-0">Recargue la página y si el problema persiste contacte con {contactEmail}.</p>
				</div>
			{/await}


			{#await items}
				<div class="row">
					{#each Array(9) as _, i}
						<div class="col col-sm-6 col-lg-4"><PreThumbItem /></div>
					{/each}
				</div>
			{:then items}
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
							<div class="col col-sm-6 col-lg-4 col-xl-4">
								<ThumbItem on:select="{onSelectThumb}" fart={item} />
							</div>

						{/each}
					</div>
					<div class="modal fade" id="modalItemDetails" tabindex="-1" role="dialog">
						<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
							<div class="modal-content">
								<div class="modal-body">
									<button on:click={()=>{window.$('#modalItemDetails').modal('hide');}} type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<DetailsItem fart={selART} />
								</div>
							</div>
						</div>
					</div>
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
