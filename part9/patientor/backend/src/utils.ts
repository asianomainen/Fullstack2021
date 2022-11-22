import { BaseEntry, Discharge, Gender, HealthCheckRating, NewEntry, NewPatientEntry, SickLeave } from "./types";

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatientEntry => {
  return {
    name: parseIsString(name),
    dateOfBirth: parseIsString(dateOfBirth),
    ssn: parseIsString(ssn),
    gender: parseGender(gender),
    occupation: parseIsString(occupation),
    entries: []
  };
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseIsString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect parameter: ' + param);
  }

  return param;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

type EntryFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  type: unknown,
  diagnosisCodes?: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown,
  healthCheckRating?: unknown
};

const toNewDiagnosisEntry = ({
                               description,
                               date,
                               specialist,
                               diagnosisCodes,
                               type,
                               discharge,
                               employerName,
                               sickLeave,
                               healthCheckRating
                             }: EntryFields): NewEntry | undefined => {

  const newDiagnosisEntry: Omit<BaseEntry, 'id'> = {
    date: parseIsString(date),
    description: parseIsString(description),
    specialist: parseIsString(specialist),
    diagnosisCodes: parseIsDiagnosisCodes(diagnosisCodes),
  };

  switch (type) {
    case 'Hospital':
      return {
        ...newDiagnosisEntry,
        type: type,
        discharge: parseIsDischarge(discharge)
      };
    case 'HealthCheck':
      return {
        ...newDiagnosisEntry,
        type: type,
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        ...newDiagnosisEntry,
        type: type,
        sickLeave: parseSickLeave(sickLeave),
        employerName: parseIsString(employerName)
      };
    default:
      return undefined;
  }
};

const isArray = (diagnosisCodes: unknown): diagnosisCodes is Array<string> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Array.isArray(diagnosisCodes) && diagnosisCodes.every(code => (isString(code)));
};

const parseIsDiagnosisCodes = (diagnosisCodes: unknown): Array<string> | undefined => {
  if (!diagnosisCodes) return undefined;

  if (!isArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
  }

  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseIsDischarge = (discharge: any): Discharge => {
  if (!discharge.date || !isString(discharge.date)) {
    throw new Error('Incorrect discharge date');
  }

  if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('Incorrect discharge criteria');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect health check rating');
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!sickLeave) return sickLeave;

  if (!sickLeave.startDate) {
    throw new Error('Incorrect sick leave start date');
  }

  if (!sickLeave.endDate) {
    throw new Error('Incorrect sick leave end date');
  }

  const startDate = parseIsString(sickLeave.startDate);
  const endDate = parseIsString(sickLeave.endDate);

  return {
    startDate,
    endDate
  };
};

export default {
  toNewPatientEntry,
  toNewDiagnosisEntry
};