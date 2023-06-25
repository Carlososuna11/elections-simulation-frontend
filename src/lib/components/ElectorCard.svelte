<script lang="ts">
  import Modal from './Modal.svelte';
  import moment from 'moment';
  let showInfoModal = false;
  import type { StudentElector } from '$lib/types';
  import { getIngressStatus, getMajor, getSemester } from '$lib/utils';

  export let student: StudentElector;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={() => {
    showInfoModal = true;
  }}
  class="bg-gray-100 rounded-lg sm:w-auto h-[240px] justify-left p-2 sm:p-4 mb-2 flex flex-row cursor-pointer"
>
  <div class="w-full flex flex-col justify-between h-full">
    <div class="mb-3">
      <h3 class="text-base">{student.estuNombre}</h3>
      <p class="text-xs text-gray-600">Pregrado - Montalbán</p>
      <table class="text-xs mt-2">
        <tbody
          ><tr>
            <td class="pr-2 py-1 text-gray-600 font-semibold"
              >Estatus de Inscripción</td
            >
            <td class="pr-2 py-1 font-bold"
              >{getIngressStatus(student.estuStatusInscCode)?.name}</td
            >
          </tr>
          <tr>
            <td class="pr-2 py-1 text-gray-600 font-semibold">Carreras</td>
            <td class="pr-2 py-1 font-bold"
              >{student.majors
                .map((p) => getMajor(p.majorCode)?.name)
                .join(', ')}</td
            >
          </tr>
          <tr>
            <td class="pr-2 py-1 text-gray-600 font-semibold"
              >Carrera Principal</td
            >
            <td class="pr-2 py-1 font-bold"
              >{student.currentMajor
                ? getMajor(student.currentMajor.majorCode)?.name
                : ''}</td
            >
          </tr>
          {#if student?.currentMajor}
            <tr>
              <td class="pr-2 py-1 text-gray-600 font-semibold">Semestre</td>
              <td class="pr-2 py-1 font-bold"
                >{getSemester(
                  student.currentMajor.currentEnrolledSemester.semesterCode
                )?.name}</td
              >
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
    <p class="text-sm my-2 description-trucated" />
    <div class="mt-auto">
      <div class="flex space-x-2">
        <div
          class={student.voteCU
            ? 'py-2 text-md px-3 rounded-full bg-green-200 text-green-800'
            : 'py-2 text-md px-3 rounded-full bg-red-200 text-red-800'}
        >
          CU
        </div>
        <div
          class={student.voteDIDES
            ? 'py-2 text-md px-3 rounded-full bg-green-200 text-green-800'
            : 'py-2 text-md px-3 rounded-full bg-red-200 text-red-800'}
        >
          DIDES
        </div>
        {#if student.voteSchool}
          <div
            class="py-2 text-md px-3 bg-indigo-200 text-indigo-800 rounded-full"
          >
            {student.voteSchool}
          </div>
        {/if}
        {#if student.voteFaculty}
          <div
            class="py-2 text-md px-3 bg-indigo-200 text-indigo-800 rounded-full"
          >
            {student.voteFaculty}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

{#if showInfoModal}
  <Modal
    size="lg"
    bind:showModal={showInfoModal}
    title="Información del Estudiante"
    description="A continuación se muestra la información del estudiante seleccionado."
  >
    <div class="shadow overflow-hidden sm:rounded-lg">
      <div class="border-t border-gray-200">
        <dl>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Nombre</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {student.estuNombre}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Cédula</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {student.estuCedula}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              Estatus de Inscripción
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {getIngressStatus(student.estuStatusInscCode)?.name}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Nivel de Estudios</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Pregrado
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Sede</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Montalbán
            </dd>
          </div>
        </dl>
      </div>
      {#if student.firedRules && !(student.voteCU && student.voteDIDES)}
        <div class="px-4 py-5 sm:px-6">
          <p class="mt-1 max-w-2xl text-xs text-black font-bold">
            Reglas No Cumplidas
          </p>
          <table class="table-fixed w-full py-2">
            <thead>
              <tr>
                <th class="text-sm font-medium text-gray-500">Nombre</th>
                <th class="text-sm font-medium text-gray-500">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {#each student.firedRules as firedRule}
                <tr>
                  <td
                    class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-center"
                    >{firedRule.name}</td
                  >
                  <td
                    class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-center"
                    >{firedRule.description}</td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
      <div class="px-4 py-5 sm:px-6">
        {#each student.majors as major, index}
          <div class="my-4">
            <p class="mt-1 max-w-2xl text-md text-black font-bold">
              {`Carrera ${index + 1}`}
            </p>
            <dl>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">Nombre</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {getMajor(major.majorCode)?.name}
                </dd>
              </div>
              <div
                class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">Facultad</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {major.facultyCode}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Fecha de Inicio
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {moment(major.startDate).format('DD/MM/YYYY')}
                </dd>
              </div>
              <div
                class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Unidades de Crédito Aprobadas
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {major.approvedUC}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Semestre Actual
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {getSemester(major.currentSemester)?.name}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Duración de la Carrera (En Años)
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {major.years}
                </dd>
              </div>
              <div
                class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Unidades de Crédito Según la malla Curricular
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {major.currentSemesterUC}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  ¿Ha Repetido Semestre?
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {major.hasRepeatedSemester ? 'Si' : 'No'}
                </dd>
              </div>
            </dl>
            <p class="mt-1 max-w-2xl text-xs text-black font-bold">Semestres</p>
            <table class="table-fixed w-full py-2">
              <thead>
                <tr>
                  <th class="text-sm font-medium text-gray-500">Semestre</th>
                  <th class="text-sm font-medium text-gray-500"
                    >Materias Reprobadas</th
                  >
                  <th class="text-sm font-medium text-gray-500">UC Inscritas</th
                  >
                  <th class="text-sm font-medium text-gray-500"
                    >Fecha de Inicio</th
                  >
                  <th class="text-sm font-medium text-gray-500">Fecha Fin</th>
                  <th class="text-sm font-medium text-gray-500"
                    >¿Semestre Actual?</th
                  >
                </tr>
              </thead>
              <tbody>
                {#each major.enrolledSemesters as semester}
                  <tr>
                    <td
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-center"
                      >{semester.semesterCode}</td
                    >
                    <td
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-center"
                      >{semester.failedSubjects}</td
                    >
                    <td
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-center"
                      >{semester.enrolledUC}</td
                    >
                    <td
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-center"
                      >{moment(semester.startDate).format('DD/MM/YYYY')}</td
                    >
                    <td
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-center"
                      >{moment(semester.endDate).format('DD/MM/YYYY')}</td
                    >
                    <td
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-center"
                      >{semester.currentSemester ? 'Si' : 'No'}</td
                    >
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/each}
      </div>
    </div>
  </Modal>
{/if}
