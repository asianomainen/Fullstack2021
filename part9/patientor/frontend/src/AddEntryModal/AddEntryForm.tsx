import React from 'react';
import { Field, Form, Formik } from 'formik';
import { HealthCheckRatingOption, SelectField, TextField, TypeOption } from '../AddPatientModal/FormField';
import { EntryType, HealthCheckRating, NewEntry } from '../types';
import { useStateValue } from '../state';
import { Grid } from "@material-ui/core";
import Button from '@mui/material/Button'
import CommonDetails from "./CommonDetails";

export type EntryFormValues = Omit<NewEntry, 'id' | 'type'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryType.HealthCheck, label: "HealthCheck" },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 0 },
  { value: HealthCheckRating.LowRisk, label: 1 },
  { value: HealthCheckRating.HighRisk, label: 2 },
  { value: HealthCheckRating.CriticalRisk, label: 3 },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: EntryType.HealthCheck,
        diagnosisCodes: undefined as Array<string> | undefined,
        employerName: "",
        healthCheckRating: HealthCheckRating.Healthy,
        discharge: {
          date: "",
          criteria: ""
        },
        sickLeave: {
          startDate: "",
          endDate: ""
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = "Description is required";
        }
        if (!values.date) {
          errors.date = "Date is required";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
          errors.date = 'Please format the date as YYYY-MM-DD'
        }
        if (!values.specialist) {
          errors.specialist = "Specialist is required";
        }
        if (values.type === "Hospital") {
          if (!values.discharge) {
            errors.discharge = "Discharge is required";
          }
          if (!values.discharge.date) {
            errors.dischargeDate = "Discharge date is required";
          }
          if (!values.discharge.criteria) {
            errors.dischargeCriteria = "Discharge criteria is required";
          }
        }
        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = "Employer name is required";
          }
          if (!values.sickLeave.startDate) {
            errors.sickLeaveStart = "Sick leave start date is required";
          }
          if (!values.discharge.criteria) {
            errors.sickLeaveEnd = "Sick leave end date is required";
          }
        }
        if (values.type === "HealthCheck") {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = "Health check rating is required";
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            {values.type === "Hospital" &&
              <>
                <CommonDetails setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={diagnoses} />
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            }
            {values.type === "OccupationalHealthcare" &&
              <>
                <CommonDetails setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={diagnoses} />
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStart"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEnd"
                  component={TextField}
                />
              </>
            }
            {values.type === "HealthCheck" &&
              <>
                <CommonDetails setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={diagnoses} />
                <SelectField
                  label="Health check rating"
                  name="healthCheckRating"
                  options={healthCheckRatingOptions}
                />
              </>
            }
            <Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;