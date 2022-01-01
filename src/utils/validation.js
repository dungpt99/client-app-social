import validator from "is_js";

const checkEmpty = (val, key) => {
  if (validator.empty(val.trim())) {
    return `${key}`;
  } else {
    return "";
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `Please enter valid ${key}`;
  } else {
    return "";
  }
};

export default function (data) {
  const { name, email, password } = data;

  if (name !== undefined) {
    let emptyValidationText = checkEmpty(name, "Please enter name!");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(name, 3, "name");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }

  if (email !== undefined) {
    let emptyValidationText = checkEmpty(email, "Please enter email!");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      if (!validator.email(email)) {
        return "Please enter valid email";
      }
    }
  }
  if (password !== undefined) {
    let emptyValidationText = checkEmpty(password, "Please enter password!");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(password, 3, "password");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
}
