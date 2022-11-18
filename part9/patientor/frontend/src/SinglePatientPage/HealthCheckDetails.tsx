import React from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Container } from '@mui/material';
import { green, orange, red, yellow } from '@mui/material/colors';
import { HealthCheckEntry, HealthCheckRating } from '../types';

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const colors = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return green[500];
      case HealthCheckRating.LowRisk:
        return yellow[500];
      case HealthCheckRating.HighRisk:
        return orange[500];
      case HealthCheckRating.CriticalRisk:
        return red[500];
      default:
        return red;
    }
  };

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
          <p>
            {entry.date} <MedicalServicesIcon />
          </p>
          <p>
            <i>{entry.description}</i>
          </p>
          <p>
            <FavoriteIcon sx={{ color: colors(entry.healthCheckRating) }} />
          </p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      </Container>
    </div>
  );
};

export default HealthCheckDetails;
