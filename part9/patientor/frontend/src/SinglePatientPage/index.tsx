import React from "react";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const SinglePatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (patient === undefined || patient.id !== id) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
  }, [dispatch]);

  let patientGender;

  switch (patient?.gender) {
    case 'male':
      patientGender = <MaleIcon />
      break
    case 'female':
      patientGender = <FemaleIcon />
      break
    case 'other':
      patientGender = <TransgenderIcon />
      break
    default:
      break
  }

  return (
    <div className="App">
      <h3><b>{patient?.name}</b> {patientGender}</h3>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
    </div>
  );
};

export default SinglePatientPage;
