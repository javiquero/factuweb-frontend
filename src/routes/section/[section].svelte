<!-- // SAPPER preLoad Section -->
<script context="module">
	import { get } from "@/lib/api";
	export async function preload(page, session, query) {
		const { section } = page.params;
		if (session.token != undefined && session.token != null ) {
			return this.redirect(302, "/private/catalog/section/"+section);
		}else{
			let items = await get(`catalog/${section}`);
			// console.log(section, items);
			return {idSection: section, sections: items}
		}
	}
</script>

<script>

	import { stores	} from "@sapper/app";
	const { preloading, session } = stores();

	import ThumbItem from "@/components/thumbItem.svelte";
	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import ModalDetails from "@/components/modalDetails.svelte";
	import { siteName, contactEmail } from "@/config";

	import { onMount } from 'svelte';


	export let sections;
	$: sectionData = sections;

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

</script>
<style >
 :global(.arrowsfixed) {
		position: sticky;
		top:62px;
		z-index: 1;
	}
	@media (max-width: 767px) {
		 :global(.arrowsfixed) {top:111px;}
	}
</style>
<svelte:head>
  	<title>{$session.info.NOMEMP || siteName} - {sectionData?sectionData.DESFAM:''}</title>
	<meta data-hid="og:description" name="og:description" content="{$session.info.NOMEMP || siteName} - Sección del catálogo  {sectionData?sectionData.DESFAM:''}" />
   	<meta data-hid="description" name="description" content="{$session.info.NOMEMP || siteName} - Sección del catálogo  {sectionData?sectionData.DESFAM:''}" />
   	<meta data-hid="og:title" name="og:title" content="{$session.info.NOMEMP || siteName}" />
	<meta data-hid="title" name="title" content="{$session.info.NOMEMP || siteName}" />
</svelte:head>
<main>
	<section class="items-section">
		<div class="container-xl">
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
					<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-4"><PreThumbItem /></div>
				{/each}
			</div>
		{/if}
		{#if sectionData.items}
				<div id="sectionarrows" class="row justify-content-between mb-4" >
					<div class="col-3">
						<a class="btn btn-light btn-block" href="/section/{sectionData.inf.previous}" role="button"><i class="fas fa-chevron-left"></i></a>
					</div>
					<div class="col-3">
						<a class="btn btn-light btn-block" href="/section/{sectionData.inf.next}" role="button"><i class="fas fa-chevron-right"></i></a>
					</div>
				</div>
				<div class="row">
					<div class="col-8 mb-3">
						<h1>{sectionData.DESFAM}</h1>
					</div>
					<div class="col-4 text-right">
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

