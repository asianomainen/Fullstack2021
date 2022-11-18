import React from 'react';
import HospitalDetails from './HospitalDetails';
import HealthCheckDetails from './HealthCheckDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';
import { Entry } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  switch (entry.type) {
    case 'Hospital':
      return <HospitalDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
}

export default EntryDetails;