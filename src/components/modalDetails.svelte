<script>
	import DetailsItem from "@/components/detailsItem.svelte";
	import BigImages from "@/components/bigImages.svelte";


	export let selected = undefined;
	export let items =  [];
	let showBig = false;

	$: onChangeSelected(selected);
	$: onChangeItems(items);

	async function onChangeItems(i){
		if (selected==undefined) return;
		let found = i.findIndex(element => (element.CODART == selected.CODART && element.CE1ART == selected.CE1ART && element.idx == selected.idx));
		if (found<0){
			hideModal();
		}
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

	function onShowBigImage(){
		showBig=true;
	}

	function gotoNext(){
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
	}

	function gotoPrevious(){
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

	function handleKeydown(event) {
		prevent(event);
		if (event.key == "Enter"){
			if ( selected == undefined ){
				selected = items[0];
			}else{
				showBig = true;
			}
		}
		if (selected!=undefined){
			if (event.key == "Escape"){
				if (showBig==true) {
					showBig = false;
				}else{
					hideModal();
				}
			}else
			if (event.key == "ArrowRight"){
				gotoNext();
			}else if (event.key == "ArrowLeft"){
				gotoPrevious()
			}
		}
	}


</script>

<svelte:window on:keydown={handleKeydown}/>
<BigImages show={showBig} item={selected} on:EventHide={()=>{showBig=false;}}   on:EventNext={gotoNext}  on:EventPrevious={gotoPrevious}   ></BigImages>
<div class="modal fade" id="modalItemDetails" data-keyboard="false"  tabindex="-1" role="dialog">
	<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-body" style="margin-bottom:30px;">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="font-size:30px;">
          		<span aria-hidden="true">&times;</span>
        	</button>
				<!-- <button on:click={()=>{hideModal()}} type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button> -->
				<DetailsItem on:showbigimage={onShowBigImage} fart={selected} />
			</div>
		</div>
	</div>
</div>

