<script>
	import Pretable from "./preTable.svelte";
	import { get } from "@/lib/api";
	import { formatDate, formatCurrency} from "./../lib/functions";
	import { contactEmail } from "../config";
	import { stores, goto } from "@sapper/app";
	const { session} = stores();

	let invoices = [];
	export let max = undefined;
	export let title = "Facturas";

	function onSelectLine(o){
		goto("/private/account/invoices/" + o.YEAR + "-" + o.TIPFAC + "-" + o.CODFAC);
	}

	function getInvoices() {
		return new Promise(async (resolve, reject) => {
			try {
				if (max==undefined) max=100000;
				let o = await get("invoices/list/"+max, undefined ,$session.token);
 				// console.log(o);
				return resolve (invoices = o);
			} catch (e) {
				console.error("Invoices - ", e);
				return reject (e)
			}
		});
	}

</script>

<style type="text/scss" lang="scss">
	.invoices {
		.block-title {
			margin-bottom: 20px;
			h4 {
				font-weight: 300 !important;
			}
		}
		th {
			text-align: center;
		}
		td {
			text-align: center;
		}
		td:first-child{padding-left:0px; padding-right:0px;}
	}
</style>

<section class="invoices">
	<div class="block-title">
		<h4>{title}</h4>
	</div>
	{#await getInvoices()}
		<Pretable cols="5" rows="{!max?6:4}" />
	{:then invoices}
		<table class="table fadeIn table-responsivee animate table-hover">
		<thead  class="thead-light">
		<tr>
		<th scope="col"></th>
		<th scope="col">Número</th>
		<th scope="col">Fecha</th>
		<th scope="col">Contenido</th>
		<th scope="col">Total</th>
		<th scope="col">Vencimiento</th>
		</tr>
		</thead>
			<tbody>
				{#if !invoices || invoices.length == 0}
					<tr >
						<td colspan="6" class="text-center">
							<span>No hay ninguna factura en el histórico.</span>
							<br />
							<button type="button" href="/private/catalog" style="margin-top:50px; " class="btn btn-fw btn-primary btn-lg">
								Haz tu primer pedido
							</button>
						</td>
					</tr>
				{:else}
					{#each invoices as o}
						<tr on:click={()=>onSelectLine(o)}>
							<td><a href="/private/account/invoices/{o.YEAR}-{o.TIPFAC}-{o.CODFAC}"> <i class="fa fa-search" aria-hidden="true"></i></a></td>
							<td>{o.TIPFAC}-{o.CODFAC}</td>
							<td>{formatDate(o.FECFAC)}</td>
							<td>
								{o.lines.length} productos
							</td>
							<td>
								{formatCurrency(o.TOTFAC)}
							</td>
							<td>
								{#each o.VENFAC.split(';') as v, i}
								<!-- <div v-for="(venc, index) in it(invoice, 'VENFAC').split(';')" v-bind:key="'fecvenc' + index"> -->
									{#if i%2==0}
										{v}
									{/if}
								<!-- </div> -->
								{/each}
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	{:catch error}
		<div class="alert alert-danger" role="alert">
				<h4 class="alert-heading">Error al recibir información!</h4>
			{error.message}
			<hr>
			<p class="mb-0">Recargue la página y si el problema persiste contacte con {contactEmail}.</p>
		</div>
	{/await}
	{#if max!=100000 && invoices && invoices.length > 0}
		<a class="sub-link" href="/private/account/invoices">Ver todas mis facturas</a>
	{/if}
</section>
