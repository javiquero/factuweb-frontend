<script context="module">
	export async function preload(page, session) {

	}
</script>

<script>
	import { stores	} from "@sapper/app";
	const { preloading, page, session } = stores();

	import "./_app.scss";
	import { siteName, showOrders, showInvoices, IDAnalytics, SEO } from "@/config";
	import { auth } from "@/store/auth.js";
	import { onMount } from 'svelte';
	import TopbarCart from "@/components/topbarCart.svelte";
	import TopbarSearch from "@/components/topbarSearch.svelte";
	import Footer from "@/components/footer.svelte";
	import HbarSections from "@/components/hbarSections.svelte";
	import Cookies from "@/components/cookies.svelte";


	let searchText ="";
	export let segment
	let gtag;

	$:refreshAnalytics($page);
	function refreshAnalytics(val) {
		if (typeof gtag !== "undefined"){
			gtag("config", IDAnalytics, {
				page_path: $page.path
			});
		}
	}

	function logout() {
		$session.user = {};
		$session.token = undefined;
		auth.logout();
	}

	onMount(async () => {
		document.querySelectorAll('a').forEach(a => {
			if (!a.hash || !document.querySelectorAll(a.hash).length) return
			a.addEventListener('click', event => {
				event.preventDefault()
				window.location.hash = event.target.getAttribute('href')
			event.target.scrollIntoView()
			})
		})

		window.dataLayer = window.dataLayer || [];
		gtag = function(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', IDAnalytics, { page_path: $page.path });
	});
</script>

<svelte:head>
	<title>{$session.info ? $session.info.NOMEMP: siteName || siteName}</title>
  	<meta data-hid="description" name="description" content="{SEO.description}" />
   	<meta data-hid="title" name="title" content="{SEO.title}" />

	<meta property="og:description"  data-hid="og:description" name="og:description" content="{SEO.description}" />
   	<meta property="og:title"  data-hid="og:title" name="og:title" content="{SEO.title}" />
	<meta property="og:image"  data-hid="og:image" name="og:image" content="http://{$page.host}/{SEO.image}" />
	<meta property="og:url"  data-hid="og:url" name="og:url" content="http://{$page.host}" />
	<meta property="og:locale"  data-hid="og:locale" name="og:locale" content="{SEO.locale}" />

	<script async src="https://www.googletagmanager.com/gtag/js?id={IDAnalytics}"></script>
</svelte:head>


<nav class="navbar fixed-top topnavbar navbar-expand-md navbar-light bg-light">
	<a class="navbar-brand" href="/">
		<img src="/logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
		<span class="logo">{$session.info ? $session.info.NOMEMP: siteName||siteName}</span>
	</a>
	{#if segment!="login"}
		<ul style="display:inline-block" class="navbar-nav mr-auto w-100 text-center d-none d-md-block">
			<li class="nav-item" style="max-width:500px; width:100%; display:inline-block">
				<TopbarSearch bind:value={searchText}></TopbarSearch>
			</li>
		</ul>
	{/if}
	{#if $session.token}
		<ul class="navbar-nav " style="flex-direction: unset;">
			<li class="nav-item mr-3 dropdown d-none d-sm-block">
				<a class="nav-link dropdown-toggle fw-my-account-button" style="" href="null" id="navbarDropdown" role="button" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">
					Mi cuenta
				</a>
				<div class="dropdown-menu dropdown-menu-right" style="position: absolute;" aria-labelledby="navbarDropdown">
					<a class="dropdown-item" href="/private/account/">Ir a mi cuenta</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="/private/account/items">Mis artículos</a>
					{#if showInvoices==true}
						<a class="dropdown-item" href="/private/account/invoices">Mis facturas</a>
					{/if}
					{#if showOrders==true}
						<a class="dropdown-item" href="/private/account/orders">Mis pedidos</a>
					{/if}
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" on:click={logout} href="{null}">Desconectar</a>
					<div class="dropdown-divider"></div>
					 <a class="dropdown-item disabled" href="null" tabindex="-1" aria-disabled="true" style="font-size: 12px; font-style: italic;">{$session.user.NOCCLI}</a>
				</div>
			</li>
			<TopbarCart></TopbarCart>
		</ul>
	{:else}
		<ul class="navbar-nav nav ml-auto justify-content-end">
			<li class="nav-item">
				{#if segment=="login"}
					<a class="btn btn-primary" href="/">Volver al inicio</a>
				{:else}
					<a class="btn btn-primary" href="/login">Entrar</a>
				{/if}
			</li>
		</ul>
	{/if}
</nav>

<div class="pageContent">
	{#if segment!="login"}
		<div  class="secondarytopbar d-block d-md-none">
			<div style="max-width:500px; width:100%;  display: inline-block;">
				<TopbarSearch bind:value={searchText}></TopbarSearch>
			</div>
		</div>
		<div class="d-block d-md-none" style="height:49px;"></div>
		<HbarSections />
	{/if}
	{#if $session.cookies==undefined}
		<Cookies />
	{/if}
  <slot />
</div>




<Footer></Footer>

<style lang="scss">
	@media (max-width: 540px) {
		.logo{
				font-size: 20px !important;
		}
	}

	.topnavbar {
		min-height:62px;
		height:62px;
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
		padding-top: 63px;
	}
</style>
