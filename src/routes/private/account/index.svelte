<script context="module">
  export async function preload(page, session) {

  }
</script>

<script>
  	import { siteName } from "@/config";
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
      <TableOrders max="5" title="Mis últimos pedidos" ></TableOrders>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col">
      <TableInvoices max="5" title="Mis últimas facturas" ></TableInvoices>
    </div>
</div>

	</section>
</main>

