
<script>
	import { goto, stores} from "@sapper/app";
	const { preloading, page, session } = stores();

	import PreThumbItem from "@/components/preThumbItem.svelte";
	import PreText from "@/components/preText.svelte";
	import { get } from "@/lib/api";

	import { contactEmail } from "@/config";

	let _promiseData = getData();
	async function getData(){
		return new Promise(async (resolve, reject) =>{
			try {
				let items = await get(`summary/catalog`);
				let data ={};
				await Promise.all(items.map(async item => {
					let IMG = item.IMAFAM==''?item.IMGART:item.IMAFAM;
					if (data[item.CODSEC]==undefined)
						data[item.CODSEC] = {CODSEC: item.CODSEC, DESSEC: item.DESSEC, fam:[]};
					data[item.CODSEC].fam.push({CODFAM: item.CODFAM, DESFAM: item.DESFAM, IMG:IMG});
				}));
				return resolve(data);
			} catch (error) {
				console.error(error);
				return reject(error);
			}
		});
	}
</script>

<style lang="scss">
	.section-title{
		margin-top: 30px;
	}

	.section-link {
		color:black;
		text-decoration: none;
		display: block;
		background-color: #fff;
		border-radius: 5px;
		border: 1px solid rgba(195,195,195,.13);
		padding: 20px;
		height: 100%;
		cursor:pointer;
		-webkit-box-shadow: 0 1px 6px rgba(195,195,195,.13);
		-moz-box-shadow: 0 1px 6px rgba(195,195,195,.13);
		transition: all .3s ease;
		-webkit-transition: all .3s ease-in-out;
		&:hover{
			box-shadow: 0 6px 8px rgba(0,0,0,.13);
		}
	}
</style>

	{#await _promiseData}
		<div class="container">
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
		</div>
	{:then familiesData}
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
						<div class="container" >
							<dir class="row">
								{#each familiesData[section].fam as fam}
									<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3 text-center mb-3">
										<div class="section-link" on:click={()=>{goto($session.token ? "/private/catalog/section/"+fam.CODFAM : "/section/"+fam.CODFAM)}}>
											<div  class="row align-items-center" style="width:90%; height:200px; margin-left: 5%;">
												<img src="/api/image/150/{fam.IMG}" width="200" alt="Imagen de la sección {fam.DESFAM}" style="object-fit:contain; max-width:100%;max-height:100%; margin-left: auto;margin-right: auto;display: block;" class="align-self-center " />
											</div>
											<h5>{fam.DESFAM}</h5>
										</div>
									</div>
								{/each}
							</dir>
						</div>
					</section>
				{/if}
			{/each}
		{/if}
	{:catch error}
		<div class="alert alert-danger" role="alert">
			<h4 class="alert-heading">Error al recibir información!</h4>
			{error.message}
			<hr>
			<p class="mb-0">Recargue la página y si el problema persiste contacte con {contactEmail}.</p>
		</div>
	{/await}
