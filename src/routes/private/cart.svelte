<script context="module">
		export async function preload(page, session, query) {

		}
	</script>

<script>
	import { cart } from "@/store/cart.js";
	import { siteName, contactEmail } from "@/config";

	import Pretable from "@/components/preTable.svelte";
	import Pretext from "@/components/preText.svelte";
	import AddCart from "@/components/addCart.svelte";
	import DelCart from "@/components/delCart.svelte";
	import { onMount } from 'svelte';

	import { goto, stores } from "@sapper/app";
	import { formatDate, formatCurrency} from "@/lib/functions";

	import ModalDetails from "@/components/modalDetails.svelte";

	let lineSelected = undefined;
	let items = undefined;

	let total = 0;
	$: total = calcTotal(items);
	$: items = $cart.items;

	function calcTotal(items){
		if (items==undefined || items==[]) return;
		//
		let total = 0;
		items.forEach(element => {
			total += parseFloat(element.qty) * (parseFloat(element.price.clientPrice));
		});
		return formatCurrency(total);
	}

	onMount(async () => {
		if (items.length<1) goto('/private')
		window.$("#ModalFinaliceOrder").appendTo("body");
	});

	function onSelectLine(item){
		if (item.CODART){
			lineSelected= item;
		}
	}

	function totLine(element){
		return formatCurrency(parseFloat(element.qty) * (parseFloat(element.price.clientPrice)));
	}

	function deleteItem (){
		item.type=0;
		cart.set({item:item, qty: 0});
	}

	function prevent(event){
		event.preventDefault();
		event.stopPropagation();
	}

	function finishOrder(){

	}

</script>


<svelte:head>
  <title>{siteName} - Pedido en curso</title>
</svelte:head>

<main>
<div class="container">
	<section style="margin-top: 0px;">
		<nav aria-label="breadcrumb" class="mb-3">
			<ol class="breadcrumb">
				<li class="breadcrumb-item active" aria-current="page">Carro</li>
			</ol>
		</nav>


			<div class="row">
				<div class="col-sm-6 ">
					<div class="block-title">
						<h1>Contenido del carro</h1>
					</div>
					<div class="block-subtitle align-bottom text-justify">
						<h2>Comprueba el contenido de tu carro de la compra y finaliza el pedido cuando tengas en tu carro todos los productos. Recuerda que el envío será gratuito cuando superes un importe mínimo de 200€. </h2>
					</div>
				</div>
				<div class="col-sm-6 text-right">
					<div class="" style="max-width:220px; width:220px; float:right;">
						<a href="/api/image/download/cart" class="btn btn-fw btn-light btn-block" role="button" >
							Descargar imagenes <i style="float: right; line-height: 22px;" class="fal fa-images"></i>
						</a>
						<button class="btn btn-fw btn-light btn-block" type="button" data-toggle="modal" data-target="#ModalRemoveCart" >
							Vaciar carro <i style="float: right; line-height: 22px;" class="fal fa-shopping-basket"></i>
						</button>
						<button class="btn btn-success  btn-block" type="button" data-toggle="modal" data-target="#ModalFinaliceOrder"  >
							Terminar pedido <i style="float: right; line-height: 22px;" class="fal fa-shopping-basket"></i>
						</button>
					</div>
				</div>
			</div>

			<table class="table fadeIn animate table-responsive table-hover mt-3">
				<thead class="thead-light">
					<tr>
						<th scope="col"></th>
						<th scope="col">Artículo</th>
						<th scope="col">Descripción</th>
						<th scope="col" class="text-right">Precio</th>
						<th scope="col" class="text-center">Cantidad</th>
						<th scope="col" class="text-right">Total</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{#if $cart.items}
					{#if $cart.items.length>0}
						{#each $cart.items as line}
							<tr on:click={()=>onSelectLine(line)}>
								<td style="min-width:100px; width:100px;padding:5px;">
									<div class="thumb-image media text-center">
									{#if line.CODART && line.qty}
										<img
										src="/api/image/150/{line.IMGART}"
										alt="Imagen de la referéncia {line.CODART}"
										style="width:90%;"
										class="align-self-center mr-0" />
										{/if}
									</div>
								</td>
								<td>{line.CODART}</td>
								<td>
									{#if line.CE1ART != "" && line.CE1ART != undefined}
										<div class="mod">{line.CE1ART}</div>
									{/if}
									{line.DESART}
								</td>
								<td class="text-right">{#if line.price}{formatCurrency(line.price.clientPrice)}{/if}</td>
								<td class="text-right"><AddCart fart="{line}"  showCant="{true}"/></td>
								<td class="text-right">{totLine(line)}</td>
								<td>
									<DelCart item="{line}"></DelCart>
								</td>
							</tr>


						{/each}
						<tr style="line-height:70px;height:70px;" >
							<td colspan="5" class="text-right"> <small>(sin impuestos)</small> </td>
							<td colspan="2" class="text-right"><h4>Total: {total}</h4></td>
						</tr>
					{:else}
					<tr style="line-height:70px;height:70px;" >
							<td colspan="7" class="text-center"><h1>Tu carro está vacío</h1>
							</td>
					</tr>
					{/if}
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

	</section>

<!-- Modal -->
	<div class="modal fade" id="ModalFinaliceOrder" tabindex="-1" role="dialog" aria-labelledby="ModalFinaliceOrderTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="ModalFinaliceOrderTitle">
						<svg style="width:30px; height:30px;" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="exclamation-triangle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-exclamation-triangle fa-w-18 fa-3x"><g class="fa-group"><path fill="#ccc" d="M569.52 440L329.58 24c-18.44-32-64.69-32-83.16 0L6.48 440c-18.42 31.94 4.64 72 41.57 72h479.89c36.87 0 60.06-40 41.58-72zM288 448a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm38.24-238.41l-12.8 128A16 16 0 0 1 297.52 352h-19a16 16 0 0 1-15.92-14.41l-12.8-128A16 16 0 0 1 265.68 192h44.64a16 16 0 0 1 15.92 17.59z" class="fa-secondary"></path><path fill="white" d="M310.32 192h-44.64a16 16 0 0 0-15.92 17.59l12.8 128A16 16 0 0 0 278.48 352h19a16 16 0 0 0 15.92-14.41l12.8-128A16 16 0 0 0 310.32 192zM288 384a32 32 0 1 0 32 32 32 32 0 0 0-32-32z" class="fa-primary"></path></g></svg>
						<span style="margin-left: 10px;margin-top: 5px; position: absolute;">Atención</span>
					</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					¿ Deseas dar por finalizado el pedido ?<br/>
					<small>Esta acción es irreversible</small>
				</div>
				<div class="modal-footer" style="border-top:none;">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
					<button type="button" class="btn btn-success" data-dismiss="modal" on:click="{finishOrder}">Si, finalizar</button>
				</div>
			</div>
		</div>
	</div>
</div>
</main>

<style  lang="scss">
	.table td, .table th {
		padding: 5px ;
		vertical-align: middle;
		.mod {
			display: inline-block;
			font-family: roboto, serif;
			background-color: #28a745;
			padding: 0.2rem 0.8rem;
			border-radius: 3px;
			color: #fff;
			font-weight: bold;
			padding-top: 4px;
			}
	}

</style>
