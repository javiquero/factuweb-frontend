

<script>
	import { cart } from "@/store/cart.js";
	import { siteName, contactEmail } from "@/config";
	import Pretable from "@/components/preTable.svelte";
	import Pretext from "@/components/preText.svelte";
	import AddCart from "@/components/addCart.svelte";
	import DelCart from "@/components/delCart.svelte";
	import { formatDate, formatCurrency} from "@/lib/functions";

	import ModalDetails from "@/components/modalDetails.svelte";

	let lineSelected = undefined;
	let items = undefined;

	let total = 0;
	$: calcTotal($cart);
	$: items = $cart.items;

	function calcTotal(c){
		if (c==undefined) return;
		if (c.items.length<1) window.location.href = '/private'
		total = 0;
		c.items.forEach(element => {
			total += parseFloat(element.qty) * (parseFloat(element.price.clientPrice));
		});


		// return formatCurrency(total);
	}

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
				<div class="col-6 ">
					<div class="block-title">
						<h1>Contenido del carro</h1>
					</div>
					<div class="block-subtitle align-bottom text-justify">
						<h2>Comprueba el contenido de tu carro de la compra y finaliza el pedido cuando tengas en tu carro todos los productos. Recuerda que el envío será gratuito cuando superes un importe mínimo de 200€. </h2>
					</div>
				</div>
				<div class="col-6 text-right">
					<div class="" style="max-width:220px; width:220px; float:right;">
						<button href="" class="btn btn-fw btn-light btn-block" role="button" >
							Descargar imagenes <i style="float: right; line-height: 22px;" class="fal fa-images"></i>
						</button>
						<button class="btn btn-fw btn-light btn-block" type="button" data-toggle="modal" data-target="#ModalRemoveCart" >
							Vaciar carro <i style="float: right; line-height: 22px;" class="fal fa-shopping-basket"></i>
						</button>
						<button class="btn btn-success  btn-block" disabled type="button" >
							Terminar pedido <i style="float: right; line-height: 22px;" class="fal fa-shopping-basket"></i>
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
						<th scope="col" class="text-right">Precio</th>
						<th scope="col" class="text-center">Cantidad</th>
						<th scope="col" class="text-right">Total</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{#if $cart.items}
						{#each $cart.items as line}
							<tr style="" on:click={()=>onSelectLine(line)}>
								<td style="min-width:100px; width:100px;padding:5px;">
									<div class="thumb-image media text-center">
									{#if line.CODART && line.qty}
										<img
										src="/api/image/150/{line.CODART}"
										alt="Imagen de la referéncia {line.CODART}"
										style="width:90%;"
										class="align-self-center mr-0" />
										{/if}
									</div>
								</td>
								<td>{line.CODART}</td>
								<td>{line.DESART}</td>
								<td class="text-right">{#if line.price}{formatCurrency(line.price.clientPrice)}{/if}</td>
								<td class="text-right"><AddCart fart="{line}"  showCant="{true}"/></td>
								<td class="text-right">{totLine(line)}</td>
								<td>
									<DelCart item="{line}"></DelCart>
								</td>
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

	</section>

</div>
</main>

<style  lang="scss">
	.table td, .table th {
		padding: 5px ;
		vertical-align: middle;
	}

</style>
