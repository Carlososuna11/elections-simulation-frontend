<script lang="ts">
  import Title from '../lib/components/Title.svelte';
  import SearchIcon from '../assets/svg/search-icon.svg';
  import AddMore from '../assets/svg/add-round-icon.svg';
  import { Accordion, AccordionItem, Toggle } from 'flowbite-svelte';
  import MultiSelect from '$lib/components/MultiSelect.svelte';

  let selectInfo = {
    search: '',
    major: [],
    ingressStatus: [],
    programCode: [],
    semester: [],
    voteCU: undefined,
    voteDIDES: undefined,
  };

  const major = [
    { name: 'Ingeniería Informática', value: 'IINF' },
    { name: 'Ingeniería Civil', value: 'ICIV' },
    { name: 'Ingeniería Industrial', value: 'IIND' },
    { name: 'Ingeniería Telecomunicaciones', value: 'ITEL' },
    { name: 'Arquitectura', value: 'ARQ' },
    { name: 'Filosofía', value: 'FIL' },
    { name: 'Psicología', value: 'PSI' },
    { name: 'Letras', value: 'LET' },
    { name: 'Comunicación Social', value: 'COM' },
    { name: 'Educación', value: 'EDU' },
    { name: 'Administración de Empresas', value: 'ADE' },
    { name: 'Contaduría Pública', value: 'CON' },
    { name: 'Relaciones Industriales', value: 'RIN' },
    { name: 'Sociología', value: 'SOC' },
    { name: 'Economía', value: 'ECO' },
    { name: 'Derecho', value: 'DER' },
    { name: 'Teología', value: 'TEO' },
  ];

  const ingressStatus = [
    { name: 'Retiro Retroactivo', value: 'DR' },
    { name: 'Retiro Total', value: 'DT' },
    { name: 'Inscripción Regular', value: 'IR' },
    { name: 'Inscripción Extemporánea', value: 'IE' },
    { name: 'Inscripción Tardía', value: 'IT' },
    { name: 'Modificación de Inscripción', value: 'MI' },
    { name: 'Tesis de Grado', value: 'TG' },
  ];

  const programCode = [
    { name: 'Pre-Grado', value: 'PR' },
    { name: 'Post-Grado', value: 'PG' },
  ];

  const semester = [
    { name: 'Primer Semestre', value: '01SE' },
    { name: 'Segundo Semestre', value: '02SE' },
    { name: 'Tercer Semestre', value: '03SE' },
    { name: 'Cuarto Semestre', value: '04SE' },
    { name: 'Quinto Semestre', value: '05SE' },
    { name: 'Sexto Semestre', value: '06SE' },
    { name: 'Séptimo Semestre', value: '07SE' },
    { name: 'Octavo Semestre', value: '08SE' },
    { name: 'Noveno Semestre', value: '09SE' },
    { name: 'Décimo Semestre', value: '10SE' },
  ];

  /*********************************************************************************/
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
                  Programa de Estudios
                </label>
                <MultiSelect
                  items={programCode}
                  bind:value={selectInfo.programCode}
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
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-full flex items-center justify-center flex-col py-4 cursor-pointer rounded-md hover:bg-[#FFFFFF50]"
          >
            <!-- <div
              class="w-4 h-4 rounded-full border-2 border-[#021529] border-l-transparent animate-spin"
            /> -->
            <img src={AddMore} alt="Add icon" />
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
