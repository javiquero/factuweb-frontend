<script context="module">
  export async function preload(page, session) {
	const { token } = session;
    if (token) {
      return this.redirect(302, "/private");
    }
  }
</script>

<script>
  import { siteName } from "./../config";
</script>

<svelte:head>
  	<title>{siteName}</title>
  	<meta data-hid="description" name="description" content="Site {siteName}" />
	<meta data-hid="og:title" name="og_title" content="Site {siteName}" />
</svelte:head>

<main>
	<section class="background-logo">
	</section>
</main>

<style>
	.background-logo{
		background-size: 300px;
		background-position: center center;
		background-repeat: no-repeat;
		height:100%;
	}

</style>
