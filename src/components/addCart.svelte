
<script>
	import { longpress }  from "@/lib/functions";
	import { cart } from "@/store/cart.js";

	export let fart = {};
	export const variant = undefined;
	export let showCant = false;

	let qty = 0;
	$: qty = getInCart($cart);

	const onInputChange = function() {
		if(!isNaN(this.value)){
			setCartQty(parseInt(this.value));
		}else{
			this.value = 0;
		}
	};
	function getInCart(x){
		let found = x.items.find(element => element.CODART == fart.CODART);
		if (!found ) return 0;
		showCant=true;
		return found.qty;
	}

	function toggleQty() {
		showCant = !showCant;
		window.$('[data-toggle="tooltip"]').tooltip('hide')
	}
	async function add(){
		let q = qty + fart.UELART;
		setCartQty(q);
	}
	function addbox(event){
		let q = qty;;
		if (event.detail.first) q -= fart.UELART;
		q += fart.UPPART||fart.UELART;
		setCartQty(q);
	}
	function quit(){
		let q = qty - fart.UELART;
		if (q<0 )q=0;
		setCartQty(q);
	}
	function quitbox(event){
		let q = qty;
		if (event.detail.first) q += fart.UELART;
		q -= fart.UPPART||fart.UELART;
		if (q<0 )q=0;
		setCartQty(q);
	}

	function setCartQty(q){
		// console.log(`Save ${fart.CODART} ${q} pieces.`);
		fart.type=0;
		cart.set({item:fart, qty: q});
	}

	function prevent(event){
		event.preventDefault();
		event.stopPropagation();

	}
	window.$(function () {
  		window.$('[data-toggle="tooltip"]').tooltip()
	})
</script>

<style lang="scss">
	.fw-add-to-cart{
		.container-add-btn {
			margin: 7px 0px 0px;
			.btn {
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
				&.btn-cart {
					border: 2px solid #23272b;
				}

				&.btn-qty {
					// float: left;
					color: #04844b;
					font-size: 20px;
					border: 1px solid #04844b;
					-webkit-transition: all ease-in-out 0.3s;
					-moz-transition: all ease-in-out 0.3s;
					-o-transition: all ease-in-out 0.3s;
					transition: all ease-in-out 0.3s;
					&:hover {
						background: #04844b;
						color: #ffffff;
					}
				}
				&:hover {

				cursor: pointer;
				}
			}
			.input-qty {
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				-moz-appearance: textfield;
				// width: 70px;
				width: 100%;
				height: 36px;
				text-align: center;
				border: none;
				font-family: arial, sans-serif;
				background: #f3f3f3;
				float: left;
				margin: 4px 3px 0;
				-webkit-border-radius: 3px;
				-moz-border-radius: 3px;
				border-radius: 3px;
			}

			.container-switch {
				float: right;
			}
		}
	}
</style>

<div class="fw-add-to-cart">
	<div class="container-add-btn">
		{#if !showCant}
			<div class="col col-12 pr-0">
				<button type="button" style="border: 2px solid #23272b; color: #23272b" class="btn btn-outline-primary" on:click={toggleQty} data-toggle="tooltip" data-placement="right" title="Añadir al carro">
					<!-- <img src="/img/shopping-cart.png" alt="" /> -->
					<i style="font-size: 23px; padding-top:3px;" class="fal fa-shopping-basket"></i>
				</button>
			</div>
		{:else}
			<div style="text-align:end;margin-bottom: -6px;">
				<div style=" display:inline-block;"on:mousedown={quit} on:mouseup="{prevent}" on:click="{prevent}" use:longpress on:longpress={quitbox}>
					<span class="btn btn-qty">-</span>
				</div>
				<div style="display:inline-block;max-width: 80px;">
					<input type="number" style="width:100%;" bind:value={qty} on:change={onInputChange} on:mouseup="{prevent}" on:click="{prevent}" class="input-qty" />
				</div>
				<div style="padding-left:5px; display:inline-block;"on:mousedown={add} on:mouseup="{prevent}" on:click="{prevent}" use:longpress on:longpress={addbox}>
					<span class="btn btn-qty">+</span>
				</div>
			</div>
		{/if}
	</div>
</div>
