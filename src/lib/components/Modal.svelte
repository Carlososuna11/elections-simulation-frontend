<script lang="ts">
  import { onMount } from 'svelte';
  import CloseIcon from '../../assets/svg/close-icon.svg';
  import LogoIcon from '../../assets/svg/brand-blue.svg';
  export let showModal: boolean;
  export let title: string;
  export let description: string;
  export let size: string = 'sm';
  export let onClose = () => {};
  let isOut: boolean = false;
  let rendered: boolean = false;

  const closeModal = () => {
    isOut = true;
    onClose();
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      isOut = false;
      showModal = false;
    }, 900);
  };

  onMount(() => {
    rendered = true;
  });

  $: showModal
    ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = 'auto');
</script>

<div class="w-full h-screen fixed left-0 top-0 bg-[#000000ce] z-40">
  <div class="w-full h-full flex items-center justify-center">
    <div
      class={`w-[90%] sm:w-[1000px] lg:w-[1000px] flex items-center justify-center bg-[#FAFAFA] rounded-xl slideInDown ${
        isOut && 'slideOutUp'
      } ${
        size === 'sm'
          ? 'h-[350px]'
          : size === 'md'
          ? 'sm:h-[450px] lg:h-[570px]'
          : 'sm:h-[550px] lg:h-[670px]'
      }`}
    >
      <div class="w-full h-[96%] overflow-y-auto scroll">
        <div
          class="w-full h-full flex items-center flex-col gap-4 rounded-xl py-4 lg:py-8"
        >
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-6 h-6 flex items-center justify-center flex-col self-end mr-5 cursor-pointer"
            on:click={closeModal}
          >
            <img src={CloseIcon} class="w-full h-full" alt="Close icon" />
          </div>
          <figure>
            <img src={LogoIcon} class="w-20" alt="Logo" />
          </figure>

          <div class="w-[80%] flex flex-col gap-3 mx-auto pb-4">
            <div class="w-full flex flex-col gap-1">
              <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
                <h3 class="text-xl text-[#383838] font-Syne font-bold">
                  {title}
                </h3>
                <p class="text-sm text-[#757575]">
                  {description}
                </p>
              </div>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
