<!-- // SAPPER preLoad Section -->
	<script context="module">
		export async function preload(page, session, query) {
			const { section } = page.params;
			return {idSection: section}
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
	import { onMount } from 'svelte';

	const { session } = stores()

	export let idSection = 0;
	let remoteData= undefined;
	$:remoteData = getRemoteData(idSection)
	let inf=undefined;

	function getRemoteData(id){
		if (id == undefined ) id = idSection;
		return new Promise(async (resolve, reject) =>{
			try {
				let items = await get(`catalog/${id}`,"",$session.token);
				inf = items;
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

	onMount(async () => {
		window.onscroll=function () {
			var top = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
			var head = document.getElementById("sectionarrows");
			if (head == null) return;
				if(top > 61){
				head.classList.add("arrowsfixed");
				// head.style.position = "fixed";
				// head.style.width="100%";
				// head.style.top="62px";
				// head.style['z-index']=1;
			} else {
				head.classList.remove("arrowsfixed");
			// if(head.getAttribute("style"))
				// head.removeAttribute("style")
		  }
		};
	});

</script>


<style >
 :global(.arrowsfixed) {
		position: sticky;
		/* width:100%; */
		top:62px;
		z-index: 1;
	}
	@media (max-width: 770px) {
		 :global(.arrowsfixed) {top:111px;}
	}

</style>



<svelte:head>
  <title>{siteName} - {inf?inf.DESFAM:''}</title>
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
			{:then sectionData}
					<!-- <div class="row w-100 d-none d-xl-flex" style="position:fixed; left:10px; z-index: 1">
						<div class="col-6">
							<a class="btn btn-light" href="/private/catalog/section/{sectionData.inf.previous}" role="button"><i class="fas fa-chevron-left"></i></a>
						</div>
						<div class="col-6 text-right">
							<a class="btn btn-light" href="/private/catalog/section/{sectionData.inf.next}" role="button"><i class="fas fa-chevron-right"></i></a>
						</div>
					</div>
					<div id="sectionarrows" class="row d-flex d-xl-none justify-content-between mb-4" > -->
					<div id="sectionarrows" class="row justify-content-between mb-4" >
						<div class="col-3">
							<a class="btn btn-light btn-block" href="/private/catalog/section/{sectionData.inf.previous}" role="button"><i class="fas fa-chevron-left"></i></a>
						</div>
						<div class="col-3">
							<a class="btn btn-light btn-block" href="/private/catalog/section/{sectionData.inf.next}" role="button"><i class="fas fa-chevron-right"></i></a>
						</div>
					</div>
					<div class="row">
						<div class="col-8 mb-3">
							<h1>{sectionData.DESFAM}</h1>
						</div>
						<div class="col-4 text-right">
							<div class="dropdown">
								<a href="/api/image/download/section/{sectionData.CODFAM}" download class="btn btn-light btn-sm" role="button" >
									Descargar imagenes
								</a>
							</div>
						</div>
					</div>

				{#if sectionData.items.length == 0}
					<div class="row">
						<div class="col">
							No se han encontrado artículos o ha habido un problema al
							recuperar la información del servidor.
						</div>
					</div>
				{:else}
					<div class="row">
						{#each sectionData.items as item}
							<div class="col col-sm-6 col-lg-4 col-xl-4">
								<ThumbItem on:select="{onSelectThumb}" fart={item} />
							</div>

						{/each}
					</div>
					<ModalDetails items="{sectionData.items}" selected="{selectedProduct}"></ModalDetails>
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

