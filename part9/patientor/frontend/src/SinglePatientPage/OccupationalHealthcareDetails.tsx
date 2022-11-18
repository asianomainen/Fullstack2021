import React from 'react';
import { Container } from "@material-ui/core";
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({
                                                                                           entry
                                                                                         }) => {

  const style = {
    border: 'solid',
    borderRadius: '10px',
    marginTop: '5px',
    marginBottom: '5px',
  };

  return (
    <div>
      <Container style={style}>
        <div>
          <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
          <p><i>{entry.description}</i></p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      </Container>
    </div>
  );
};

export default OccupationalHealthcareDetails;