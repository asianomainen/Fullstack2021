import React from "react";
import { useParams } from "react-router-dom";
import { setDiagnosesList, setPatient, useStateValue } from "../state";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import axios from "axios";
import { Diagnosis, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const SinglePatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const addNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      if (id) {
        dispatch(setPatient(updatedPatient));
      }

      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  }

  React.useEffect(() => {
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

    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        )
        dispatch(setDiagnosesList(diagnosesListFromApi))
      } catch (e) {
        console.error(e);
      }
    }

    if (patient === undefined || patient.id !== id) {
      void fetchPatient();
    }

    if (Object.keys(diagnoses).length === 0) {
      void fetchDiagnosesList();
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
      {!patient || patient.id !== id || Object.keys(diagnoses).length === 0 ? (
        <div></div>
      ) : (<div className="App">
        <h3><b>{patient?.name}</b> {patientGender}</h3>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>

        <h4>entries</h4>
        {patient?.entries.map(entry => <EntryDetails entry={entry} />)}

        <div>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={addNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" color="primary" onClick={() => openModal()}>
            Add new entry
          </Button>
        </div>
      </div>)}
    </div>
  );
};

export default SinglePatientPage;
