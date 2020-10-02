<script>
	import DetailsItem from "@/components/detailsItem.svelte";

	export let selected = undefined;
	export let items =  [];

	$: onChangeSelected(selected);
	$: onChangeItems(items);

	function onChangeItems(i){
		if ( selected==undefined ) return;
		let found = i.findIndex(element => (element.CODART == selected.CODART && element.idx == selected.idx));
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

	function handleKeydown(event) {
		if (selected!=undefined){
			if (event.key == "ArrowRight"){
				let found = items.findIndex(element => (element.CODART == selected.CODART && element.idx == selected.idx));
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
				let found = items.findIndex(element => (element.CODART == selected.CODART && element.idx == selected.idx));
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
				<DetailsItem fart={selected} />
			</div>
		</div>
	</div>
</div>
