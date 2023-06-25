export const replaceStateWithQuery = (
  values: Record<string, string | undefined | null>
) => {
  const url = new URL(window.location.toString());
  for (const [k, v] of Object.entries(values)) {
    if (v) {
      url.searchParams.set(k, v);
    } else {
      url.searchParams.delete(k);
    }
  }
  history.replaceState(history.state, '', url);
};

interface SearchParams {
  [key: string]: string;
}

export const getUrlSearchParams = (): SearchParams => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {} as SearchParams;

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};

export const major = [
  {
    name: 'Ingeniería Informática',
    value: 'IINF',
    facultyCode: 'FING',
    years: 5,
  },
  { name: 'Ingeniería Civil', value: 'ICIV', facultyCode: 'FING', years: 5 },
  {
    name: 'Ingeniería Industrial',
    value: 'IIND',
    facultyCode: 'FING',
    years: 5,
  },
  {
    name: 'Ingeniería Telecomunicaciones',
    value: 'ITEL',
    facultyCode: 'FING',
    years: 5,
  },
  { name: 'Arquitectura', value: 'ARQ', facultyCode: 'FING', years: 5 },
  { name: 'Filosofía', value: 'FIL', facultyCode: 'FAHD', years: 4 },
  { name: 'Psicología', value: 'PSI', facultyCode: 'FAHD', years: 5 },
  { name: 'Letras', value: 'LET', facultyCode: 'FAHD', years: 4 },
  { name: 'Comunicación Social', value: 'COM', facultyCode: 'FAHD', years: 5 },
  { name: 'Educación', value: 'EDU', facultyCode: 'FAHD', years: 4 },
  {
    name: 'Administración de Empresas',
    value: 'ADE',
    facultyCode: 'FACES',
    years: 5,
  },
  { name: 'Contaduría Pública', value: 'CON', facultyCode: 'FACES', years: 5 },
  {
    name: 'Relaciones Industriales',
    value: 'RIN',
    facultyCode: 'FACES',
    years: 4,
  },
  { name: 'Sociología', value: 'SOC', facultyCode: 'FACES', years: 4 },
  { name: 'Economía', value: 'ECO', facultyCode: 'FACES', years: 4 },
  { name: 'Derecho', value: 'DER', facultyCode: 'FDER', years: 5 },
  { name: 'Teología', value: 'TEO', facultyCode: 'FTEO', years: 5 },
];

export const ingressStatus = [
  { name: 'Retiro Retroactivo', value: 'DR' },
  { name: 'Retiro Total', value: 'DT' },
  { name: 'Inscripción Regular', value: 'IR' },
  { name: 'Inscripción Extemporánea', value: 'IE' },
  { name: 'Inscripción Tardía', value: 'IT' },
  { name: 'Modificación de Inscripción', value: 'MI' },
  { name: 'Tesis de Grado', value: 'TG' },
];

export const semester = [
  { name: 'Primer Semestre', value: 1 },
  { name: 'Segundo Semestre', value: 2 },
  { name: 'Tercer Semestre', value: 3 },
  { name: 'Cuarto Semestre', value: 4 },
  { name: 'Quinto Semestre', value: 5 },
  { name: 'Sexto Semestre', value: 6 },
  { name: 'Séptimo Semestre', value: 7 },
  { name: 'Octavo Semestre', value: 8 },
  { name: 'Noveno Semestre', value: 9 },
  { name: 'Décimo Semestre', value: 10 },
];

export const currentSemesterUC = [
  { semester: 1, value: 0, years: 0 },
  { semester: 2, value: 25, years: 1 },
  { semester: 3, value: 50, years: 1 },
  { semester: 4, value: 77, years: 2 },
  { semester: 5, value: 109, years: 2 },
  { semester: 6, value: 170, years: 3 },
  { semester: 7, value: 204, years: 3 },
  { semester: 8, value: 229, years: 4 },
  { semester: 9, value: 259, years: 4 },
  { semester: 9, value: 297, years: 5 },
];

export const getMajor = (majorCode: string) => {
  return major.find((m) => m.value === majorCode);
};

export const getIngressStatus = (ingressStatusCode: string) => {
  return ingressStatus.find((i) => i.value === ingressStatusCode);
};

export const getSemester = (semesterCode: number) => {
  return semester.find((s) => s.value === semesterCode);
};
