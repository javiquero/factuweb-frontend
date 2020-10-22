<script context="module">
  export async function preload(page, session) {

  }
</script>

<script>
  	import { siteName, showOrders, showInvoices } from "@/config";
	import TableOrders from "@/components/tableOrders.svelte"
	import TableInvoices from "@/components/tableInvoices.svelte"
</script>

<svelte:head>
  <title>{siteName}</title>
</svelte:head>


<main>
	<section class="background-logoo" style="opacity: 0.7;">

  <div class="row">
    <div class="col">
	{#if showOrders==true}
      <TableOrders max="5" title="Mis últimos pedidos" ></TableOrders>
	  {/if}
    </div>
  </div>
  <div class="row mt-5">
    <div class="col">
	{#if showInvoices==true}
      <TableInvoices max="5" title="Mis últimas facturas" ></TableInvoices>
	   {/if}
    </div>
</div>

	</section>
</main>

