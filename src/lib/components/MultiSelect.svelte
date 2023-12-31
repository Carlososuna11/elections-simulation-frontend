<script lang="ts">
  type SelectOptionType = {
    name: string | number;
    value: string | number;
  };

  export let items: SelectOptionType[] = [];
  export let value: SelectOptionType[] = [];
  export let highlighted: boolean = false;
  export let defaultClass: string = '';

  let show: boolean = false;

  // Container
  const multiSelectClass: string =
    'relative !min-h-[55px] p-2 border flex items-center rounded-lg gap-2 bg-[#051127] border-gray-600 text-white focus:border-2 focus:border-primary-500 focus:ring-primary-500';
  // Pills Button
  const multiSelectBtn: string =
    'flex items-center gap-1 rounded-lg border overflow-hidden border-gray-500';
  // Dropdown
  const multiSelectDropdown: string =
    'z-10 absolute max-h-32 border bg-[#051127] border-gray-600 text-white left-0 top-[calc(100%+1rem)] rounded-lg cursor-pointer overflow-y-scroll w-full scroll';
  // Items
  const itemsClass: string = 'p-1 pl-2 pr-2 hover:bg-gray-600 bg-[#051127]';
  // Selected items
  const itemsSelectClass: string =
    'bg-primary-500 text-white hover:bg-primary-600';

  const selectOption = (select: SelectOptionType) => {
    if (value.includes(select)) {
      // todo
    } else {
      value.push(select);
      value = value;
    }
  };

  const clearAll = () => {
    value = [];
  };

  const clearThisOption = (select: SelectOptionType) => {
    if (value.includes(select)) {
      value = value.filter((o) => o !== select);
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={() => (show = !show)}
  on:blur={() => (show = false)}
  tabindex="-1"
  class="{multiSelectClass} {defaultClass}"
>
  <span class="flex gap-2 flex-wrap">
    {#if value.length}
      {#each value as select, index}
        <button class={multiSelectBtn}>
          <span class="p-[1px] ml-[1.5px]">{select.name}</span>
          <svg
            on:click={(e) => {
              e.stopPropagation();
              clearThisOption(select);
            }}
            class="w-4 h-full pr-[1.5px] hover:bg-primary-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
          >
        </button>
      {/each}
    {/if}
  </span>
  <div class="flex ml-auto gap-2">
    <button
      on:click={(e) => {
        e.stopPropagation();
        clearAll();
      }}
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
    <div class="w-[1px] bg-gray-300" />
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        class="h-4 w-4 mb-1 mr-1 cursor-pointer"
        aria-label="chevron down"
        fill="none"
        viewBox="0 0 20 20"
        role="img"
        stroke-width="2"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
          stroke="currentColor"
        /></svg
      >
    </button>
  </div>

  {#if show}
    <div class={multiSelectDropdown}>
      {#each items as item, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={(e) => {
            e.stopPropagation();
            selectOption(item);
          }}
          class="{itemsClass} {value.includes(item) && highlighted
            ? itemsSelectClass
            : ''}"
        >
          {item.name}
        </div>
      {/each}
    </div>
  {/if}
</div>
