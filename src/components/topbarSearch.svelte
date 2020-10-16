<div class="input-group topbar-search ">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
  </div>
  <input type="text" bind:value={value} class="form-control inputsearch" placeholder="Buscar" aria-label="Buscar" aria-describedby="basic-addon1">
</div>

<script>

// import { post } from "@/lib/api";
import { goto, stores } from "@sapper/app";

export let value = '';

import { onMount } from 'svelte';

onMount(() => {


Array.from(document.getElementsByClassName("inputsearch")).forEach(
    function(element, index, array) {
        element.onkeypress = function(e){
			if (!e) e = window.event;
				var keyCode = e.keyCode || e.which;
				if (keyCode == '13'){
					if (value.length<3) return e.preventDefault();
					goto("/private/search?q="+value);
					// Enter pressed
					return false;
				}
		}
    }
);

		// document.getElementById('inputsearch').onkeypress = function(e){
		// 	if (!e) e = window.event;
		// 	var keyCode = e.keyCode || e.which;
		// 	if (keyCode == '13'){
		// 		if (value.length<3) return e.preventDefault();
		// 		goto("/private/search?q="+value);
		// 	// Enter pressed
		// 	return false;
		// 	}
		// }

  })
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
