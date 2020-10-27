<!-- <main> -->
	<li class="nav-item dropdown topbarcart " class:active="{visible === true}">

		<a class="nav-link dropdown-toggle" href="{null}" id="cartnavbarDropdown" role="button" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<i style="font-size: 23px; padding-top:3px;" class="fal fa-shopping-basket"></i>
			<span class="badge badge-success">{$cart.items.length}</span>
		</a>

			<div class="dropdown-menu dropdown-menu-right"  style="position: absolute;padding:0px;" aria-labelledby="cartnavbarDropdown">
				<a href="/private/cart" class="dropdown-menu-title" >
					Ver el carro - {total}
				</a>
				<div style="height: 300px; overflow-y: scroll;">
					<ul style="padding:5px 10px;">
						{#each $cart.items.reverse().slice(0, 50) as item }
							<CartItem item="{item}" />
						{/each}
					</ul>
				</div>
				<div class="dropdown-menu-footer" style="">
					<div class="row">
						<div class="col text-left">Portes gratis a partir de 200€</div>
						<div class="col text-right">
							<!-- <button type="button" class="btn btn-link" data-toggle="modal" data-target="#ModalRemoveCart">Vaciar el carro</button> -->
							<a href="/private/cart" type="button" class="btn btn-sm btn-success" > Ver el carro </a>
						</div>
					</div>
				</div>
			</div>

		<!-- {/if} -->

	</li>
	<!-- Modal -->
	<div class="modal fade" id="ModalRemoveCart" tabindex="-1" role="dialog" aria-labelledby="ModalRemoveCartTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="ModalRemoveCartTitle">
						<svg style="width:30px; height:30px;" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="exclamation-triangle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-exclamation-triangle fa-w-18 fa-3x"><g class="fa-group"><path fill="#ccc" d="M569.52 440L329.58 24c-18.44-32-64.69-32-83.16 0L6.48 440c-18.42 31.94 4.64 72 41.57 72h479.89c36.87 0 60.06-40 41.58-72zM288 448a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm38.24-238.41l-12.8 128A16 16 0 0 1 297.52 352h-19a16 16 0 0 1-15.92-14.41l-12.8-128A16 16 0 0 1 265.68 192h44.64a16 16 0 0 1 15.92 17.59z" class="fa-secondary"></path><path fill="white" d="M310.32 192h-44.64a16 16 0 0 0-15.92 17.59l12.8 128A16 16 0 0 0 278.48 352h19a16 16 0 0 0 15.92-14.41l12.8-128A16 16 0 0 0 310.32 192zM288 384a32 32 0 1 0 32 32 32 32 0 0 0-32-32z" class="fa-primary"></path></g></svg>
						<span style="margin-left: 10px;margin-top: 5px; position: absolute;">Atención</span>
					</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					¿ Deseas eliminar todos los productos que tienes en el carro ?<br/>
					<small>Esta acción es irreversible</small>
				</div>
				<div class="modal-footer" style="border-top:none;">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal" on:click="{removeCart}">Si, Borrar todo</button>
				</div>
			</div>
		</div>
	</div>


	<div class="modal fade" id="ModalRemoveFromCart" tabindex="-1" role="dialog" aria-labelledby="ModalRemoveFromCartTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="ModalRemoveFromCartTitle">
						<svg style="width:30px; height:30px;" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="exclamation-triangle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-exclamation-triangle fa-w-18 fa-3x"><g class="fa-group"><path fill="#ccc" d="M569.52 440L329.58 24c-18.44-32-64.69-32-83.16 0L6.48 440c-18.42 31.94 4.64 72 41.57 72h479.89c36.87 0 60.06-40 41.58-72zM288 448a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm38.24-238.41l-12.8 128A16 16 0 0 1 297.52 352h-19a16 16 0 0 1-15.92-14.41l-12.8-128A16 16 0 0 1 265.68 192h44.64a16 16 0 0 1 15.92 17.59z" class="fa-secondary"></path><path fill="white" d="M310.32 192h-44.64a16 16 0 0 0-15.92 17.59l12.8 128A16 16 0 0 0 278.48 352h19a16 16 0 0 0 15.92-14.41l12.8-128A16 16 0 0 0 310.32 192zM288 384a32 32 0 1 0 32 32 32 32 0 0 0-32-32z" class="fa-primary"></path></g></svg>
						<span style="margin-left: 10px;margin-top: 5px; position: absolute;">Atención</span>
					</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
				<div class="text-center"><strong>
				Los siguientes artículos se han eliminado de tu carro porque en estos momentos no se encuentran disponibles.
				</strong>
				</div>
					<br/><br/>
					<table>
						{#each $cart.outOfCart as item}
							<tr>
								<td style="min-width:100px; width:100px;padding:5px;">
									<div class="thumb-image media text-center">
									<img src="/api/image/150/{item.IMGART}"
										alt="Imagen de la referéncia {item.CODART}"
										style="width:90%;"
										class="align-self-center mr-0" />
									</div>
								</td>
								<td>{item.qty}</td>
								<td>{item.CODART}</td>
								<td>{item.DESART}</td>
							</tr>
						{/each}
					</table>
				</div>
				<div class="modal-footer" style="border-top:none;">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
				</div>
			</div>
		</div>
	</div>
<!-- </main> -->
<script>
import { cart } from "./../store/cart.js";
import CartItem from "./cartItem.svelte";
import { formatCurrency } from './../lib/functions'
import { onMount } from 'svelte';

onMount(async () => {
	window.$("#ModalRemoveCart").appendTo("body");
		window.$("#ModalRemoveFromCart").appendTo("body");
	window.$('.topbarcart').on('show.bs.dropdown', function (e) {
		if ($cart.items.length>0){
			visible=true;
		}else{
			e.preventDefault();
		}
	});
	window.$('.topbarcart').on('hide.bs.dropdown', function () {
		visible=false;
	});

	if ($cart.outOfCart.length>0){
		window.$("#ModalRemoveFromCart").modal();
	}
});

let visible = false;
let total = 0;
$: total = calcTotal($cart)

function calcTotal(c){
	let total = 0;
	if (c==undefined) return;
	c.items.forEach(element => {
		total += parseFloat(element.qty) * (parseFloat(element.price.clientPrice));
	});
	if (c.items.length<1 && visible) window.$('.topbarcart .dropdown-toggle').click()
	return formatCurrency(total);
}

function removeCart (){
	cart.del();
}
</script>


<style lang="scss">
@media only screen and (max-width: 600px) {
		.topbarcart	.dropdown-menu {
				max-width: 350px!important;
			}
		}
	.topbarcart {
	// 	position: absolute;
    // right: 20px;
	// top: 10px;
	    // text-align: right;
		&:hover, &.active{
			a{
			background-color: #FF2300;}
			.dropdown-toggle {color:white;}
		}
		&.active{
			a{
			background-color: #FF2300;}
			.dropdown-toggle {color:white;}
		}
		.nav-link {
				// width: fit-content;
				// display:inline-block;
			&.dropdown-toggle {
				&:after{
					content: none;
				}
			}
		}

		.dropdown-menu{
			width:500px;
			padding:0px;
			right: -1px;
			margin-top:-3px;
			.dropdown-menu-footer{
				font-size: 14px;
				height:60px;
				padding: 10px 20px;
				color: gray;
				-webkit-box-shadow: 0px -14px 18px -17px rgba(0,0,0,0.61);
				-moz-box-shadow: 0px -14px 18px -17px rgba(0,0,0,0.61);
				box-shadow: 0px -14px 18px -17px rgba(0,0,0,0.61);
				.btn-link{
					padding-top:0px;
					color: gray;
					font-size:14px;
					&:hover{
						text-decoration: none;
						color:red;
					}
				}
			};
			.dropdown-menu-title{
				height: 60px;
				font-size: 25px;
				padding: 10px 20px 0px;
				background-color: #103f74;
				color: white;
				cursor: pointer;
				font-family: 'Paytone One';
				 transition: all 0.5s;
				position: relative;
				text-align: center;
				width: 100%;
    			display: inline-block;
				&:hover{
					background-color: #FF2300;
					.dropdown-toggle {color:white;}
					padding-right: 24px;
					padding-left:8px;
				}
				&:after {
					font-size: 30px;
					content: '🠞';
					position: absolute;
					 opacity: 0;
					top: 6px;
					margin-left: -10px;
					transition: 0.5s;
				}
				&:hover:after {
					opacity: 1;
					margin-left: 10px;
				}
			}
		}
	}
</style>
