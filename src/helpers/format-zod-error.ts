export function formatZodErrorMessage(error: any): string {
  const field = error.path.join(".");

  switch (error.code) {
    case "invalid_type":
      if (error.received === "undefined") {
        return `The field '${field}' is required`;
      }

      if (error.received === "null") {
        return `The field '${field}' cannot be null`;
      }

      return `The field '${field}' must be a ${error.expected}`;

    case "invalid_string":
      if (error.validation === "email") {
        return `The field '${field}' must be a valid email address`;
      }

      if (error.validation === "url") {
        return `The field '${field}' must be a valid URL`;
      }

      if (error.validation === "uuid") {
        return `The field '${field}' must be a valid UUID`;
      }

      return `The field '${field}' contains invalid characters`;

    case "too_small":
      if (error.type === "string") {
        return `The field '${field}' must be at least ${error.minimum} characters long`;
      }

      if (error.type === "array") {
        return `The field '${field}' must have at least ${error.minimum} items`;
      }

      return `The field '${field}' must be at least ${error.minimum}`;

    case "too_big":
      if (error.type === "string") {
        return `The field '${field}' must be at most ${error.maximum} characters long`;
      }

      if (error.type === "array") {
        return `The field '${field}' must have at most ${error.maximum} items`;
      }

      return `The field '${field}' must be at most ${error.maximum}`;

    case "invalid_enum_value": {
      const options = error.options.join(", ");

      return `The field '${field}' must be one of: ${options}`;
    }

    case "unrecognized_keys":
      return `The field '${field}' contains unrecognized keys: ${error.keys.join(
        ", "
      )}`;

    case "invalid_arguments":
      return `Invalid arguments for the field '${field}'`;

    case "invalid_return_type":
      return `Invalid return type for the field '${field}'`;

    case "invalid_date":
      return `The field '${field}' must be a valid date`;

    case "custom":
      return error.message || `The field '${field}' is invalid`;

    default:
      return `The field '${field}' is invalid`;
  }
}
