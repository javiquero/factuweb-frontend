<script>
    import { siteName, showOrders, showInvoices } from "@/config";
	import TableOrders from "@/components/tableOrders.svelte"
	import TableInvoices from "@/components/tableInvoices.svelte"
	import { stores	} from "@sapper/app";
	const { session } = stores();


</script>

<style>
	.welcome{
		display:inline-block;
		padding-bottom: 10px;
		font-weight: 300;
		margin-bottom:30px;
	}
</style>

<svelte:head>
  	<title>{$session.info.NOMEMP || siteName} | Area privada</title>
  	<meta data-hid="description" name="description" content="Area privada de {$session.info.NOMEMP || siteName}" />
	<meta data-hid="og:title" name="og_title" content="Area privada de {$session.info.NOMEMP || siteName}" />
</svelte:head>

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





