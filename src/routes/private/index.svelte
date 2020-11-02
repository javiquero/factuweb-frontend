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
	.welcome{
		display:inline-block;
		padding-bottom: 10px;
		font-weight: 300;
		margin-bottom:30px;
	}
	.section-title{
			background-color: #f5f5f7;
			width:100%;
			min-height:130px;
			padding: 30px;
			margin-bottom:20px;
		}
		a.section-link {
			color:black;
			// &:hover{
			// 	text-decoration: none;
			// }
		}
</style>


<div class="container" style="margin-top: 50px;">
  <div class="row">
    <div class="col text-center">
      <h2 class="welcome" >Bienvenido a {$session.info.NOMEMP || siteName}</h2>
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
	{#if familiesData}
		{#each Object.keys(familiesData) as section}
			{#if section}
				<section>
					<div class="section-title" >
						<div class="container">
							<h1 class="text-center">
								<strong><i class="fad fa-images"></i> {familiesData[section].DESSEC}</strong>
							</h1>
						</div>
					</div>
				</section>
				<section >
					<div class="container">
						<dir class="row">
							{#each familiesData[section].fam as fam}
								<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3 text-center mb-5">
									<a class="section-link" href="/section/{fam.CODFAM}">
										<div style="width:90%; height:200px;  text-center ">
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
{/if}


