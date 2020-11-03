<!-- // SAPPER preLoad Section -->
<script context="module">
	import { get } from "@/lib/api";
	export async function preload(page, session, query) {
		if (session.token != undefined && session.token != null ) {
			return this.redirect(302, "/private/catalog");
		}else{
			let items = await get(`summary/catalog`);
			let data ={};
			await Promise.all(items.map(async item => {
				let IMG = item.IMAFAM==''?item.IMGART:item.IMAFAM;
				if (data[item.CODSEC]==undefined)
					data[item.CODSEC] = {CODSEC: item.CODSEC, DESSEC: item.DESSEC, fam:[]};
				data[item.CODSEC].fam.push({CODFAM: item.CODFAM, DESFAM: item.DESFAM, IMG:IMG});
			}));
			return {familiesData: data}
		}
	}
</script>

<script>
	import { stores	} from "@sapper/app";
	const { preloading, page, session } = stores();

	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import { siteName } from "@/config";

	export let familiesData;

</script>

<style lang="scss" >
	.list-sections{
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
		.section-title{
	margin-top: 30px;
		}


		a.section-link {
			color:black;
			text-decoration: none;
			display: block;
			background-color: #fff;
			border-radius: 5px;
			border: 1px solid rgba(195,195,195,.13);
			padding: 20px;
			height: 100%;
			-webkit-box-shadow: 0 1px 6px rgba(195,195,195,.13);
			-moz-box-shadow: 0 1px 6px rgba(195,195,195,.13);
			transition: all .3s ease;
			-webkit-transition: all .3s ease-in-out;
			&:hover{
				box-shadow: 0 6px 8px rgba(0,0,0,.13);
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


	{#if $preloading}
		<div class="row">
				<div class="col mb-3">
					<PreText></PreText>
				</div>
			<div class="col text-right">
				<PreText></PreText>
			</div>
		</div>

		<div class="row">
			{#each Array(9) as _, i}
				<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-4"><PreThumbItem /></div>
			{/each}
		</div>
	{:else}
		{#if familiesData}
			{#each Object.keys(familiesData) as section}
				{#if section}
					<section>
						<div class="section-title" >
							<div class="container">
								<h1 >
									<strong><i class="fad fa-images"></i> {familiesData[section].DESSEC}</strong>
								</h1>
							</div>
						</div>
					</section>
					<section >
						<div class="container" style="background-color: #fdfdfd;">
							<dir class="row">
								{#each familiesData[section].fam as fam}
									<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3 text-center mb-3">
										<a class="section-link" href="/section/{fam.CODFAM}">
											<div  class="row align-items-center" style="width:90%; height:200px; margin-left: 5%;">
												<img src="/api/image/1024/{fam.IMG}" alt="Imagen de la sección {fam.DESFAM}" style="max-width:100%;max-height:100%; margin-left: auto;margin-right: auto;display: block;" class="align-self-center " />
											</div>
											<h5>{fam.DESFAM}</h5>
										</a>
									</div>
								{/each}
							</dir>
						</div>
					</section>
				{/if}
			{/each}
		{/if}
	{/if}
</div>


