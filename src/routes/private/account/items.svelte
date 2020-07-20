
	<script context="module">
		export async function preload(page, session, query) {
			const p = page.params;
			return{ params:p }
		}
	</script>

<script>
	import ThumbItem from "@/components/thumbItem.svelte";
	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import DetailsItem from "@/components/detailsItem.svelte";
	import AddCart from "@/components/addCart.svelte";
	import { siteName, contactEmail } from "@/config";
	import { stores } from "@sapper/app"
	import { get } from "@/lib/api";

	export let params;
	const { session } = stores()

	let selART = undefined;
	function onSelectThumb(event){
		selART= event.detail;
		window.$('#modalItemDetails').modal('show');
	}
	let totItems = 0;
	let itemsPerPage= 100;
	let totPages =0;

	let items = getProducts();
	function getProducts() {
		return new Promise(async (resolve, reject) => {
			try {
				let q = `flfa?count=1`;
				let o = await get(q, undefined ,$session.token);
				totItems = o;
				totPages = Math.ceil(o/itemsPerPage) ;
				let i = loadPage(1);
				return resolve(i);
			} catch (e) {
				console.error("Orders - ", e);
				return reject (e)
			}
		});
	}

	function loadPage(numPage){
		return new Promise(async (resolve, reject) => {
			try {
				let from = (numPage-1) * itemsPerPage
					let q = `flfa?from=${from}&items=${itemsPerPage}`;
					let o = await get(q, undefined ,$session.token);

					return resolve (o);
				} catch (e) {
					console.error("Orders - ", e);
					return reject (e)
				}
			});
	};


</script>

<svelte:head>
  <title>{siteName} - Historial de compras</title>
</svelte:head>

<main>


	<section class="items-section">
	<!-- <div class="container-fluid"> -->
Items: {totItems}<br/>
TOTPAGES: {totPages}<br/> {params}
		<div class="container-xl">
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
							<div class="col col-md-12 col-lg-6 col-xl-4">
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
