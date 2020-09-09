
<script>
	import { cart } from "@/store/cart.js";

	export let item = {};

	function deleteItem (){
		item.type=0;
		cart.set({item:item, qty: 0});
	}

	function prevent(event){
		event.preventDefault();
		event.stopPropagation();
	}

	window.$(function () {
  		window.$('[data-toggle="tooltip"]').tooltip()
	})
</script>

<div class="fw-del-from-cart">
	<button type="button" style="" class="btn btn-outline-primary btn-del-cart" on:mousedown={deleteItem} on:mouseup="{prevent}" on:click="{prevent}" data-toggle="tooltip" data-placement="right" title="Elimiar del carro">
		<i style="font-size: 23px; padding-top:3px;" class="fal fa-trash-alt"></i>
	</button>
</div>

<style lang="scss">
	.fw-del-from-cart{
		.btn-del-cart{
			width: 40px;
			height: 40px;
			-webkit-border-radius: 100%;
			-moz-border-radius: 100%;
			border-radius: 100%;
			align-items: center;
			justify-content: center;
			background: #fff;
			display: flex;
			margin-top: 3px;
			border: 2px solid red;
			color: #ff2300
		}
	}
</style>
