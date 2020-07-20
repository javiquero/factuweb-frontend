<script>
    import { siteName } from "@/config";
	import TableOrders from "@/components/tableOrders.svelte"
	import TableInvoices from "@/components/tableInvoices.svelte"
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
  	<title>{siteName} | Area privada</title>
  	<meta data-hid="description" name="description" content="Area privada de {siteName}" />
	<meta data-hid="og:title" name="og_title" content="Area privada de {siteName}" />
</svelte:head>

<div class="container" style="margin-top: 50px;">
  <div class="row">
    <div class="col text-center">
      <h2 class="welcome" >Bienvenido a {siteName}</h2>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <TableOrders max="5" title="Mis últimos pedidos" ></TableOrders>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col">
      <TableInvoices max="5" title="Mis últimas facturas" ></TableInvoices>
    </div>
  </div>
</div>





