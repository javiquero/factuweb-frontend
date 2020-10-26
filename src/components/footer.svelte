<script>
	import { showOrders,showInvoices } from "@/config";
	import { auth } from "@/store/auth.js";
	import { stores	} from "@sapper/app";
	const {session} = stores();

	function logout() {
		$session.user = {};
		$session.token = undefined;
		auth.logout();
	}
</script>

<div class="footer">
    <div class="container">
        <div class="row justify-content-end">
            <div class="col-xs-12 col-sm-6 col-md-4">
				{#if $session.token}
					<h3 >Mi cuenta</h3>
					<ul >
						<li><a href="/private/account/address">Mis direcciones</a></li>
						<li><a href="/private/account/items">Artículos consumidos</a></li>
						{#if showOrders==true}
							<li><a href="/private/account/orders">Mis pedidos</a></li>
						{/if}
						{#if showInvoices==true}
							<li><a href="/private/account/invoices">Mis facturas</a></li>
						{/if}
						<li><a href="/private/account/agent">Contacto comercial</a></li>
						<li><a on:click={logout} href="{null}">Desconectar</a></li>
					</ul>
				{/if}
            </div>

			<div class="col-xs-12 col-sm-6 col-md-5 col-xl-4 address">
						<h3>Dónde estamos</h3>
						<div>
							<i class="fal fa-building" style="float:left"></i>
							<div style="display: inline-block">
								<span style="text-decoration: underline">{$session.info.NOMEMP||""}</span><br>
								{$session.info.DOMEMP||""}
								{$session.info.NUMEMP ? ", " + $session.info.NUMEMP: "" }
								{#if $session.info.PISEMP || $session.info.PRTEMP}
									{ $session.info.PISEMP} {$session.info.PRTEMP ? "- " + $session.info.PRTEMP: "" }
								{/if}
								{$session.info.ESCEMP || ""}
								<br>{$session.info.POBEMP||""}{$session.info.POBEMP && $session.info.CPOEMP?" · ":""}{$session.info.CPOEMP||""}
								<br>{$session.info.MUNEMP||""}{$session.info.MUNEMP && $session.info.PROEMP?" · ":""}{$session.info.PROEMP||""}
							</div>
						</div>
						<!-- </p> -->
						<p>
							{#if $session.info.TELEMP}
								 <a href="tel:{$session.info.TELEMP}"><i class="fal fa-phone"></i> Teléfono:{$session.info.TELEMP}</a><br>
							{/if}

							{#if $session.info.FAXEMP}
								<i class="fal fa-fax"></i> Fax: {$session.info.FAXEMP}<br>
							{/if}
							{#if $session.info.EMAEMP}
								<a href="mailto:{$session.info.EMAEMP}"><i class="fal fa-envelope"></i> Email: {$session.info.EMAEMP}</a>
							{/if}
						</p>
				</div>
			</div>
    </div>
</div>

<style lang="scss">
    .footer {
        margin-top: 40px;
        width: 100%;
        background-color: black;
        color: white;
        min-height: 200px;
        padding: 20px;
		font-size: 15px;
		.address{
			i{
				margin-right:20px;
			}
		}
		a{
			color:white;
			text-decoration: none;
		}
		h3{
			font-size: 24px;
			// margin-bottom:0px;
		}
		ul{
			list-style: none;
			padding-left:0px;
		}
    }

</style>
