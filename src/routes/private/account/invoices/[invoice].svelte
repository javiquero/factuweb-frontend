<!-- // SAPPER preLoad Section -->
	<script context="module">
		export async function preload(page, session, query) {
			const { invoice } = page.params;
			let t = invoice.split("-");
			if (t.length==3){
				return {YEAR: t[0], TIPFAC: t[1], CODFAC: t[2]};
			}else{
				return this.redirect(301, '/private/')
			}
		}
	</script>
<!-- // End SAPPER preLoad Section -->

<script>
	import Pretable from "@/components/preTable.svelte";
	import Pretext from "@/components/preText.svelte";
	import { siteName, contactEmail, showPriceInInvoices } from "@/config";
	import ModalDetails from "@/components/modalDetails.svelte";
	import { formatDate, formatCurrency} from "@/lib/functions";
	import { get } from "@/lib/api";
	import { stores } from "@sapper/app";
	import { cart } from "@/store/cart.js";

	const { session} = stores();
	let invoice = [];
	let items=[];
	const title = "Detalle de factura";
	export let YEAR=undefined;
	export let TIPFAC=undefined;
	export let CODFAC=undefined;
	let lineSelected = undefined;

	function onSelectLine(line){
		if (line.info.CODART && line.info.IMGART ){
			lineSelected= line.info;
		}
	}

	function getInvoice() {
		return new Promise(async (resolve, reject) => {
			try {
				let o = await get("invoice/" + YEAR +"/" + TIPFAC + "/" + CODFAC , undefined ,$session.token);
				items = [];
				await Promise.all(o.lines.map(item => {if (item.info) item.info.idx=item.POSLFA; if (item.info.CODART && item.info.IMGART ) items.push(item.info)}))
				return resolve (invoice = o);
			} catch (e) {
				console.error("Invoices - ", e);
				return reject (e)
			}
		});
	}

	async function addAllToCart(){
		let list = [];
		await Promise.all(invoice.lines.map(async item => {
			if (item.info.CODART && item.info.SUWART==1 && item.info.FAMART!="" && item.PRELFA>0 ){
				item.info.type=0;
				list.push({item:item.info, add: true, qty: item.CANLFA})
			}
		}))
		await cart.setList(list);
	}

</script>

<svelte:head>
  <title>{siteName} - Factura {invoice.TIPFAC}-{invoice.CODFAC}</title>
</svelte:head>

<main>
	<section style="margin-top: 0px;">
		<nav aria-label="breadcrumb" class="mb-3">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/private/account">Mi cuenta</a></li>
				<li class="breadcrumb-item"><a href="/private/account/invoices">Facturas</a></li>
				<li class="breadcrumb-item active" aria-current="page">Factura</li>
			</ol>
		</nav>



		{#await getInvoice()}
			<div class="row">
				<div class="col-sm-6 ">
					<div class="block-title">
						<Pretext />
					</div>
					<div class="block-subtitle align-bottom">
						<Pretext />
					</div>
				</div>
				<div class="col-sm-6 text-right">
					<div class="" style="max-width:220px; width:220px; float:right;">
						<Pretext />
						<Pretext />
						<Pretext />
					</div>
				</div>
			</div>
			<Pretable cols="5" rows="6" />
		{:then invoice}
			<div class="row">
				<div class="col-sm-6 ">
					<div class="block-title">
						<h1>{title}</h1>
					</div>
					<div class="block-subtitle align-bottom">
						<h2>Factura {invoice.TIPFAC}-{invoice.CODFAC} del {formatDate(invoice.FECFAC)}</h2>
					</div>
				</div>
				<div class="col-sm-6 text-right">
					<div class="" style="max-width:220px; width:220px; float:right;">
						<a href="/api/image/download/invoice/{YEAR}/{TIPFAC}/{CODFAC}" class="btn btn-fw btn-light btn-block" role="button" >
							Descargar imagenes <i style="float: right; line-height: 22px;" class="fal fa-images"></i>
						</a>
						<button class="btn btn-fw btn-light btn-block"  type="button" on:click={addAllToCart}>
							Añadir todo al carro <i style="float: right; line-height: 22px;" class="fal fa-shopping-basket"></i>
						</button>
						{#if showPriceInInvoices==true}
							<a target="_blank" href="/api/invoice/pdf/{YEAR}/{TIPFAC}/{CODFAC}" class="btn btn-fw btn-light btn-block"  role="button" >
								Ver Pdf <i style="float: right; line-height: 22px;" class="fal fa-file-invoice"></i>
							</a>
						{/if}
					</div>
				</div>
			</div>

			<table class="table fadeIn animate table-responsive table-hover mt-3">
				<thead class="thead-light">
					<tr>
						<th scope="col"></th>
						<th scope="col">Artículo</th>
						<th scope="col">Descripción</th>
						{#if showPriceInInvoices==true}
							<th scope="col">Precio</th>
						{/if}
						<th scope="col">Cantidad</th>
						{#if showPriceInInvoices==true}
							<th scope="col">Total</th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#if invoice.lines}
						{#each invoice.lines as line}

								<tr style="" on:click={()=>onSelectLine(line)}>
									<td style="min-width:100px; width:100px;">
										{#if line.ARTLFA && line.CANLFA}
											<div class="thumb-image media text-center">
												<img
												src="/api/image/150/{line.ARTLFA}"
												alt="Imagen de la referéncia {line.ARTLFA}"
												style="width:90%;"
												class="align-self-center mr-0" />
											</div>
										{/if}
									</td>
									<td>{line.ARTLFA}</td>
									<td>{line.DESLFA}</td>
									{#if showPriceInInvoices==true}
										<td>{line.CANLFA!=0?formatCurrency(line.PRELFA):''}</td>
									{/if}
									<td class="text-center">{line.CANLFA!=0?line.CANLFA:''}</td>
									{#if showPriceInInvoices==true}
										<td>{line.CANLFA!=0?formatCurrency(line.TOTLFA):''}</td>
									{/if}
								</tr>

						{/each}
					{:else}
						<div class="alert alert-danger" role="alert">
							<h4 class="alert-heading">Error al recibir información!</h4>
							<hr>
							<p class="mb-0">Recargue la página y si el problema persiste contacte con {contactEmail}.</p>
						</div>
					{/if}
				</tbody>
			</table>
			<ModalDetails items="{items}" selected="{lineSelected}"></ModalDetails>
		{:catch error}
			<div class="alert alert-danger" role="alert">
					<h4 class="alert-heading">Error al recibir información!</h4>
				{error.message}
				<hr>
				<p class="mb-0">Recargue la página y si el problema persiste contacte con {contactEmail}.</p>
			</div>
		{/await}
	</section>
</main>

<style lang="scss">
	.btn-fw{
		background-color: #FF2300;
		color: #f8f9fa;
		&:hover{
			background-color: #e61d00;
		}
	}
	.align-bottom{
		bottom:0px; position:absolute;
	}
	.table td, .table th {
     padding: 5px ;
     vertical-align: middle;
}
</style>
