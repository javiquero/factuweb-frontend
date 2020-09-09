
	<script context="module">
		export async function preload(page, session, query) {
			const p = page.query;
			return{ params:p }
		}
	</script>

<script>
	import ThumbItem from "@/components/thumbItem.svelte";
	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import { siteName, contactEmail } from "@/config";
	import { stores } from "@sapper/app";
	import { get } from "@/lib/api";
	import ModalDetails from "@/components/modalDetails.svelte";
	// import SvelteInfiniteScroll from "svelte-infinite-scroll";

	export let params;
	const { session } = stores()

	import {onMount} from 'svelte';
	let myComponent;

	onMount(async () => {
		const module = await import('svelte-infinite-scroll');
		myComponent = module.default;
    });


	$: onChangeParams(params);
	function onChangeParams(p){
		if (params.page == undefined)  params.page=1;
		console.log("params: ", p);
		page = p.page;
	}

	let page =0;
	// $: onChangePage(page);
	// async function onChangePage (numPage){
	// 	if (numPage==undefined)return;
	// 	console.log(numPage);
	// 	if (numPage>1){
	// 		let newItems = await loadPage(numPage);
	// 		items = items.concat(newItems);
	// 	}
	// }

	let itemSelected = undefined;
	function onSelectThumb(event){
		itemSelected= event.detail;
	}

	let totItems = 0;
	let itemsPerPage= 12;
	let totPages =0;

	let items = [];
	let moreItems = [];
	$: items = [
		...items,
    	...moreItems
	];

	async function fetchData() {
		let from = (page-1) * itemsPerPage;
		let q = `flfa?from=${from}&items=${itemsPerPage}`;
		let o = await get(q, undefined ,$session.token);
		moreItems = o;
	};

	onMount(()=> {
		// load first batch onMount
		// fetchData();
	})

	// let its = firstLoad();
	// $: onChangeIts(its);
	// function onChangeIts(value){
	// 	items = value;
	// }

	let waitTotItems = getTotItems();
	function getTotItems(){
		return new Promise((resolve, reject) =>{
			try {
				get(`flfa?count=1`, undefined ,$session.token).then(o=>{
					totItems = o;
					totPages = Math.ceil(o/itemsPerPage) ;
					return resolve();
				});
			} catch (e) {
				console.error("getTotItems - ", e);
				return reject (e)
			}
		});
	}
	let its = fload();
	function fload (){
		return new Promise(async (resolve, reject) =>{
			let q = `flfa?from=0&items=${itemsPerPage}`;
			let o = await get(q, undefined ,$session.token);
			moreItems = o;
			return resolve(o);
		});
	}
	// function firstLoad() {
	// 	return new Promise(async (resolve, reject) => {
	// 		console.log("FirstLoad");
	// 		try {
	// 			let i = await loadPage(params.page);
	// 			return resolve(i);
	// 		} catch (e) {
	// 			console.error("firstLoad - ", e);
	// 			return reject (e)
	// 		}
	// 	});
	// }

	// function loadPage(numPage){
	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			let from = (numPage-1) * itemsPerPage;
	// 			if (!isNaN(from)){
	// 				console.log("loadPage:", from );
	// 				let q = `flfa?from=${from}&items=${itemsPerPage}`;
	// 				let o = await get(q, undefined ,$session.token);
	// 				return resolve (o);
	// 			}else{
	// 				console.log("loadPage isNan:", numPage);
	// 				return resolve([])
	// 			}
	// 		} catch (e) {
	// 			console.error("Orders - ", e);
	// 			return reject (e)
	// 		}
	// 	});
	// };


</script>

<svelte:head>
  <title>{siteName} - Historial de compras</title>
</svelte:head>

<main>


	<section >
	<div class="container-fluid">
		{#await waitTotItems}
			Cargando...
		{:then value}
				TotItems: {totItems}<br/>
				TOTPAGES: {totPages}<br/>
				{JSON.stringify(params)}
		{/await}

		<!-- <div class="container-xl"> -->
			{#await its}
				<div class="row">
					{#each Array(6) as _, i}
						<div class="col col-sm-6 col-lg-4"><PreThumbItem /></div>
					{/each}
				</div>
			{:then items}
				{#if items.length == 0}
					<div class="row">
						<div class="col">
							No se han encontrado artículos o ha habido un problema al
							recuperar la información del servidor.
							{items}
						</div>
					</div>
				{:else}
					<div class="row">
					<!-- {JSON.stringify(items)} -->
						{#each items as item}
							<div class="col col-md-12 col-lg-6 col-xl-4">
								<ThumbItem on:select="{()=>{itemSelected=item}}" fart={item} />
							</div>
						{/each}
						<svelte:component this={myComponent}  hasMore={moreItems.length}
      threshold={100}
      on:loadMore={() => {page++; fetchData()}} />
						<!-- <SvelteInfiniteScroll threshold={itemsPerPage} on:loadMore={() => page++} /> -->
					</div>
					<ModalDetails items="{items}" selected="{itemSelected}"></ModalDetails>

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
