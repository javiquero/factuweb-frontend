<script context="module">
	export async function preload(page, session) {
		if (session.token == undefined) {
			return this.redirect(302, "/");
		}
	}
</script>

<script>
	import { stores, goto } from '@sapper/app'
	import { siteName } from '@/config'

	const { session, page } = stores();
</script>


<svelte:head>
	<title>{$session.info.NOMEMP || siteName} | Zona privada</title>

	<meta data-hid="description" name="description" content="Area privada accesible únicamente por clientes · {$session.info.NOMEMP || siteName}" />
	<meta data-hid="title" name="title" content="Zona privada · {$session.info.NOMEMP || siteName}" />

	<meta data-hid="og:description" name="og:description" content="Area privada accesible únicamente por clientes · {$session.info.NOMEMP || siteName}" />
	<meta data-hid="og:title" name="og_title" content="Zona privada · {$session.info.NOMEMP || siteName}" />
</svelte:head>


<style>
	.pageContent {
    	height: 100%;
    	margin-top: -55px;
    	padding-top: 75px;
  	}
</style>

<!-- <HbarSections /> -->
<div class="pageContent">
	<slot />
</div>
