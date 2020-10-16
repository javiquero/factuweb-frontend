
<script>

	import {get} from "@/lib/api";
	import { stores } from "@sapper/app";
	const { session} = stores();
	import { onMount } from 'svelte';

	// let promisegetSections = getSections()
	let sections = [];

	function getSections() {
		return new Promise(async (resolve, reject) =>{
			try {
				let c = await get(`catalog`);
				return resolve(c);
			} catch (error) {
				console.log(error);
				return reject(error);
			}
		});
	}

	onMount(async () => {
		sections = await getSections();
	});

</script>

<style lang="scss">
	.navbar.bg-dark {
		padding: 0px;
		display: block;
		text-align: center;
		line-height: 14px;
		background-color: #f3f3f3 !important;

		.navbar-nav .nav-link,
		.dropdown-item {
			color: #555;
			font-weight: 400;
			font-size: 12px;

		}
		.dropdown-item:focus, .dropdown-item:hover {
    		background-color: rgba(255, 35, 0,.2);
		}
		.dropdown-menu li:hover .sub-menu {
 			visibility: visible;
		}

		// .dropdown:hover .dropdown-menu {
		//   display: block;
		// }
	}
</style>

<section class="sections-bar">
	<nav class="navbar navbar-dark bg-dark">
		<div class="navbar-header">
		<ul class="nav navbar-nav mr-auto" style="display:inline-block">
			{#each sections as s}
				{#if s['fam'] && s['fam'].length > 0}
					<li class="nav-item dropdown" style="float:left;margin-left:20px">
						<a class="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{s.DESSEC}
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown" style="position:absolute;">
							{#each s.fam as f}
								<a class="dropdown-item" href="/private/catalog/section/{f.CODFAM}"> {f.DESFAM}</a>
							{/each}
						</div>
					</li>
				{:else}
					<li class="nav-item dropdown" >
						<span class="navbar-text">Error! ha sido imposible recuperar las secciones del servidor, haga click<a href="/private">aquí</a></span>
					</li>
				{/if}
			{/each}
			</ul>
		</div>
	</nav>
</section>
