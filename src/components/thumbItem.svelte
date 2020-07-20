<script>
	export let fart = {}
	export let CODART = ''

	import AddCart from "./addCart.svelte";
	import { formatCurrency } from './../lib/functions'

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { cart } from "./../store/cart.js";

	import { stores } from "@sapper/app"
	const { session } = stores()



 	let qty = 0
	let inCart = false;
  	$:product = getProduct(fart)

	$:inCart = isInCart($cart)
	function isInCart(x){

		let found = x.items.find(element => element.CODART == fart.CODART);
		if (!found ) return false;
		return true;
	}
	function onSelect(){
		 dispatch('select', fart);
	}

	async function getProduct() {
		return new Promise(async (resolve, reject) =>{
			if (fart != {} && fart != undefined) return resolve (fart);

			try {
				data = await get(`fart/${CODART}"`,"",$session.token);
				if (data && data.length > 0) response = data[0]
				return resolve (data);
			} catch (e) {
				console.error("Load section - ", e);
				return reject (e)
			}
		});
	}

  let showCant = false
  function toggleQty() {
    showCant = !showCant
  }
</script>


<div class="fw-thumb-product">
	<div class="card">
		<div class="card-body fw-card-body  " class:incart="{inCart === true}">
			{#await product}
				<h3>Cargando... espera</h3>
			{:then product}
				{#if !product || product == {}}
					<h3>
						Error! ha sido imposible recuperar la información del producto
					</h3>
				{:else}
					<div class="row" on:click="{onSelect}">
						<div class="col pl-2 pr-2" style="font-size:14px; height: 30px; overflow-y: hidden">
							<div class="bold description" >
								{product.DESART}
							</div>
						</div>
					</div>
					<div class="row" on:click="{onSelect}">
						<div class="col pl-2 pr-2 mb-2">
						<div  class="ref bold">{product.CODART}</div>
						</div>
					</div>
					<div class="row" on:click="{onSelect}">
						<div class="col col-xs-6 pl-2 pr-1">
							<div class="thumb-image media text-center">
								<img
								src="/api/image/150/{product.CODART}"
								alt="Imagen de la referéncia {product.CODART}"
								style="width:90%;"
								class="align-self-center mr-3" />
							</div>
						</div>
						<div class="col col-xs-6 pl-1 pr-2" on:click="{onSelect}">
							<div  class="packing">
								<div class="packing-title">Embalaje</div>
								<div class="mini-box">
									<img src="/img/mini-box.png" alt="" />
									<span class="bold">{product.UELART}</span>
									unidades
								</div>
								{#if product.UPPART != 0 && product.UPPART != product.UELART}
									<div class="big-box">
										<img src="/img/big-box.png" alt="" />
										<span class="bold">{product.UPPART}</span>
										unidades
									</div>
								{:else}
									<div class="big-box">
										<span class="bold">&nbsp;</span>
									</div>
								{/if}
							</div>
							<div class="prices">
								<div class="price-top">
                					{#if product.price.dto>0}
									  <div class="price brut">
										  Precio bruto:
										  <span class="bold">{formatCurrency(product.price.price)}</span>
									  </div>
										<div class="price remise">
										  Descuento:
										<span class="bold">{product.price.dto} %</span>
										</div>
									{/if}
								</div>

								<div class="price net bold">
									<div>Precio neto</div>
									{formatCurrency(product.price.clientPrice)}
								</div>
							</div>
						</div>
					</div>
					<AddCart fart="{product}"></AddCart>
				{/if}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		</div>
	</div>
</div>


<style lang="scss">
.incart{
	background-color: aliceblue; //linen
}
  .fw-card-body {
    padding-top: 5px;
  }
  .bold {
    font-weight: bold;
  }
  .fw-thumb-product {
    margin-bottom: 20px;
    font-size: 14px;

	&:hover{
        cursor: pointer;
		transition: 0.2s;
		box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
		.thumb-image {
			img {
				transition: transform 0.2s;
        		transform: scale(1.1);
      		}
		}
	}

	.description {
		white-space: nowrap;
		overflow: hidden;
		font-weight: bold;
		text-overflow: ellipsis;
	}

    .ref {
      display: inline-block;
      font-family: roboto, serif;
      background: #103f74;
      background-color: #ff2300;
      padding: 0.2rem 0.8rem;
      border-radius: 3px;
      color: #fff;
      font-weight: 600;
      padding-top: 4px;
    }

    .fwcol {
      padding: 0px;
    }

    .thumb-image {
      background-color: white;
      width: 100%;
      height: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }

    .packing {
    //   text-align: center;
	  margin-left:15px;

      .packing-title {
        margin: 0 0 5px;
        border-bottom: 1px solid #ccc;
        display: inline-block;
        padding: 0 40px 0 0;
      }

      .mini-box {
        // margin: 0 0 0 4px;
        line-height: 1;
        img {
          margin-right: 4px;
          width: 13px;
        }
      }
      .big-box {
        margin: 5px 0 21px;
        line-height: 1;
        img {
          width: 16px;
        }
      }
    }
    .prices {
      line-height: 1.1;
      margin: 10px 0 0;
      font-family: roboto, sans-serif;
      text-align: center;
      .price-top {
        height: 37px;
        .brut {
          height: 18px;
        }
      }
      .net {
        padding: 5px 4px;
        text-align: center;
        font-weight: 700;
        font-size: 26px;
        line-height: 1.2;
        color: #ffffff;
        background: #103f74;
        margin: 5px 0;
        position: relative;
        div {
          font-size: 12px;
        }
      }
    }
  }
</style>
