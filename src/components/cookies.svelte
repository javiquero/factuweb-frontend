<script>
	import { stores, goto } from '@sapper/app'
	const { session } = stores()

	import { fwCookies } from '@/store/cookies.js'

	async function acceptCookies(){
		let resp = await fwCookies.accept();
		$session.cookies = resp;
	}
</script>

{#if $session.cookies==undefined || $session.cookies==""}
<div class="cookies-bar">
	<div class="container">
		<div class="row">
			<div class="col">
				<i class="fal fa-cookie-bite"></i>
				<span >Usamos cookies para mejorar tu experiencia de usuario. <a href="/cookies" class="">Más información</a></span>
				<button type="button" on:click={acceptCookies} class="btn btn-dark">Aceptar</button>
			</div>
		</div>
	</div>

</div>
{/if}

<style lang="scss">
	.cookies-bar{
		width:100%;
		padding: 10px;
		background-color: rgb(225,240,250);
    	box-shadow: rgba(0, 0, 0, 0.05) 0px 1px inset;
		font-size: 16px;
		a{
			color:black;
			text-decoration: underline;
		}
		span{
			line-height: 40px;
		}
		button{
			float:right;
		}
	}
</style>
