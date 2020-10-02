<div >
	<div class="row row-cols-1 row-cols-lg-2 ">
		{#await getAddress()}
			<div class="col mb-3">
				<Precard  />
			</div>
			<div class="col mb-3">
				<Precard  />
			</div>
		{:then orders}
			<div class="col mb-3">
				<div class="card">
					<div class="card-header">Dirección facturación</div>
					<div class="card-body">
						<div>{info.NOFCLI||''}</div>
						<div>{info.DOMCLI||''}</div>
						<div>{info.CPOCLI||''} - {info.POBCLI||''}</div>
						<div>{info.PROCLI||''}</div>
					</div>
				</div>
			</div>
			{#if !info.address || info.address.length == 0}
				<div class="col mb-3">
					<div class="card">
						<div class="card-header">Dirección entregas</div>
						<div class="card-body">
							<div>{info.NOFCLI||''}</div>
							<div>{info.DOMCLI||''}</div>
							<div>{info.CPOCLI||''} - {info.POBCLI||''}</div>
							<div>{info.PROCLI||''}</div>
						</div>
					</div>
				</div>
			{:else}
				{#each info.address as a}
					<div class="col mb-3">
						<div class="card">
							<div class="card-header">Dirección entregas</div>
							<div class="card-body">
								<div>{a.NOMOBR||''}</div>
								<div>{a.DIROBR||''}</div>
								<div>{a.CPOOBR||''} - {a.POBOBR||''}</div>
								<div>{a.PROOBR||''}</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		{:catch error}
			<div class="alert alert-danger" role="alert">
				 <h4 class="alert-heading">Error al recibir información!</h4>
 				{error.message}
				<hr>
				<p class="mb-0">Recargue la página y si el problema persiste contacte con info@miemail.com.</p>
			</div>
		{/await}
	</div>
</div>

<script>
	import Precard from "@/components/preCard.svelte";
	import { get } from "@/lib/api";
	import { formatDate, formatCurrency} from "@/lib/functions";
	import { stores } from "@sapper/app";
	const { session} = stores();

	let info = [];

	async function getAddress() {
		return new Promise(async (resolve, reject) => {
			try {
				let c = await get(`client/addresses`,undefined ,$session.token);
				if (!c || c.length<1) return reject(new Error('Imposible recuperar información del cliente.'));
								return resolve(info = c);
			} catch (e) {
				return reject(e);
			}
		});
	}

</script>



