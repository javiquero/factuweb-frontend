<!-- // SAPPER preLoad Section -->
	<script context="module">
		export async function preload(page, session, query) {
			const { order } = page.params;
			return {numOrder: order	};
		}
	</script>
<!-- // End SAPPER preLoad Section -->

<script>
	import Pretable from "@/components/preTable.svelte";
	import Pretext from "@/components/preText.svelte";
	import ModalDetails from "@/components/modalDetails.svelte";

	// import AddCart from "@/components/addCart.svelte";
	import { siteName, contactEmail } from "@/config";
	import { formatDate, formatCurrency} from "@/lib/functions";
	import { get } from "@/lib/api";
	import { stores } from "@sapper/app";
	const { session} = stores();

	let order = [];
	let items = [];
	export let title = "Detalle de pedido";
	export let numOrder=undefined;

	let lineSelected = undefined;
	function onSelectLine(line){
		if (line.info.CODART && line.info.IMGART ){
			lineSelected = line.info;
		}
	}

	function getOrder() {
			return new Promise(async (resolve, reject) => {
			try {
				let o = await get(`fpcl/${numOrder}`,"",$session.token);
				items = [];
				await Promise.all(o.lines.map(item => {if (item.info) item.info.idx=item.POSLPC; if (item.info.CODART && item.info.IMGART ) items.push(item.info)}))
				return resolve (order = o);
			} catch (e) {
				console.error("Order - ", e);
				return reject (e)
			}
		});
	}

</script>

<svelte:head>
  <title>{siteName} - Pedido {order.TIPPCL}-{order.CODPCL}</title>
</svelte:head>

<main>
	<section style="margin-top: 0px;">
		<nav aria-label="breadcrumb" class="mb-3">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/private/account">Mi cuenta</a></li>
				<li class="breadcrumb-item"><a href="/private/account/orders">Pedidos</a></li>
				<li class="breadcrumb-item active" aria-current="page">Pedido</li>
			</ol>
		</nav>
		{#await getOrder()}
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
			<Pretable cols="6" rows="6" />
		{:then order}
			<div class="row">
				<div class="col-6 ">
					<div class="block-title">
						<h1>{title}</h1>
					</div>
					<div class="block-subtitle align-bottom">
						<h2>Pedido {order.TIPPCL}-{order.CODPCL} del {formatDate(order.FECPCL)}</h2>
					</div>
				</div>
				<div class="col-6 text-right">
					<div class="" style="max-width:220px; width:220px; float:right;">
						<a href="{null}" class="btn btn-fw btn-light btn-block" role="button" >
							Descargar imagenes <i style="float: right; line-height: 22px;" class="fal fa-images"></i>
						</a>
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
						<th scope="col">Estado</th>
						<th scope="col">Precio</th>
						<th scope="col">Cantidad</th>
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					{#if order.lines}
						{#each order.lines as line}
							<tr style="" on:click={()=>{onSelectLine(line)}}>
								<td style="min-width:100px; width:100px;padding:5px;">
									<div class="thumb-image media text-center">
									{#if line.ARTLPC && line.CANLPC}
										<img
										src="/api/image/150/{line.ARTLPC}"
										alt="Imagen de la referéncia {line.ARTLPC}"
										style="width:90%;"
										class="align-self-center mr-0" />
										{/if}
									</div>
								</td>
								<td>{line.ARTLPC}</td>
								<td>{line.DESLPC}</td>
								<td>{#if line.CANLPC}{line.PENLPC>0? line.PENLPC + ' Pendientes': 'Entregados'}{/if}</td>
								<td>{#if line.CANLPC}{formatCurrency(line.PRELPC)}{/if}</td>
								<td class="text-center">{#if line.CANLPC}{line.CANLPC}{/if}</td>
								<td>{#if line.CANLPC}{formatCurrency(line.TOTLPC)}{/if}</td>
							</tr>
								<!-- {:else}
								<tr style="line-height:70px;height:70px;" >
									<td colspan="7"></td>
								</tr>
							{/if} -->
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
