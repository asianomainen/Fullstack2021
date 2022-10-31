import patientsData from '../data/patients.json';

import {SsnRemovedPatient} from "../types";

const patients: Array<SsnRemovedPatient> = patientsData;

const getPatients = (): Array<SsnRemovedPatient> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
};