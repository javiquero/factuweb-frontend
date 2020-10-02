<script>
	import TableInvoices from "@/components/tableInvoices.svelte"
</script>

<section >
	<nav aria-label="breadcrumb" class="mb-3">
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="/private/account">Mi cuenta</a></li>
			<li class="breadcrumb-item active" aria-current="page">Facturas</li>
		</ol>
	</nav>
	 <TableInvoices title="Mis facturas" ></TableInvoices>
</section>
