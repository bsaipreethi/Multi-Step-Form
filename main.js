// Selecting DOM elements
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".step");
const nextButtons = [
  document.getElementById("next1"),
  document.getElementById("next2"),
];
const backButtons = [
  document.getElementById("back1"),
  document.getElementById("back2"),
];
const form = document.getElementById("multiStepForm");
const summaryDiv = document.getElementById("summary");

let currentStep = 0;
let formData = {}; // Local state for storing form data

// Function to update form step
function updateStep(step) {
  formSteps.forEach((stepElement, index) => {
    stepElement.classList.toggle("active", index === step);
    progressSteps[index].classList.toggle("active", index <= step);
  });

  // Show the summary on step 3
  if (step === 2) {
    displaySummary();
  }
}

// Function to store form data in local state
function saveFormData() {
  const inputs = formSteps[currentStep].querySelectorAll("input, select");
  inputs.forEach((input) => {
    formData[input.id] = input.value.trim(); // Store values in formData object
  });
}

// Function to load saved data into fields
function loadFormData() {
  const inputs = formSteps[currentStep].querySelectorAll("input, select");
  inputs.forEach((input) => {
    if (formData[input.id]) {
      input.value = formData[input.id]; // Autofill input with stored value
    }
  });
}

// Function to validate fields before proceeding
function validateStep(step) {
  let valid = true;
  const inputs = formSteps[step].querySelectorAll("input, select");
  const errorMessage = formSteps[step].querySelector(".error-message");
  errorMessage.textContent = "";

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      valid = false;
      errorMessage.textContent = "Please fill all fields.";
    }
  });

  if (step === 1) {
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!email.endsWith("@gmail.com")) {
      valid = false;
      errorMessage.textContent =
        "Email must be in the format: example@gmail.com";
    } else if (!/^\d{10}$/.test(phone)) {
      valid = false;
      errorMessage.textContent = "Phone number must be exactly 10 digits.";
    }
  }

  return valid;
}

// Function to display summary before submission
function displaySummary() {
  summaryDiv.innerHTML = `
        <p class="warning-message">⚠️ Please check the details carefully. Once submitted, you **cannot** make any changes.</p>
        <p><strong>Name:</strong> ${formData["name"] || ""}</p>
        <p><strong>Date of Birth:</strong> ${formData["dob"] || ""}</p>
        <p><strong>Gender:</strong> ${formData["gender"] || ""}</p>
        <p><strong>Email:</strong> ${formData["email"] || ""}</p>
        <p><strong>Phone:</strong> ${formData["phone"] || ""}</p>
        <p><strong>Address:</strong> ${formData["address"] || ""}</p>
    `;
}

// Next buttons logic
nextButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      saveFormData(); // Save entered data before moving forward
      currentStep++;
      updateStep(currentStep);
      loadFormData(); // Load saved data in case user navigates back
    }
  });
});

// Back buttons logic
backButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    saveFormData(); // Save before going back
    currentStep--;
    updateStep(currentStep);
    loadFormData(); // Load saved data
  });
});

// Form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  alert("Form submitted successfully! Redirecting to Step 1...");

  form.reset();
  formData = {}; // Clear local state

  currentStep = 0; // Reset to step 1
  updateStep(currentStep);
});
