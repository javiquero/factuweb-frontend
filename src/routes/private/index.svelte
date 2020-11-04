<script context="module">
	import { get } from "@/lib/api";
	export async function preload(page, session, query) {
		let items = await get(`summary/catalog`);
		let data ={};
		await Promise.all(items.map(async item => {
			let IMG = item.IMAFAM==''?item.IMGART:item.IMAFAM;
			if (data[item.CODSEC]==undefined)
				data[item.CODSEC] = {CODSEC: item.CODSEC, DESSEC: item.DESSEC, fam:[]};
			data[item.CODSEC].fam.push({CODFAM: item.CODFAM, DESFAM: item.DESFAM, IMG:IMG});
		}));
		return {familiesData: data}
	}
</script>


<script>
    import { siteName, showOrders, showInvoices } from "@/config";
	import TableOrders from "@/components/tableOrders.svelte"
	import TableInvoices from "@/components/tableInvoices.svelte"
	import { stores	} from "@sapper/app";
	const { preloading, session } = stores();

	import FamilyList from "@/components/familyList.svelte"
</script>

<style lang="scss">
	.welcome {
		display:inline-block;
		padding-bottom: 10px;
		font-weight: 300;
	}
	.bg-head{
		margin-top: -20px;
		background-image: linear-gradient(252deg, rgba(255, 76, 65, 0.1) -21%, rgba(65, 129, 242, 0.1) 76%);
		width:100%;
		padding-top: 20px;
		padding-bottom: 50px;
		margin-bottom:30px;
	}

</style>


<div class=" bg-head">
<div class="container" style="margin-top: 50px; margin-bottom:50px; ">
  <div class="row">
    <div class="col text-center">
		<h2 class="welcome">Bienvenido a {$session.info.NOMEMP || siteName}</h2>
		<p style="max-width:500px; margin-bottom: 30px; margin-left: auto; margin-right:auto;" >Desde nuestra web no solo tienes disponible nuestro amplio catálogo de productos, además puedes consultar los artículos que ya nos has comprado con anterioridad { showOrders ==true? ', así como tu historico pedidos':''}  { showOrders ==true && showInvoices ==true? ' y ':''} { showOrders ==false && showInvoices ==true? ', asi como ':''} { showInvoices ==true? ' tus facturas':''}</p>
		<a href="/private/account/items" class="btn  btn-fw">Mis artículos</a>
		<a href="/private/account/agent" class="btn  btn-fw">Contacto comercial</a>
    </div>
  </div>
</div>
</div>


  {#if showOrders ==true}
  	<section >
						<div class="container" style="background-color: #fdfdfd;">
	<div class="row">
		<div class="col">
		<TableOrders max="5" title="Mis últimos pedidos" ></TableOrders>
		</div>
	</div>
		</div>
					</section>
  {/if}
  {#if showInvoices ==true}
  	<section >
						<div class="container" style="background-color: #fdfdfd;">
	<div class="row mt-5">
		<div class="col">
		<TableInvoices max="5" title="Mis últimas facturas" ></TableInvoices>
		</div>
	</div>
		</div>
					</section>
  {/if}


{#if showInvoices !=true && showOrders!=true}
	<FamilyList></FamilyList>
{/if}


