<script>
	import DetailsItem from "@/components/detailsItem.svelte";


	export let selected = undefined;
	export let items =  [];

	$: onChangeSelected(selected);
	$: onChangeItems(items);

	async function onChangeItems(i){
		await Promise.all(items.map(async item => {
			item.src = "/api/image/1024/" + item.IMGART;
			item.w= 0;
			item.h= 0;
		}));

		if ( selected==undefined ) return;
		let found = i.findIndex(element => (element.CODART == selected.CODART && element.CE1ART == selected.CE1ART && element.idx == selected.idx));
		if (found<0){
			hideModal();
		}
	}
	function onShowBigImage(event){
		let found = items.findIndex(element => (element.CODART == selected.CODART && element.CE1ART == selected.CE1ART && element.idx == selected.idx));
		let pswpElement = document.querySelectorAll('.pswp')[0];

		let options = {
			index: found || 0 // start at first slide
		};
		let gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.listen('afterChange', function() {
			selected = items[gallery.getCurrentIndex()];

		});

		gallery.listen('gettingData', function (index, item) {
			if (item.w < 1 || item.h < 1) {
				let img = new Image();
				img.onload = function () {
					item.w = this.width;
					item.h = this.height;
					gallery.updateSize(true);
				};
				img.src = item.src;
			}
		});
		gallery.init();
	}

	function onChangeSelected(element){
		if ( element==undefined ) return;
		if (element.CODART && element.IMGART ){
			window.$('#modalItemDetails').modal('show');
		}
	}

	function hideModal(){
		selected = undefined;
		window.$('#modalItemDetails').modal('hide');

	}

	function prevent(event){
		event.preventDefault();
		event.stopPropagation();
	}

	function handleKeydown(event) {
		if (selected!=undefined){
			// if (event.key == "Enter"){
			// 	onShowBigImage(event)
			// }else
			if (event.key == "ArrowRight"){
				let found = items.findIndex(element => (element.CODART == selected.CODART && element.CE1ART == selected.CE1ART && element.idx == selected.idx));
				if (found>-1){
					if (found < items.length-1){
						selected = items[found+1];
					}else{
						selected = items[0];
					}
				}else{
					hideModal()
				}
			}else if (event.key == "ArrowLeft"){
				let found = items.findIndex(element => (element.CODART == selected.CODART && element.CE1ART == selected.CE1ART && element.idx == selected.idx));
				if (found>-1){
					if (found > 0){
						selected = items[found-1];
					}else{
						selected = items[items.length-1];
					}
				}else{
					hideModal()
				}
			}
		}
	}


</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="modal fade" id="modalItemDetails" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-body" style="margin-bottom:30px;">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="font-size:30px;">
          		<span aria-hidden="true">&times;</span>
        	</button>
				<!-- <button on:click={()=>{hideModal()}} type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button> -->
				<DetailsItem on:showbigimage="{onShowBigImage}" fart={selected} />
			</div>
		</div>
	</div>
</div>


<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg" style="background-color:white"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader--active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
