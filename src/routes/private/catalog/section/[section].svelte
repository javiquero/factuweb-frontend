<!-- // SAPPER preLoad Section -->
	<script context="module">
		import { get } from "@/lib/api";
		export async function preload(page, session, query) {
			const { section } = page.params;

			if (session.token == undefined || session.token == null ) {
				return this.redirect(302, "/section/"+section);
			}else{
				let items = await get(`catalog/${section}`, undefined ,session.token);
				return { sections: items}
			}
		}
	</script>

<script>
	import ThumbItem from "@/components/thumbItem.svelte";
	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import ModalDetails from "@/components/modalDetails.svelte";
	import { siteName, contactEmail } from "@/config";
	import { goto, stores } from "@sapper/app"

	import { onMount } from 'svelte';

	const { preloading, page, session } = stores();


	export let sections;
	$: sectionData = sections;
	$: ogImage = _ogImage(sections);

	let selectedProduct = undefined;
	function onSelectThumb(event){
		selectedProduct= event.detail;
	}

	onMount(async () => {
		window.onscroll=function () {
			var top = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
			var head = document.getElementById("sectionarrows");
			if (head == null) return;
				if(top > 61){
				head.classList.add("arrowsfixed");
			} else {
				head.classList.remove("arrowsfixed");
		  }
		};
	});

	function _ogImage(sectionData){
		if (sectionData){
			if (sectionData.IMAFAM && sectionData.IMAFAM!=""){
				return  "http://" + $page.host + "/api/image/1024/" + sectionData.IMAFAM;
			}else{
				if (sectionData.items && sectionData.items.length>0){
					return  "http://" + $page.host + "/api/image/1024/" + sectionData.items[0].IMGART;
				}else{
					return undefined;
				}
			}
		}else{
			return undefined;
		}
	}
</script>


<style >
 :global(.arrowsfixed) {
		position: sticky;
		top:62px;
		z-index: 1;
	}
	@media (max-width: 770px) {
		 :global(.arrowsfixed) {top:111px;}
	}

</style>


<svelte:head>
  	<title>{$session.info.NOMEMP || siteName} - {sectionData?sectionData.DESFAM:''}</title>

	<meta data-hid="description" name="description" content="Sección {sectionData?sectionData.DESFAM:''} del catálogo de {$session.info.NOMEMP || siteName}" />
	<meta data-hid="title" name="title" content="{sectionData?sectionData.DESFAM:''} · {$session.info.NOMEMP || siteName}" />

	<meta data-hid="og:description" name="og:description" content="Sección {sectionData?sectionData.DESFAM:''} del catálogo de {$session.info.NOMEMP || siteName}" />
	<meta data-hid="og:title" name="og:title" content="{sectionData?sectionData.DESFAM:''} · {$session.info.NOMEMP || siteName}" />
	{#if ogImage!=undefined}
	<meta data-hid="og:image" name="og:image" content="{ogImage}" />
	{/if}

</svelte:head>


<main>
	<section class="items-section">
	<!-- <div class="container-fluid"> -->
		<div class="container">
			{#if $preloading}
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
						<div class="col col-sm-6 col-lg-4 col-xl-4"><PreThumbItem /></div>
					{/each}
				</div>
		{:else}
			{#if sectionData.items}
				<div id="sectionarrows" class="row justify-content-between mb-4" >
					<div class="col-3">
						<button class="btn btn-light btn-block" on:click={()=>{goto("/private/catalog/section/" + sectionData.inf.previous)}} role="button"><i class="fas fa-chevron-left"></i></button>
					</div>
					<div class="col-3">
						<button class="btn btn-light btn-block" on:click={()=>{goto("/private/catalog/section/" + sectionData.inf.next)}} role="button"><i class="fas fa-chevron-right"></i></button>
					</div>
				</div>
				<div class="row">
					<div class="col-8 mb-3">
						<h1>{sectionData.DESFAM}</h1>
					</div>
					<div class="col-4 text-right">
						<div class="dropdown">
							<button on:click={()=>{goto("/api/image/download/section/"+sectionData.CODFAM)}}  download class="btn btn-light btn-sm" role="button" >
								Descargar imagenes
							</button>
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
			{/if}
		{/if}
			<!-- {:catch error}
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

