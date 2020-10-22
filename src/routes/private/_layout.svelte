<script context="module">
	export async function preload(page, session) {
		if (session.token == undefined) {
			return this.redirect(302, "/");
		}
	}
</script>

<script>
	// import HbarSections from "@/components/hbarSections.svelte";
</script>

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
