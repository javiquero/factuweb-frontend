<div class="input-group topbar-search ">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
  </div>
  <input type="text" bind:value={value} class="form-control " placeholder="Buscar" aria-label="Buscar" aria-describedby="basic-addon1">
</div>

<script>

export let value = '';

</script>

<style lang="scss">
	.topbar-search{
		.input-group-prepend{
			.input-group-text{
				background-color:#f3f3f3;
				border-bottom-left-radius: 100px;
				border-top-left-radius: 100px;
			}
		}
		.form-control{
			border-bottom-right-radius: 100px;
			border-top-right-radius: 100px;
			background-color:#f3f3f3;
			border-left:0px;
			&:focus{

				outline: 0;
				border-color: #ced4da !important;
				box-shadow: none;
			}
		}
	}
</style>
