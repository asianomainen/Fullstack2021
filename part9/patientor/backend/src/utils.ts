import {Gender, NewPatientEntry} from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry => {
  return {
    name: parseIsString(name),
    dateOfBirth: parseIsString(dateOfBirth),
    ssn: parseIsString(ssn),
    gender: parseGender(gender),
    occupation: parseIsString(occupation)
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


export default toNewPatientEntry;