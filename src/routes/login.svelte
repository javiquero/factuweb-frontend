<script>
	import { stores, goto } from '@sapper/app'
	import { siteName } from '@/config'

	const { session, page } = stores()
	import { auth } from '@/store/auth.js'
	import { cart } from '@/store/cart.js'

	let clientcode = '',
		nif = '',
		errorMessage = '',
		loading = false

	async function submit() {
		try {
			loading = true
			let u = await auth.login(clientcode, nif)
			$session.user = u.user;
			$session.token = u.token;
			cart.fetch();
			goto('/private')
		} catch (e) {
			console.error(e)
			errorMessage = e
		} finally {
			loading = false
		}
	}

	function init(el){
    	el.focus()
  	}

</script>



<svelte:head>
	<title>{$session.info.NOMEMP || siteName} | Login</title>

	<meta data-hid="description" name="description" content="Página de acceso login al catálogo de productos · {$session.info.NOMEMP || siteName}" />
	<meta data-hid="title" name="title" content="Login to {$session.info.NOMEMP || siteName}" />

	<meta data-hid="og:description" name="og:description" content="Página de acceso login al catálogo de productos · {$session.info.NOMEMP || siteName}" />
	<meta data-hid="og:title" name="og:title" content="Login to {$session.info.NOMEMP || siteName}" />
</svelte:head>

<section style="margin-top: 30px;">
	<div class="container">
		<div class="row justify-content-md-center">
			<div class="col-xl-5 col-lg-6 col-md-8 col-sm-10">
				<div class="card card-shadow">
					<div class="card-body">
						<div class="content-login">
							<div class="head-login">
								<div class="logo">{$session.info.NOMEMP || siteName}</div>
								<img src="/logo.svg" width="60" height="60" class="d-inline-block align-top" alt="" />
							</div>
							<div class="body-login">
								<form on:submit|preventDefault={submit}>
									<div class="form-group">
										<label for="inputCodig">Código de cliente</label>
										<input use:init  disabled={loading} bind:value={clientcode} type="text"
											placeholder="" name="clientcode" class="form-control fwinput" id="inputCodig"
											aria-describedby="inputCodigo">
										<small id="inputCodigo" style="font-size:12px" class="form-text text-muted">Puedes encontrarlo en alguna de nuestras facturas.</small>
									</div>
									<div class="form-group">
										<label for="inputCif">Cif/Nif</label>
										<input disabled={loading} bind:value={nif} type="text"
											placeholder="" name="cif" class="form-control fwinput" id="inputCif"
											aria-describedby="inputCif_">
										<small id="inputCif_" style="font-size:12px" class="form-text text-muted">Tu nif/cif sin espacios ni guiones.</small>
									</div>
									{#if errorMessage != ''}
										<div class="alert alert-warning" role="alert">
											<h4 class="alert-heading text-capitalize">Atención</h4>
											{errorMessage}
										</div>
									{/if}
									<button type="button" on:click={submit} class="btn btn-primary btn-lg btn-block" style="margin-top:50px;margin-bottom:50px;" disabled={loading}>Entrar</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  	</div>
</section>


<style>
	.logo {
		font-family: 'Paytone One';
		font-weight: 400;
		font-style: normal;
		font-size: 30px;
		line-height: 30px;
		color: rgba(0, 0, 0, 0.6);
		padding-bottom: 10px;
	}

	.head-login {
		text-align: center;
		padding-top: 20px;
		padding-bottom: 100px;
	}

	.body-login {
		text-align: left;
		max-width: 300px;
		width: 100%;
		display: inline-block;
	}

	.content-login {
		text-align: center;
	}

</style>
