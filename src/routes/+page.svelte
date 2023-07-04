<script lang="ts">
  import Title from '../lib/components/Title.svelte';
  import SearchIcon from '../assets/svg/search-icon.svg';
  import AddMore from '../assets/svg/add-round-icon.svg';
  import { Accordion, AccordionItem, Toggle } from 'flowbite-svelte';
  import MultiSelect from '$lib/components/MultiSelect.svelte';
  import ElectorCard from '$lib/components/ElectorCard.svelte';
  import PostulantCard from '$lib/components/PostulantCard.svelte';
  import { major, ingressStatus, semester } from '$lib/utils';
  import type { StudentElector, StudentPostulant } from '$lib/types';
  import ImportProjectIcon from '../assets/svg/import-file-icon.svg';
  import { api } from '../lib/services/api.services';
  import { onMount } from 'svelte';
  import { getUrlSearchParams, replaceStateWithQuery } from '../lib/utils';
  import InfiniteScroll from '../lib/components/InfiniteScroll.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import type { PageData } from './$types';
  import ImportProject from '$lib/components/ImportProject.svelte';

  export let data: PageData;
  let listMode = {
    elector: {
      visible: true,
      import: false,
      method: api.getStudentsElector,
      loadMethod: api.loadElectorProject,
    },
    postulant: {
      visible: false,
      import: false,
      method: api.getStudentsPostulant,
      loadMethod: api.loadPostulantProject,
    },
  };

  function getStudents() {
    if (listMode.elector.visible) {
      return listMode.elector.method;
    }
    return listMode.postulant.method;
  }

  /*******************************PAGINATION*********************************************/
  let loadingMore: boolean = false;
  let page = 1;
  let limit = 6;
  let hasNextPage = false;
  let students: (StudentElector | StudentPostulant)[] = [];
  let newStudents: (StudentElector | StudentPostulant)[] = [];

  async function getProjects() {
    loadingMore = true;
    try {
      const method = getStudents();
      console.log(method);
      const response = await method(page, limit);
      hasNextPage = response.meta.hasNextPage;
      newStudents = [];
      newStudents = response.data;
      console.log(newStudents);
    } catch (error) {
      console.log(error);
    }
    loadingMore = false;
  }

  async function loadMore() {
    page++;
    await getProjects();
  }

  $: students = [...students, ...newStudents];

  async function checkParam() {
    const searchParams = getUrlSearchParams();
    const action = searchParams.action;
    switch (action) {
      case 'elector':
        listMode.elector.visible = true;
        listMode.postulant.visible = false;
        replaceStateWithQuery({
          action: 'elector',
        });
        break;
      case 'postulant':
        listMode.elector.visible = false;
        listMode.postulant.visible = true;
        replaceStateWithQuery({
          action: 'postulant',
        });
        break;
      default:
        listMode.elector.visible = true;
        listMode.postulant.visible = false;
        replaceStateWithQuery({
          action: 'elector',
        });
        break;
    }
  }

  async function reset() {
    page = 1;
    newStudents = [];
    students = [];
    await getProjects();
  }

  onMount(async () => {
    await checkParam();
    await getProjects();
  });

  /********************************************************************************/
</script>

<div class="w-full lg:w-[75%] lg:mx-auto mt-24 lg:mt-14 pb-4">
  <div
    class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
  >
    <div
      class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
    >
      <div class="w-full sm:mt-6 lg:mt-14 mx-auto lg:mx-0 pb-3">
        <Title
          title={listMode.elector.visible ? 'Electores' : 'Postulantes'}
          title_description="Lista de estudiantes de pregrado registrados en el sistema"
        />
        <div
          class="grid max-w-lg grid-cols-2 gap-1 p-1 mx-auto mt-2 rounded-lg bg-[#051127]"
          role="group"
        >
          <button
            type="button"
            on:click={async () => {
              listMode.elector.visible = true;
              listMode.postulant.visible = false;
              listMode.elector.import = false;
              listMode.postulant.import = false;
              replaceStateWithQuery({
                action: 'elector',
              });
              await reset();
            }}
            class={listMode.elector.visible
              ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
              : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
          >
            Electores
          </button>
          <button
            type="button"
            on:click={async () => {
              listMode.elector.visible = false;
              listMode.postulant.visible = true;
              listMode.elector.import = false;
              listMode.postulant.import = false;
              replaceStateWithQuery({
                action: 'postulant',
              });
              await reset();
            }}
            class={listMode.postulant.visible
              ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
              : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
          >
            Postulantes
          </button>
        </div>
        <div class="max-w-lg p-1 mx-auto mt-2">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-full lg:w-60 px-2 flex justify-center items-center gap-2 h-8 text-white bg-[#051127] rounded-md cursor-pointer
            hover:bg-[#505868]"
            on:click={listMode.elector.visible
              ? () => {
                  listMode.elector.import = true;
                }
              : () => {
                  listMode.postulant.import = true;
                }}
          >
            <p class="hidden lg:block text-xs font-medium font-Syne">
              Importar Reglas de {listMode.elector.visible
                ? 'Electores'
                : 'Postulantes'}
            </p>
            <p class="lg:hidden text-xs font-medium font-Syne">Importar</p>
            <img src={ImportProjectIcon} class="w-6 h-6" alt="Search icon" />
          </div>
        </div>
      </div>
      <div class="w-full lg:mx-auto">
        <section
          class="w-full flex flex-col gap-4 bg-[#F5F5F65C] p-2 rounded-md"
        >
          <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!--  -->
            {#if listMode.elector.visible}
              {#each students as student}
                <ElectorCard {student} />
              {/each}
              <InfiniteScroll
                hasMore={newStudents.length > 0}
                threshold={100}
                on:loadMore={loadMore}
                window={true}
              />
            {/if}
            {#if listMode.postulant.visible}
              {#each students as student}
                <PostulantCard {student} />
              {/each}
              <InfiniteScroll
                hasMore={newStudents.length > 0}
                threshold={100}
                on:loadMore={loadMore}
                window={true}
              />
            {/if}
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            on:click={() => loadMore()}
            class="w-full flex items-center justify-center flex-col py-4 cursor-pointer rounded-md hover:bg-[#FFFFFF50]"
          >
            {#if loadingMore}
              <div
                class="w-4 h-4 rounded-full border-2 border-[#021529] border-l-transparent animate-spin"
              />
            {:else if hasNextPage}
              <img src={AddMore} alt="Add icon" />
            {/if}
          </div>
        </section>
      </div>
    </div>
  </div>
</div>

{#if listMode.elector.import}
  <Modal
    title={'Importar reglas de Electores'}
    description={'Seleccione el archivo .TSBR que desea importar'}
    bind:showModal={listMode.elector.import}
    onClose={() => {
      listMode.elector.import = false;
    }}
    size="md"
  >
    <ImportProject
      bind:data={data.importForm}
      method={listMode.elector.loadMethod}
      onClose={() => {
        listMode.elector.import = false;
      }}
    />
  </Modal>
{/if}
{#if listMode.postulant.import}
  <Modal
    title={'Importar reglas de Postulantes'}
    description={'Seleccione el archivo .TSBR que desea importar'}
    bind:showModal={listMode.postulant.import}
    onClose={() => {
      listMode.postulant.import = false;
    }}
    size="md"
  >
    <ImportProject
      bind:data={data.importForm}
      method={listMode.postulant.loadMethod}
      onClose={() => {
        listMode.postulant.import = false;
      }}
    />
  </Modal>
{/if}
