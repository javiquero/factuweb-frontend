<script>
	import TableOrders from "@/components/tableOrders.svelte"
</script>

<section>
	<nav aria-label="breadcrumb" class="mb-3">
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="/private/account">Mi cuenta</a></li>
			<li class="breadcrumb-item active" aria-current="page">Pedidos</li>
		</ol>
	</nav>
	 <TableOrders title="Mis pedidos"></TableOrders>
</section>
