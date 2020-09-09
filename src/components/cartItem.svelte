<li class="cart-item">
	<div style="width: 110px;  display:inline-block">
		<img src="/api/image/150/{item.CODART}"
		alt="Imagen de la referéncia {item.CODART}"
		style="width:100px;"
		class="align-self-center" />
	</div>
		<div style="width: 167px; display:inline-block">
			<div class="cart-item-description">{item.DESART}</div>
			<div  class="ref ">{item.CODART}</div>
		</div>

		<div style="width: 173px; display:inline-block">
			<div><AddCart fart="{item}"  showCant="{true}"/></div>
			<div style="text-align:right; width:100%; margin-top:10px;">
				<button type="button" style="border: 2px solid red; color: #ff2300" class="btn btn-outline-primary btn-del-cart" on:mousedown={deleteItem} on:mouseup="{prevent}" on:click="{prevent}" data-toggle="tooltip" data-placement="right" title="Elimiar del carro">
					<!-- <img src="/img/shopping-cart.png" alt="" /> -->
					<i style="font-size: 23px; padding-top:3px;" class="fal fa-trash-alt"></i>
				</button>
			</div>
			<div class="cart-item-price">{formatCurrency(item.price.clientPrice)}</div>
		</div>

</li>

<script>

	export let item = undefined;

	import AddCart from "./addCart.svelte";
	import { cart } from "@/store/cart.js";
	import { formatCurrency } from '@/lib/functions'

	$:inCart = isInCart($cart)

	function isInCart(x){
		let found = x.items.find(element => element.CODART == item.CODART);
		if (!found ) return false;
		return true;
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

<style lang="scss">
	.cart-item{
		list-style: none;
		border-bottom: 1px solid #eee;
		display:flex;
		padding-top:15px;
		padding-bottom:15px;
	.btn-del-cart {
				width: 40px;
				height: 40px;
				float: right;
				-webkit-border-radius: 100%;
				-moz-border-radius: 100%;
				border-radius: 100%;
				align-items: center;
				justify-content: center;
				background: #fff;
				display: flex;
				margin-top: 3px;
				}
		.cart-item-description {
			font-weight: bold;
			font-size:14px;
		}
		.cart-item-price {
			display: inline-block;
			background: #ff2300;
			// background-color: #ff2300;
			padding: 0.2rem 0.8rem;
			border-radius: 3px;
			color: #fff;
			font-weight: bold;
			padding-top: 4px;
		}

		 .ref {
			display: inline-block;
			background: #103f74;
			// background-color: #ff2300;
			padding: 0.2rem 0.8rem;
			border-radius: 3px;
			color: #fff;
			font-weight: bold;
			padding-top: 4px;
		}
	}
</style>
