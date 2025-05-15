// Elements

const contactFormElement = document.getElementById(
  "contact-form"
) as HTMLFormElement;

const reqMsgEle = document.getElementById(
  "all-required-msg"
) as HTMLParagraphElement;

const successMsgContainer = document.getElementById(
  "success-msg-container"
) as HTMLDivElement;

const submissionErrorMsgContainer = document.getElementById(
  "submission-error-msg-container"
) as HTMLDivElement;

const invalidEmailMsgContainer = document.getElementById(
  "invalid-email-msg"
) as HTMLDivElement;

const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

////////////////////////////

interface ErrorObject {
  name: string;
  isInvalid: boolean;
}

let errorsList: ErrorObject[] = [];



contactFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  submissionErrorMsgContainer.classList.replace("block", "hidden");

  if (!e.target) return;
  const formEle = e.target as HTMLFormElement;

  errorsList = [];

  const formData = new FormData(formEle);
  const dataEntries = Object.entries(Object.fromEntries(formData.entries()));

  dataEntries.forEach((input) => handleValidation(input));

  // If any inputs invalid, return;
  if (errorsList.length >= 1) {
    reqMsgEle.classList.replace("text-white", "text-error-red");
    return;
  }

  // On Success
  handleFormSubmission();

});


const handleValidation = (input: [string, FormDataEntryValue]) => {
  const inputName = input[0] as string;
  const inputValue = input[1] as string;

  if (inputValue.length <= 0) {
    handleValidationStyles({ name: inputName, isInvalid: true });
    errorsList.push({ name: inputName, isInvalid: true });
    return;
  }

  if (inputName === "email" && handleEmailValidation(inputValue)) {
    handleValidationStyles({ name: inputName, isInvalid: true });
    invalidEmailMsgContainer.classList.replace("hidden", "block");
    errorsList.push({ name: inputName, isInvalid: true });
    return;
  }

  invalidEmailMsgContainer.classList.replace("block", "hidden");
  handleValidationStyles({ name: inputName, isInvalid: false });
  errorsList.filter((errItem) => errItem.name !== inputName);
};


const handleEmailValidation = (email: string) => {
  return !new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(email);
};


const handleValidationStyles = ({ name, isInvalid }: ErrorObject) => {
  const inputEle = document.getElementById(name);
  if (inputEle && isInvalid) {
    inputEle.classList.replace("border-white/0", "border-error-red");
  }
  if (inputEle && !isInvalid) {
    inputEle.classList.replace("border-error-red", "border-white/0");
  }
};


const handleFormSubmission = async () => {

  const formData = new FormData(contactFormElement);
  const envAccess = import.meta.env.PUBLIC_WEB3_FORM_ACCESS_KEY;

  if (!envAccess) return

  formData.append("access_key", envAccess)

  const jsonFormObject = JSON.stringify(Object.fromEntries(formData));

  const submittedResponse = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: jsonFormObject,
  });

  const result = await submittedResponse.json();

  if (result.success) {
    submissionErrorMsgContainer.classList.replace("block", "hidden");
    reqMsgEle.classList.replace("text-error-red", "text-white");
    reqMsgEle.classList.add("hidden");
    submitBtn.disabled = true;
    successMsgContainer.classList.replace("hidden", "block");
  } else {
    submissionErrorMsgContainer.classList.replace("hidden", "block");
  }
};
