<script context="module">
	export async function preload(page, session) {
		// if (localStorage.getItem('fw-token')) {console.log("logado");}else{console.log("nologado");}
	}
</script>

<script>
	import { stores	} from "@sapper/app";
	const {
		preloading,
		page,
		session
	} = stores();

	import "./_app.scss";
	import { siteName } from "./../config";
	import { auth } from "./../store/auth.js";
	import TopbarCart from "./../components/topbarCart.svelte";
	import TopbarSearch from "./../components/topbarSearch.svelte";
	import Footer from "./../components/footer.svelte";

	let searchText ="";

	function logout() {
		$session.user = {};
		$session.token = undefined;
		auth.logout();
	}


</script>

<nav class="navbar fixed-top topnavbar navbar-expand-md navbar-light bg-light">
	<a class="navbar-brand" href="/">
		<img src="/logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
		<span class="logo">{siteName}</span>
	</a>

	{#if $session.token}
		<ul style="display:inline-block" class="navbar-nav mr-auto w-100 text-center d-none d-md-block">
			<li class="nav-item" style="max-width:500px; width:100%; display:inline-block">
				<TopbarSearch bind:value={searchText}></TopbarSearch>
			</li>
		</ul>
		<ul class="navbar-nav " style="flex-direction: unset;">
			<li class="nav-item mr-3 dropdown  ">
				<a class="nav-link dropdown-toggle fw-my-account-button" style="" href="null" id="navbarDropdown" role="button" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">
					Mi cuenta
				</a>
				<div class="dropdown-menu dropdown-menu-right" style="position: absolute;" aria-labelledby="navbarDropdown">
					<a class="dropdown-item" href="/private/account/">Ir a mi cuenta</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="/private/account/items">Mis artículos</a>
					<a class="dropdown-item" href="/private/account/invoices">Mis facturas</a>
					<a class="dropdown-item" href="/private/account/orders">Mis pedidos</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" on:click={logout} href="{null}">Desconectar</a>
					<div class="dropdown-divider"></div>
					 <a class="dropdown-item disabled" href="null" tabindex="-1" aria-disabled="true" style="font-size: 12px; font-style: italic;">{$session.user.NOCCLI}</a>
				</div>
			</li>
			<TopbarCart></TopbarCart>
		</ul>
	{:else}
		<!-- <div class="navbar-nav mr-auto " id="navbarSupportedContent"> -->
			<ul class="navbar-nav nav ml-auto justify-content-end">
				<li class="nav-item">
					<a class="nav-link" href="/login">Entrar</a>
				</li>
			</ul>
		<!-- </div> -->
	{/if}
</nav>

<!-- <nav class="navbar navbar-dark bg-dark" style="margin-top: 57px;">
		<div class="navbar-header">
			<ul class="nav navbar-nav mr-auto" style="display:inline-block">
				<li class="nav-item" style="max-width:500px; width:100%; display:inline-block">
					<TopbarSearch></TopbarSearch>
				</li>
			</ul>
		</div>
	</nav> -->


<div class="pageContent">
{#if $session.token}
	<div  class="secondarytopbar d-block d-md-none">
		<div style="max-width:500px; width:100%;  display: inline-block;">
			<TopbarSearch bind:value={searchText}></TopbarSearch>
		</div>
	</div>
	<div class="d-block d-md-none" style="height:49px;"></div>
	{/if}
  <slot />
</div>
<Footer></Footer>

<style  lang="scss">
.topnavbar {
	// position: fixed;
    // width: 100%;
	// z-index: 1;
	.fw-my-account-button2{
		border: 1px solid #103f74;
		background-color: #103f74;
		color: white;
		border-radius: 100px;
		padding: 6px 20px;
		margin-top: 5px;
	}
	.fw-my-account-button{
		// border: 1px solid #103f74;
		// background-color: #103f74;
		// color: white;
		// border-radius: 100px;
		// padding: 6px 20px;
		// margin-top: 5px;
	}
    .logo {
        font-family: 'Paytone One';
        font-weight: 400;
        font-style: normal;
		font-size: 25px;
		line-height: 25px;
        color: rgba(0, 0, 0, 0.6);
    }
    .navbar-brand {
		margin-left: 30px;
		line-height: 1;

    }
}

@media only screen and (max-width: 600px) {
		.topnavbar	.navbar-brand {
				margin-left: 0px !important;
			}
		}
.topnavbar.navbar.bg-light {
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	background-color:rgba(255,255,255,0.72) !important;
    border-bottom: 1px solid #eee;
	margin-bottom: -57px;
}
.secondarytopbar{
	position: fixed;
    top: 62px;
    right: 0;
    left: 0;
	z-index: 10;
	text-align:center;
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	background-color:rgba(255,255,255,0.72) !important;
    border-bottom: 1px solid #eee;
	margin-bottom: 57px;
	padding: 5px 0;
}
.pageContent{
	// height:100%;
	min-height: 80%;
	padding-top: 62px;
}


</style>
