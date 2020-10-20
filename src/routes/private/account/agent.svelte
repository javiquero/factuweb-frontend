

<script>
	import Precard from "@/components/preCard.svelte";
	import { siteName, contactEmail } from "@/config";
	import { get, post } from "@/lib/api";
	import { formatDate, formatCurrency} from "@/lib/functions";
	import { stores } from "@sapper/app";
	const { session} = stores();

	let info = {};
	let body="";
	let subject ="";

	async function getAgent() {
		return new Promise(async (resolve, reject) => {
			try {
				info = await get(`client/agent`,undefined ,$session.token);
				return resolve(info);
			} catch (e) {
				return reject(e);
			}
		});
	}

	let promise = undefined;
	function clickSendEmail() {
		promise = sendEmail();
	}
	async function sendEmail(){
		return new Promise(async (resolve, reject) => {
			try {
				let resp = await post(`email/send`,{body: body, subject: subject} ,$session.token);
				body = "";
				subject = "";
				return resolve();
			} catch (e) {
				return reject(e);
			}
		});
	}

</script>



<div class="agent-section mt-3">
	<div class="row justify-content-md-center">
		{#await getAgent()}
			<div class="col-lg-9 col-xl-9 col-md-8 col-sm-12">
				<Precard  />
			</div>
		{:then info}
			<div class="col-lg-9 col-xl-9 col-md-8 col-sm-12">
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
									<div>{info.agent.NOMAGE||''}</div>
									{#if info.agent.TEMAGE && info.agent.TEMAGE!=""}
										<a href="tel: {info.agent.TEMAGE}"> Tel: {info.agent.TEMAGE}</a>
									{/if}
									<div>{info.agent.EMAAGE||''} </div>
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
				<div class="col-12 col-md-6">
					<div class="form-group">
						<label for="exampleInputEmail1">Dirección de email de respuesta</label>
						<input type="email" class="form-control" value={info.EMACLI||''} >
						<small class="form-text text-muted">La dirección en la que quieres recibir la respuesta de tu agente.</small>
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group">
						<label for="exampleInputEmail1">Asunto</label>
						<input type="email" bind:value={subject} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
						<small class="form-text text-muted">(Opcional) Breve introdcción.</small>
					</div>
				</div>
			</div>

			<div class="row ">
				<div class="col-12">
					<div class="form-group">
						<label for="exampleFormControlTextarea1">Mensaje</label>
						<textarea bind:value={body} class="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
						<small class="form-text text-muted">Cuerpo del mensaje.</small>
					</div>
				</div>
			</div>

			<div class="row ">
				<div class="col offset-lg-8 align-self-end">
				{#await promise}
						<button class="btn btn-fw btn-lg btn-block" on:click="" type="button" disabled >
							Enviando  <i style="line-height: 22px;" class="fal fa-paper-plane ml-2"></i>
						</button>
				{:then info}
					<button class="btn btn-fw btn-lg btn-block" on:click="{clickSendEmail}" type="button" >
							Enviar  <i style="line-height: 22px;" class="fal fa-paper-plane ml-2"></i>
					</button>
				{/await}
				</div>
			</div>

		{/if}
</div>

<style lang="scss">
	@media (max-width: 996px) {
		.text-responsive{font-size: 20px;}
	}

</style>

