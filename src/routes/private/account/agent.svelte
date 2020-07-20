

<script>
	import Precard from "@/components/preCard.svelte";
	import { siteName, contactEmail } from "@/config";
	import { get } from "@/lib/api";
	import { formatDate, formatCurrency} from "@/lib/functions";
	import { stores } from "@sapper/app";
	const { session} = stores();

	let info = {};
	let infoCLient = {};

	async function getAgent() {
		return new Promise(async (resolve, reject) => {
			try {
				let c = await get(`fcli`,undefined ,$session.token);
				if (c && c.length>0) c= c[0];
				let a = await get(`fage`,undefined ,$session.token);
				return resolve(info = a, infoCLient= c);
			} catch (e) {
				return reject(e);
			}
		});
	}

</script>



<div class="agent-section mt-3">
	<div class="row justify-content-lg-center">
		{#await getAgent()}
			<div class="col col-lg-8 col-xl-6 col-md-12">
				<Precard  />
			</div>
		{:then info}
			<div class="col col-lg-8 col-xl-6 col-md-12">

				<div class="card">
					<div class="card-header">Agente asignado</div>
					<div class="card-body">
						<div class="row" style="font-size:27px">
							<div class="col-3">
								<img src="/logo.svg" width="90" height="90" class="d-inline-block align-top" alt="">
							</div>
							<div class="col-9" style="">
								<span style="font-weight:bold;">{siteName}</span>
								<hr>
								<div class=" text-responsive" >
									<div>{info.NOMAGE||''}</div>
									<div> {info.TEMAGE? 'Tel.' + info.TEMAGE:''}</div>
									<div>{info.EMAAGE||''} </div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		{:catch error}
			<div class="alert alert-danger" role="alert">
				 <h4 class="alert-heading">Error al recibir información!</h4>
 				{error.message}
				<hr>
				<p class="mb-0">Recargue la página y si el problema persiste contacte con {contactEmail}.</p>
			</div>
		{/await}
	</div>
		{#if info}
			<div class="row mt-5">
				<div class="col-12 col-lg-6">
					<div class="form-group">
						<label for="exampleInputEmail1">Dirección de email de respuesta</label>
						<input type="email" class="form-control" value={infoCLient.EMACLI||''} >
						<small class="form-text text-muted">La dirección en la que quieres recibir la respuesta de tu agente.</small>
					</div>
				</div>
				<div class="col-12 col-lg-6">
					<div class="form-group">
						<label for="exampleInputEmail1">Asunto</label>
						<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
						<small class="form-text text-muted">(Opcional) Breve introdcción.</small>
					</div>
				</div>
			</div>

			<div class="row ">
				<div class="col-12">
					<div class="form-group">
						<label for="exampleFormControlTextarea1">Mensaje</label>
						<textarea class="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
						<small class="form-text text-muted">Cuerpo del mensaje.</small>
					</div>
				</div>
			</div>

			<div class="row ">
				<div class="col offset-lg-8 align-self-end">
					<button class="btn btn-fw btn-lg btn-block" type="button" >
							Enviar  <i style="line-height: 22px;" class="fal fa-paper-plane ml-2"></i>
						</button>
				</div>
			</div>

		{/if}
</div>

<style lang="scss">
	// @import "@/style/fw.scss";
</style>

