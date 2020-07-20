<script>
  export let cols = 5;
  export let rows= 5;
  export let footer = false;
</script>

<style>
  .placeholder-text {
    display: inline-block;
    height: 20px;
    width: 90%;
    border-radius: 20px;
    background-color: #eee;
    background-image: url(/img/phloader.gif);
    background-attachment: fixed;
    background-repeat: repeat-y;
    background-size: 100% 1px;
  }
</style>

<div>
  <div
    class=" fpreloadtable table-responsive supertable-init no-margin no-padding">
    <table class="table htable btable no-margin no-padding">
      <thead>
        <tr class="row-title">
          {#each new Array(parseInt(cols)) as c}
            <th >
              <span class="placeholder-text" />
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each new Array(parseInt(rows)) as r}
          <tr class="placeholder-row">
            {#each new Array(parseInt(cols)) as c}
              <td >
                <span class="placeholder-text" />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
{#if footer}
      <tfoot>
        <tr>
          {#each new Array(parseInt(cols)) as c}
            <th>
              <span class="placeholder-text" />
            </th>
          {/each}
        </tr>
      </tfoot>
	  {/if}
    </table>
  </div>
</div>
