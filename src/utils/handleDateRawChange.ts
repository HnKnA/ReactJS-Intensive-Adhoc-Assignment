// Handle input raw data changes in DatePicker component
export const handleDateRawChange = (
  event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
) => {
  if (
    event &&
    "currentTarget" in event &&
    event.currentTarget instanceof HTMLInputElement
  ) {
    const inputElement = event.currentTarget;
    const { selectionStart, selectionEnd } = inputElement; // Track caret position
    let { value } = inputElement;

    // Remove any characters that are not digits
    let rawValue = value.replace(/[^0-9]/g, "");

    // Ensure formatting as dd/mm/yyyy
    let formattedValue = rawValue;
    if (rawValue.length > 2 && rawValue.length <= 4) {
      formattedValue = `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
    } else if (rawValue.length > 4) {
      formattedValue = `${rawValue.slice(0, 2)}/${rawValue.slice(
        2,
        4
      )}/${rawValue.slice(4, 8)}`;
    }

    // Adjust caret position
    let newCaretPosition = selectionStart || 0;
    if (formattedValue.length > value.length) {
      // Adding a slash
      newCaretPosition += formattedValue.length - value.length;
    } else if (
      formattedValue.length < value.length &&
      selectionStart === selectionEnd
    ) {
      // Deleting characters
      newCaretPosition -= value.length - formattedValue.length;
    }

    // Update the input value
    inputElement.value = formattedValue;

    // Keep caret position within bounds
    if (newCaretPosition > formattedValue.length) {
      newCaretPosition = formattedValue.length;
    }

    // Set the adjusted caret position
    inputElement.setSelectionRange(newCaretPosition, newCaretPosition);

    // Prevent input longer than dd/mm/yyyy
    if (rawValue.length > 8) {
      event.preventDefault();
    }
  }
};
