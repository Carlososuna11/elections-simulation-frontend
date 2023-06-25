export type alertColor =
  | 'form'
  | 'gray'
  | 'red'
  | 'yellow'
  | 'green'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'blue'
  | 'light'
  | 'dark'
  | 'default'
  | 'dropdown'
  | 'navbar'
  | 'navbarUl'
  | 'primary'
  | 'none'
  | undefined;

export type Alert = {
  message: string;
  color: alertColor;
  visible: boolean;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type Data = {
  [key: string]: unknown;
};

export type FiredRules = {
  name: string;
  description: string;
};

export type EnrolledSemester = {
  semesterCode: number;

  failedSubjects: number;

  enrolledUC: number;

  currentSemester: boolean;

  startDate: Date;

  endDate: Date;
};

export type Major = {
  majorCode: string;

  facultyCode: string;

  startDate: Date;

  endDate: Date;

  approvedUC: number;

  currentSemester: number;

  currentSemesterUC: number;

  enrolledSemesters: EnrolledSemester[];

  currentEnrolledSemester: EnrolledSemester;

  years: number;

  hasRepeatedSemester: boolean;
};

export type Sanction = {
  sanctionCode: string;

  startDate: Date;

  endDate?: Date;
};

export type Student = {
  id: string;

  estuNombre: string;

  estuCedula: string;

  estuStatusInscCode: string;

  programLevelCode: string;

  programCampCode: string;

  majors: Major[];

  sanctions: Sanction[];
};

export type StudentElector = {
  id: string;

  estuNombre: string;

  estuCedula: string;

  estuStatusInscCode: string;

  programLevelCode: string;

  programCampCode: string;

  majors: Major[];

  sanctions: Sanction[];

  voteCU?: boolean;

  voteDIDES?: boolean;

  voteSchool?: string;

  voteFaculty?: string;

  currentMajor?: Major;

  currentEnrolledSemester?: EnrolledSemester;

  firedRules?: FiredRules[];
};

export type StudentPostulant = {
  id: string;

  estuNombre: string;

  estuCedula: string;

  estuStatusInscCode: string;

  programLevelCode: string;

  programCampCode: string;

  majors: Major[];

  sanctions: Sanction[];

  candidateCU?: boolean;

  candidateDIDES?: boolean;

  candidateSchool?: string;

  candidateFaculty?: string;

  currentMajor?: Major;

  lastSanction?: Sanction;

  firedRules?: FiredRules[];
};
