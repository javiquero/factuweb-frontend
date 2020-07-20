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
		</div>

</li>

<script>
	export let item = undefined;

	import AddCart from "./addCart.svelte";
	function deleteItem (){

	}

</script>

<style lang="scss">
	.cart-item{
		list-style: none;
		border-bottom: 1px solid #eee;
		display:flex;
		padding-top:15px;
		padding-bottom:15px;

		.cart-item-description {
			font-weight: bold;
			font-size:14px;
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
