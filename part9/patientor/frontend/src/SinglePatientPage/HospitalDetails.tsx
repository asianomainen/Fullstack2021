import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Container } from '@mui/material';
import React from 'react';
import { Entry } from '../types';

const HospitalDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const style = {
    border: 'solid',
    borderRadius: '10px',
    marginTop: '5px',
    marginBottom: '5px',
  };

  return (
    <Container style={style}>
      <div>
        <p>
          {entry.date} <MedicalServicesIcon />
        </p>
        <p>
          <i>{entry.description}</i>
        </p>
        <p>diagnose by {entry.specialist}</p>
      </div>
    </Container>
  );
};

export default HospitalDetails;
