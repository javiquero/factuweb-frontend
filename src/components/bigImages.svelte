<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { fade } from 'svelte/transition';


	export let show = false;
	export let item = {};

	function sendEventHide(){
		dispatch('EventHide');
	}

	function sendEventNext(){
		dispatch('EventNext');
	}

	function sendEventPrevious(){
		dispatch('EventPrevious');
	}

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
			console.log('left swipe');
			sendEventNext();
            /* left swipe */
        } else {
			console.log('right swipe');
			sendEventPrevious();
            /* right swipe */
        }
    } else {
        if ( yDiff > 0 ) {
			console.log('up swipe');
            /* up swipe */
        } else {
			console.log('down swipe');
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

</script>

<style lang="scss">

	#big-image{
		position: fixed; top:0px; left:0px; bottom:0px; right:0px; z-index:9999;
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		background-color:white;
  transition-duration: .5s;
  transition-timing-function: linear;

		.return-button {
			opacity: .5;
			margin-left: 50px;
			width:200px;
		}
		.left-arrow{
			opacity: .5;
			margin: 0;
			position:absolute;
			top:0px;
			width: 50px;
			height: 100%;
			left: 0px;
		}

		.right-arrow{
			opacity: .5;
			margin: 0;
			position:absolute;
			top:0px;
			width: 50px;
			height: 100%;
			right: 0px;
		}
	}
</style>

<!-- <svelte:window on:touchstart={handleTouchStart} on:touchmove={handleTouchMove}/> -->
<section >
	{#if show}
		<div transition:fade id="big-image" style="background-image: url('/api/image/1024/{item.IMGART}')">
			<button on:click={sendEventHide}  type="button" class="btn btn-dark return-button">Volver</button>

			<button class="btn btn-light btn-block left-arrow" on:click={sendEventPrevious} role="button">
				<i class="fas fa-chevron-left"></i>
			</button>

			<button class="btn btn-light btn-block right-arrow" on:click={sendEventNext} role="button">
				<i class="fas fa-chevron-right"></i>
			</button>

		</div>
	{/if}
</section>
