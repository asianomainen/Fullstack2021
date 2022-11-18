import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Button, Container, Divider, Typography } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { setDiagnosesList, setPatientList, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import SinglePatientPage from "./SinglePatientPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
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

    void fetchPatientList();
    void fetchDiagnosesList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/api/patients/:id" element={<SinglePatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
