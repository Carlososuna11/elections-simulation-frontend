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
  import { api } from '../lib/services/api.services';
  import { onMount } from 'svelte';
  import { getUrlSearchParams, replaceStateWithQuery } from '../lib/utils';
  import InfiniteScroll from '../lib/components/InfiniteScroll.svelte';

  let selectInfo = {
    search: '',
    major: [],
    ingressStatus: [],
    programCode: [],
    semester: [],
    voteCU: undefined,
    voteDIDES: undefined,
  };

  let listElectors = true;

  let listMode = {
    elector: {
      visible: true,
      method: api.getStudentsElector,
    },
    postulant: {
      visible: false,
      method: api.getStudentsPostulant,
    },
  };

  function getStudents() {
    if (listMode.elector.visible) {
      return listMode.elector.method;
    } else {
      return listMode.postulant.method;
    }
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
      console.log(response);
      newStudents = response.data;
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

  onMount(async () => {
    const searchParams = getUrlSearchParams();
    const action = searchParams.action;
    switch (action) {
      case 'elector':
        listMode.elector.visible = true;
        listMode.postulant.visible = false;
        break;
      case 'postulant':
        listMode.elector.visible = false;
        listMode.postulant.visible = true;
        break;
      default:
        listMode.elector.visible = true;
        listMode.postulant.visible = false;
        break;
    }
    listElectors = !listMode.elector.visible;
    await getProjects();
  });

  $: !listElectors
    ? (listMode.elector.visible = true) && (listMode.postulant.visible = false)
    : (listMode.elector.visible = false) && (listMode.postulant.visible = true);

  /********************************************************************************/
</script>

<div class="w-full lg:w-[75%] lg:mx-auto mt-24 lg:mt-14 pb-4">
  <div
    class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
  >
    <div class="mt-10">
      <Toggle
        size="custom"
        on:change={async () => {
          if (loadingMore) {
            listElectors = !listElectors;
            return;
          }
          replaceStateWithQuery({
            action: listElectors ? 'elector' : 'postulant',
          });

          newStudents = [];
          students = [];
          page = 1;
          hasNextPage = false;
          await getProjects();
        }}
        customSize="w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6 !peer-focus:ring-[#051127] peer-checked:bg-[#051127]"
        bind:checked={listElectors}
        ><p class="block text-lg text-black font-bold">
          {#if listElectors}
            Postulantes
          {:else}
            Electores
          {/if}
        </p></Toggle
      >
    </div>
    <div
      class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
    >
      <div class="w-full sm:mt-6 lg:mt-14 mx-auto lg:mx-0 pb-3">
        <Title
          title="Estudiantes"
          title_description="Lista de estudiantes de pregrado registrados en el sistema"
        />
        <Accordion
          class="group-first:rounded-b-xl mb-4 bg-[#A6A6A645] mt-4"
          activeClasses="bg-gray-100 text-black-900 focus:ring-gray-200 group-first:rounded-b-xl"
          inactiveClasses="text-black-500 hover:bg-gray-100 group-first:rounded-b-xl"
          defaultClass="text-black-500 group-first:rounded-b-xl"
        >
          <AccordionItem
            activeClasses="p-2 bg-gray-100 text-gray-900 focus:ring-4 focus:ring-gray-200"
          >
            <span slot="header">
              <p>
                <span class="font-bold text-lg">Filtros</span>
              </p>
            </span>
            <div class="w-full flex flex-col gap-2 rounded-md">
              <div
                class="w-full flex items-center relative z-30 justify-between"
              >
                <div
                  class="w-full h-10 flex gap-5 px-2 rounded-md bg-[#F6F6F6]"
                >
                  <input
                    type="text"
                    class="w-full h-full outline-none pl-1 text-sm bg-inherit"
                    placeholder="Búsqueda"
                  />
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <img
                    class="cursor-pointer"
                    src={SearchIcon}
                    alt="Search icon"
                  />
                </div>
              </div>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="w-full h-full">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="block text-md font-medium text-black">
                  Carrera
                </label>
                <MultiSelect items={major} bind:value={selectInfo.major} />
              </div>
              <div class="w-full h-full">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="block text-md font-medium text-black">
                  Status de Ingreso
                </label>
                <MultiSelect
                  items={ingressStatus}
                  bind:value={selectInfo.ingressStatus}
                />
              </div>
              <div class="w-full h-full">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="block text-md font-medium text-black">
                  Semestre
                </label>
                <MultiSelect
                  items={semester}
                  bind:value={selectInfo.semester}
                />
              </div>
              <Toggle
                size="custom"
                customSize="w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6 !peer-focus:ring-[#051127] peer-checked:bg-[#051127]"
                bind:checked={selectInfo.voteCU}
                ><p class="block text-lg text-black font-bold">
                  ¿Puede votar por Consejo Universitario?
                </p></Toggle
              >
              <Toggle
                size="custom"
                customSize="w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6 !peer-focus:ring-[#051127] peer-checked:bg-[#051127]"
                bind:checked={selectInfo.voteDIDES}
                ><p class="block text-lg text-black font-bold">
                  ¿Puede votar por Consejo DIDES?
                </p></Toggle
              >
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="flex flex-row gap-2">
                <div
                  class="w-full lg:w-60 px-2 flex justify-center items-center gap-2 h-10 text-white bg-[#505868] rounded-md cursor-pointer
            hover:bg-[#505868]"
                  on:click={() => {
                    selectInfo = {
                      search: '',
                      major: [],
                      ingressStatus: [],
                      programCode: [],
                      semester: [],
                      voteCU: undefined,
                      voteDIDES: undefined,
                    };
                  }}
                >
                  <p class="block text-md font-medium font-Syne">Resetear</p>
                </div>
                <div
                  class="w-full lg:w-60 px-2 flex justify-center items-center gap-2 h-10 text-white bg-[#051127] rounded-md cursor-pointer
            hover:bg-[#505868]"
                >
                  <p class="block text-md font-medium font-Syne">Buscar</p>
                </div>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
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
