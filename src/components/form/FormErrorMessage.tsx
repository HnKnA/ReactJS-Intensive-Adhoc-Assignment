import React from "react";

type FormErrorMessageProps = {
  error?: string | string[] | { [key: string]: any };
  touched?: boolean | boolean[] | { [key: string]: any };
};

function FormErrorMessage({ error, touched }: FormErrorMessageProps) {
  // Check if there's a valid error and the field is touched
  if (!touched || !error) return <></>;

  // Retrieve the error message for arrays or nested objects
  const getErrorMessage = (error: any): string => {
    if (typeof error === "string") return error;
    if (Array.isArray(error)) {
      return error.find((e) => typeof e === "string") || ""; // Find the first string in the array
    }
    if (typeof error === "object") {
      return (
        Object.values(error)
          .find((e) => typeof e === "string")
          ?.toString() || ""
      ); // Find the first string in the object
    }
    return "";
  };

  return <div className="text-red-600 text-sm">{getErrorMessage(error)}</div>;
}

export default FormErrorMessage;
