import React from "react";
import { useFormikContext, getIn } from "formik";
import DatePicker from "react-datepicker";
import { handleDateRawChange } from "../../utils/handleDateRawChange";
import { calculateAge } from "../../utils/calculateAge";
import useOfficerMode from "../../hooks/useOfficerMode";

interface DateChoosingProps {
  /** The name of the Formik field, e.g., "dob" */
  name: string;
  withAgeCalculate?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  onFocus?: () => void;
  readOnly?: boolean;
}

/**
 * DateChoosing:
 * A reusable DatePicker component that only needs the Formik field name.
 */
const DateChoosing = ({
  name,
  withAgeCalculate,
  minDate = new Date("1900-01-01"),
  maxDate = new Date(),
  placeholderText = "DD/MM/YYYY",
  onFocus,
  readOnly,
}: DateChoosingProps) => {
  // Access the current Formik context to get/set field values
  const {
    values,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
    handleBlur,
  } = useFormikContext<any>();

  const { isOfficer } = useOfficerMode();

  // Safely get nested values
  const fieldValue = getIn(values, name);
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  return (
    <>
      <DatePicker
        // Default props / consistent config
        todayButton="Move to Today"
        showIcon
        toggleCalendarOnIconClick
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholderText}
        maxDate={maxDate}
        minDate={minDate}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className="w-full px-4 py-2 mt-2 border rounded-md
                   focus:outline-none focus:ring-2 focus:ring-secondary-color"
        // Dynamically linked to the field name
        id={name}
        name={name}
        selected={fieldValue}
        onChange={(date: Date | null) => {
          setFieldValue(name, date);
          setFieldTouched(name, true);
          if (withAgeCalculate && date !== null) {
            setFieldValue("age", calculateAge(date));
          }
        }}
        onBlur={() => {
          setFieldTouched(name, true);
          handleBlur(name);
        }}
        onChangeRaw={handleDateRawChange}
        onFocus={onFocus}
        readOnly={readOnly}
      />

      {/* Optional: Display Formik field error for this field */}
      {!isOfficer && fieldTouched && fieldError && !fieldValue && (
        <div className="text-red-600 text-sm">{fieldError as string}</div>
      )}
    </>
  );
};

export default DateChoosing;
