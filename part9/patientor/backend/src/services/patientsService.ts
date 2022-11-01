import patientsData from '../data/patients.json';
import {v1 as uuid} from 'uuid';

import {NewPatientEntry, Patient, SsnRemovedPatient} from "../types";

const ssnRemovedPatients: Array<SsnRemovedPatient> = patientsData;
const patients: Array<Patient> = patientsData;

const getPatients = (): Array<SsnRemovedPatient> => {
  return ssnRemovedPatients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  findById,
  addPatient
};