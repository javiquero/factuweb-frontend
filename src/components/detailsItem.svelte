<script>
	export let fart = {};

	import { formatCurrency } from './../lib/functions'
	import AddCart from "./addCart.svelte";
	import { showSpecialPrices } from "@/config.js";
	import { stores } from "@sapper/app"
	const { session } = stores()

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function onShowBigImage(){
		dispatch('showbigimage', fart);
	}

	let loadProduct = getProduct()
	let qty =0;
	$: { loadProduct = getProduct(fart)}
	async function getProduct() {
		if (fart != {} && fart != undefined) return (fart = fart)
	}
</script>

<div class="fw-details-product">
	<div class="container">
				{#await loadProduct}
					<h3>Cargando... espera</h3>
				{:then fart}
					{#if !fart || fart == {}}
						<h3 >
							Error! ha sido imposible recuperar las la información del producto
						</h3>
					{:else}
						<div class="row">
							<div class="col pl-2 pr-2 " style="font-size:18px; height: 30px; overflow-y: hidden;padding-left: -0px!important;">
								<div class="description">
									{fart.DESART}
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col pl-2 pr-2 mb-2">
								<div class="ref bold">{fart.CODART}</div>
								{#if fart.EANART != ""}
                					<div class="ean bold">{fart.EANART}</div>
								{/if}
								{#if fart.CE1ART != ""}
									<div class="mod bold">Modelo: {fart.CE1ART}</div>
								{/if}
							</div>
						</div>
						<div class="row">
							<div class="col-xl-8 col-lg-6 pl-2 pr-1">
							<div class="thumb-image media text-center" style="max-height:485px;height:100%;padding:10px;">
										<img on:click="{onShowBigImage}"
										src="/api/image/1024/{fart.IMGART}"
										alt="Imagen de la referéncia  {fart.CODART}{fart.CE1ART!="" ? " modelo " + fart.CE1ART: ""}"
										style="max-width:100%;max-height:100%; margin-left: auto;margin-right: auto;display: block;"
										class="align-self-center " />
									</div>
								<!-- <div class="thumb-image media text-center " style="background-image: url('/api/image/1024/{fart.CODART}'); background-size: cover;    background-size: contain;    background-repeat: no-repeat;    background-position: center;">
									<!-- <img
									src="/api/image/1024/{fart.CODART}"
									alt="Imagen de la referéncia {fart.CODART}"
									style="width:90%;"
									class="align-self-center mr-3" /> --
								</div> -->
								{#if $session.token}
									<div style="position: absolute;bottom: 0px;">
										<a href="/api/image/download/photo/{fart.IMGART}" class="btn btn-light btn-sm"  role="button" >
											Descargar imagen
										</a>
									</div>
								{/if}
							</div>
							<div class="col-xl-4 col-lg-6 pl-2 pr-2 ">
								<div class="row">
									<div class="col packing">
										<div style="border-bottom:1px solid #ccc; margin-bottom:5px;">
											Embalaje
										</div>
										<div>
											<div class="mini-box">
												<img src="/img/mini-box.png" alt="" />
												<span class="bold">{fart.UELART}</span> unidades
											</div>
											{#if fart.UPPART != 0 && fart.UPPART != fart.UELART}
												<div class="big-box">
													<img src="/img/big-box.png" alt="" />
													<span class="bold">{fart.UPPART}</span> unidades
												</div>
											{:else}
												<div class="big-box">
													<span class="bold">&nbsp;</span>
												</div>
											{/if}

											{#if fart.price && fart.price.dto > 0 && showSpecialPrices==true}
												<div class="price brut">
													Bruto:
													<span class="bold">{formatCurrency(fart.price.price)}</span>
												</div>
													<div class="price remise">
													Descuento:
													<span class="bold">{fart.price.dto} %</span>
												</div>
											{/if}
										</div>
									</div>
									<div class="col">
										<div style="border-bottom:1px solid #ccc; margin-bottom:5px;">
											Información
										</div>
										<div style="line-height: 1.3; font-size: 14px;">
											{#if fart.DIMART != ""}
												<div>Size: <span class="bold">{fart.DIMART} </span></div>
											{/if}
											{#if fart.PESART != ""}
												<div>Peso: <span class="bold">{fart.PESART}gr.</span></div>
											{/if}
										</div>

									</div>
								</div>

								<div class="prices">
								{#if $session.token}
									<div class="price-top">
									{#if fart.price && fart.price.dto > 0 && showSpecialPrices==true}
										<div class="price brut">
											Precio bruto:
											<span class="bold">{formatCurrency(fart.price.price)}</span>
										</div>
										<div class="price remise">
											Descuento:
											<span class="bold">{fart.price.dto} %</span>
										</div>
									{/if}
									</div>
									<div class="price net bold">
										{#if showSpecialPrices==true}
											<div>Precio neto</div>
											{formatCurrency(fart.price?fart.price.clientPrice:0)}
										{:else}
											<div>Precio</div>
											{formatCurrency(fart.price?fart.price.price:0)}
										{/if}
									</div>
									<AddCart fart={fart} showCant="{true}"></AddCart>
									{:else}
										<div class="price net bold">
										Entra para ver los precios
										</div>
									{/if}
								</div>
								<div class="despcritions pl-4" >
									<div class="mt-3 ">
										{#if fart.DEWART != ""  ||  fart.DLAART != ""}
											<span class="title">Descripción:</span> <br>
											{fart.DEWART || fart.DLAART}
										{/if}
									</div>
									<div class="mt-3" style="white-space: pre-wrap;">
										{#if fart.OBSART != ""}
											<span class="title">Características:</span> <br>
											{`${fart.OBSART}`}
										{/if}
									</div>
								</div>

							</div>
						</div>
					{/if}
				{:catch error}
					<p style="color: red">{error.message}</p>
				{/await}
			</div>

</div>


<style lang="scss">
.fw-details-product {
	padding-top: 5px;

	.bold {
		font-weight: bold;
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
		font-size: 16px;
		background-color: #ff2300;
		padding: 0.2rem 0.8rem;
		border-radius: 3px;
		color: #fff;
		font-weight: 600;
		padding-top: 4px;
	}

	.ean {
		display: inline-block;
		font-family: roboto, serif;
		font-size: 16px;
		background-color: #007bff;
		padding: 0.2rem 0.8rem;
		border-radius: 3px;
		color: #fff;
		font-weight: 600;
		padding-top: 4px;
	}

	.mod {
      display: inline-block;
      font-family: roboto, serif;
      background-color: #28a745;
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
		// height: 100%;
		border: 1px solid #ddd;
		border-radius: 4px;
		// overflow: hidden;

	}

	.packing {
		//   text-align: center;
		font-size: 16px;
		margin-left: 30px;

		.packing-title {
			margin: 0 0 5px;
			border-bottom: 1px solid #ccc;
			display: inline-block;
			padding: 0 80px 0 0;
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
		margin-left: 30px;

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

	.despcritions {
		font-size: 14px;

		.title {
			text-decoration: underline;
		}
	}

	.container-add-btn {
		margin: 7px 0 0;

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
				float: left;
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
			width: 70px;
			height: 36px;
			text-align: center;
			border: none;
			font-family: arial,
			sans-serif;
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

