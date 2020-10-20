<script>
	import Pretable from "./preTable.svelte";
	import { get } from "./../lib/api";
	import { formatDate, formatCurrency} from "./../lib/functions";
	import { contactEmail } from "../config";
	import { stores, goto } from "@sapper/app";
	const { session} = stores();

	let orders = [];
	export let max = undefined;
	export let title = "Pedidos";

	function onSelectLine(o){
		goto("/private/account/orders/" + o.YEAR + "-" + o.TIPPCL + "-" + o.CODPCL);
	}

	function getOrders() {
		return new Promise(async (resolve, reject) => {
			try {
				if (max==undefined) max=100000;
				let o = await get("orders/list/"+max, undefined ,$session.token);
				await Promise.all(o.map(async (order) => {
					order.PEND=0;
					await Promise.all(order.lines.map(async (line) => {
						order.PEND+=line.PENLPC;
					}));
				}));
				return resolve (orders = o);
			} catch (e) {
				console.error("Orders - ", e);
				return reject (e)
			}
		});
	}

</script>

<style type="text/scss" lang="scss">
	.orders {
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

<section class="orders">
	<div class="block-title">
		<h4>{title}</h4>
	</div>
	{#await getOrders()}
		<Pretable cols="6" rows="{!max?6:4}" />
	{:then orders}
		<table class="table fadeIn table-responsivee animate table-hover">
		<thead class="thead-light">
		<tr>
		<th scope="col"></th>
		<th scope="col">Número</th>
		<th scope="col">Fecha</th>
		<th scope="col">Contenido</th>
		<th scope="col">Pendiente</th>
		<th scope="col">Entregado</th>
		</tr>
		</thead>
			<tbody>
				{#if !orders || orders.length == 0}
					<tr>
						<td colspan="6" class="text-center">
							<span>No hay ningún pedido en el histórico.</span>
							<br />
							<a type="button" href="/private/catalog/section/0" style="margin-top:50px; " class="btn btn-fw btn-primary btn-lg">
								Haz tu primer pedido
							</a>
						</td>
					</tr>
				{:else}
					{#each orders as o}
						<tr on:click={()=>onSelectLine(o)}>
							<td><a href="/private/account/orders/{o.YEAR}-{o.TIPPCL}-{o.CODPCL}"> <i class="fa fa-search" aria-hidden="true"></i></a></td>
							<td>{o.TIPPCL}-{o.CODPCL}</td>
							<td>{formatDate(o.FECPCL)}</td>
							<td>
								{o.lines.length} productos
								<!-- <br />
								{formatCurrency(o.TOTPCL)} -->
							</td>
							<td>{o.PEND} productos</td>
							<td>{o.lines.length - o.PEND} productos</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	{:catch error}
		<div class="alert alert-danger" role="alert">
				<h4 class="alert-heading">Error al recibir información!</h4>
			{error}
			<hr>
			<p class="mb-0">Recargue la página y si el problema persiste contacte con {contactEmail}.</p>
		</div>
	{/await}
	{#if max!=100000 && orders && orders.length > 0}
		<a class="sub-link" href="/private/account/orders">Ver todos mis pedidos</a>
	{/if}
</section>
