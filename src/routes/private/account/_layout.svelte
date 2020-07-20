<script context="module">
    export async function preload(page, session) {

    }

</script>
<script>
		import { stores	} from "@sapper/app";
		const { session, preloading } = stores();
		export let segment
</script>

<section class="private-account">
	<div class:container-fluid={segment === "items"} class:container-xl={segment != "items"}>
		<div class="row">
			<div class="col-lg-3 col-md-5 mt-5">
				<div class="card mb-3" >
					<div class="card-header text-center" style="font-size:12px">{$session.user.NOFCLI} <br/>código: {$session.user.CODCLI} </div>
					<div class="card-body text-secondary p-0">
						<div class="list-group">
							<a type="button" href="/private/account/" class="list-group-item list-group-item-action btn-secondary " class:active={segment === undefined}>
								Mi cuenta
							</a>
							<a type="button" class="list-group-item list-group-item-action btn-secondary" href="/private/account/address" class:active={segment === "address"}>Mis direcciones</a>
							<a type="button" class="list-group-item list-group-item-action btn-secondary" href="/private/account/items" class:active={segment === "items"}>Artículos consumidos</a>
							<a type="button" class="list-group-item list-group-item-action btn-secondary" href="/private/account/orders" class:active={segment === "orders"}>Mis pedidos</a>
							<a type="button" class="list-group-item list-group-item-action btn-secondary" href="/private/account/invoices" class:active={segment === "invoices"}>Mis facturas</a>
							<a type="button" class="list-group-item list-group-item-action btn-secondary" href="/private/account/agent" class:active={segment === "agent"}>Contacto comercial</a>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-9 col-md-7 mt-5">
				<slot />
			</div>
		</div>
	</div>
</section>



<style>
/* .active {
	/* border: 1px solid #103f74;
	/* background-color: #103f74;
	color: white;
} */


</style>
