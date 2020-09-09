<!-- // SAPPER preLoad Section -->
	<script context="module">
		export async function preload(page, session, query) {
			const { invoice } = page.params;
			return {numInvoice: invoice	};
		}
	</script>
<!-- // End SAPPER preLoad Section -->

<script>
	import Pretable from "./../../../../components/preTable.svelte";
	import Pretext from "./../../../../components/preText.svelte";
	// import DetailsItem from "./../../../../components/detailsItem.svelte";
	// import AddCart from "./../../../../components/addCart.svelte";
	import { siteName, contactEmail } from "./../../../../config";
	import ModalDetails from "@/components/modalDetails.svelte";

	import { formatDate, formatCurrency} from "./../../../../lib/functions";
	import { get } from "../../../../lib/api";
	import { stores } from "@sapper/app";
	const { session} = stores();

	let invoice = [];
	let items = [];
	export let title = "Detalle de factura";
	export let numInvoice=undefined;

	let lineSelected = undefined;
	function onSelectLine(line){
		if (line.info.CODART && line.info.IMGART ){
			lineSelected= line.info;
		}
	}

	function getInvoice() {
			return new Promise(async (resolve, reject) => {
			try {
				let o = await get(`ffac/${numInvoice}`,"",$session.token);
				items = [];
				await Promise.all(o.lines.map(item => {if (item.info) item.info.idx=item.POSLFA; if (item.info.CODART && item.info.IMGART ) items.push(item.info)}))
				return resolve (invoice = o);
			} catch (e) {
				console.error("Invoice - ", e);
				return reject (e)
			}
		});
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
				<div class="col-6 ">
					<div class="block-title">
						<Pretext />
					</div>
					<div class="block-subtitle align-bottom">
						<Pretext />
					</div>
				</div>
				<div class="col-6 text-right">
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
				<div class="col-6 ">
					<div class="block-title">
						<h1>{title}</h1>
					</div>
					<div class="block-subtitle align-bottom">
						<h2>Factura {invoice.TIPFAC}-{invoice.CODFAC} del {formatDate(invoice.FECFAC)}</h2>
					</div>
				</div>
				<div class="col-6 text-right">
					<div class="" style="max-width:220px; width:220px; float:right;">
						<button class="btn btn-fw btn-light btn-block" disabled type="button" >
							Descargar imagenes <i style="float: right; line-height: 22px;" class="fal fa-images"></i>
						</button>
						<button class="btn btn-fw btn-light btn-block" disabled type="button" >
							Añadir todo al carro <i style="float: right; line-height: 22px;" class="fal fa-shopping-basket"></i>
						</button>
						<button class="btn btn-fw btn-light btn-block" disabled type="button" >
							Ver Pdf <i style="float: right; line-height: 22px;" class="fal fa-file-invoice"></i>
						</button>
					</div>
				</div>
			</div>

			<table class="table fadeIn animate table-hover mt-3">
				<thead class="thead-light">
					<tr>
						<th scope="col"></th>
						<th scope="col">Artículo</th>
						<th scope="col">Descripción</th>
						<th scope="col">Precio</th>
						<th scope="col">Cantidad</th>
						<th scope="col">Total</th>
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
									<td>{line.CANLFA!=0?formatCurrency(line.PRELFA):''}</td>
									<td class="text-center">{line.CANLFA!=0?line.CANLFA:''}</td>
									<td>{line.CANLFA!=0?formatCurrency(line.TOTLFA):''}</td>
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
