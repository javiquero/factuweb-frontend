<script>
import { stores	} from "@sapper/app";
	const {session} = stores();

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
                    <li><a href="/private/account/orders">Mis pedidos</a></li>
                    <li><a href="/private/account/invoices">Mis facturas</a></li>
                    <li><a href="/private/account/agent">Contacto comercial</a></li>
                </ul>
				{/if}
            </div>

			<div class="col-xs-12 col-sm-6 col-md-5 col-xl-4">
					<h3>Dónde estamos</h3>
					<p>Geolit, Parque Científico y Tecnológico<br>Edificio Software DELSOL · 23620<br>Mengíbar · Jaén</p>
					<p>Centralita: <a href="tel:953227933">953 22 79 33</a><br>Comercial: <a href="tel:953214100">953 21 41 00</a></p>
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
