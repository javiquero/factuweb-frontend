<script context="module">
	import { get } from "@/lib/api";
	export async function preload(page, session, query) {
		if (session.token != undefined && session.token != null ) {
			return this.redirect(302, "/private/catalog");
		}
	}
</script>

<script>
	import { goto, stores } from "@sapper/app";
	const { preloading, page, session } = stores();

	import FamilyList from "@/components/familyList.svelte"
	import { siteName } from "@/config";
</script>

<style lang="scss" >
	.list-sections{
		background-color: #fdfdfd;
		.head{
			margin-bottom:30px;
			background-image: linear-gradient(80.9deg,rgba(210,229,248,.3) 23.12%,rgba(249,201,184,.3) 91.44%),linear-gradient(102.49deg,rgba(115,175,225,.37) 0%,rgba(249,205,188,.37) 49.38%,rgba(191,235,200,.5) 100.86%);
			text-align: center;
			padding-top:30px;
			padding-bottom:30px;
			.main-logo{
				background-image: url('/logo.svg');
				height:180px;
				background-size: auto 150px;
				background-position: top center;
				background-repeat: no-repeat;
			}
			span{
				font-family: 'Paytone One';
				font-weight: 400;
				font-style: normal;
				font-size: 25px;
				line-height: 25px;
				color: rgba(0, 0, 0, 0.6);
			}
		}

	}
</style>

<svelte:head>
  	<title>{$session.info.NOMEMP || siteName} - Catálogo</title>

	<meta data-hid="description" name="description" content="Indice del catálogo de {$session.info.NOMEMP || siteName}" />
	<meta data-hid="title" name="title" content="Catálogo · {$session.info.NOMEMP || siteName}" />

	<meta data-hid="og:description" name="og:description" content="Indice del catálogo de {$session.info.NOMEMP || siteName}" />
	<meta data-hid="og:title" name="og:title" content="Catálogo · {$session.info.NOMEMP || siteName}" />
</svelte:head>


<div class="list-sections">
	<div class="head">
		<div class="main-logo" ></div>
		<span>Bienvenido a {$session.info.NOMEMP || siteName}!</span>
		<p>Explora nuestro catálogo</p>
	</div>

	<FamilyList></FamilyList>
</div>


