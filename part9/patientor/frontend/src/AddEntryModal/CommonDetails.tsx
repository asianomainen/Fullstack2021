import { Field } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import React from "react";

// @ts-ignore
const CommonDetails = ({ setFieldValue, setFieldTouched, diagnoses }) => {
  return (
    <div>
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={TextField}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Specialist"
        name="specialist"
        component={TextField}
      />
      <DiagnosisSelection
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        diagnoses={Object.values(diagnoses)}
      />
    </div>
  )
}

export default CommonDetails