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

	export let familiesData;
</script>

<style lang="scss">
	.welcome {
		display:inline-block;
		padding-bottom: 10px;
		font-weight: 300;


	}
	.section-title {
		margin-top: 30px;
		}
	.bg-head{
		margin-top: -20px;
		background-image: linear-gradient(252deg, rgba(255, 76, 65, 0.1) -21%, rgba(65, 129, 242, 0.1) 76%);
		width:100%;
		padding-top: 30px;
		padding-bottom: 50px;
	}
	a.section-link {
		color:black;
		text-decoration: none;
		display: block;
		background-color: #fff;
		border-radius: 5px;
		border: 1px solid rgba(195,195,195,.13);
		padding: 20px;
		height: 100%;
		-webkit-box-shadow: 0 1px 6px rgba(195,195,195,.13);
		-moz-box-shadow: 0 1px 6px rgba(195,195,195,.13);
		transition: all .3s ease;
		-webkit-transition: all .3s ease-in-out;
		&:hover{
			box-shadow: 0 6px 8px rgba(0,0,0,.13);
		}
	}
	.welcome-page-catalog{

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
  {#if showOrders ==true}
	<div class="row">
		<div class="col">
		<TableOrders max="5" title="Mis últimos pedidos" ></TableOrders>
		</div>
	</div>
  {/if}
  {#if showInvoices ==true}
	<div class="row mt-5">
		<div class="col">
		<TableInvoices max="5" title="Mis últimas facturas" ></TableInvoices>
		</div>
	</div>
  {/if}
</div>

{#if showInvoices !=true && showOrders!=true}
	<div class="welcome-page-catalog">
		{#if familiesData}
			{#each Object.keys(familiesData) as section}
				{#if section}
					<section>
						<div class="section-title" >
							<div class="container">
								<h1 class="">
									<strong><i class="fad fa-images"></i> {familiesData[section].DESSEC}</strong>
								</h1>
							</div>
						</div>
					</section>
					<section >
						<div class="container" style="background-color: #fdfdfd;">
							<dir class="row">
								{#each familiesData[section].fam as fam}
									<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3 text-center mb-3">
										<a class="section-link" href="/section/{fam.CODFAM}">
											<div  class="row align-items-center" style="width:90%; height:200px; margin-left: 5%;">
												<img src="/api/image/1024/{fam.IMG}" alt="Imagen de la sección {fam.DESFAM}" style="max-width:100%;max-height:100%; margin-left: auto;margin-right: auto;display: block;" class="align-self-center " />
											</div>
											<h5>{fam.DESFAM}</h5>
										</a>
									</div>
								{/each}
							</dir>
						</div>
					</section>
				{/if}
			{/each}
		{/if}
	</div>
{/if}


