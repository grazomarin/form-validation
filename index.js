const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const phoneInput = document.getElementById('phone');
const birthInput = document.getElementById('birth');
const zipInput = document.getElementById('zip');
const fruitInput = document.getElementById('fruit');
const submitBtn = document.getElementById('submit');

const inputs = [
  nameInput,
  emailInput,
  ageInput,
  phoneInput,
  birthInput,
  zipInput,
  fruitInput,
];

const validateInput = (input) => {
  const errorMessage = document.getElementById(`${input.name}-error`);
  if (input.value.length === 0) {
    errorMessage.textContent = "This form can't be empty!";
    return false;
  }

  if (input.name === 'email') {
    // eslint-disable-next-line max-len
    const pattern = /@.*\..*/;
    if (!pattern.test(input.value)) {
      errorMessage.textContent = 'Enter a valid email!';
      return false;
    }
  }

  if (input.name === 'age') {
    if (input.value < 1 || input.value > 100) {
      errorMessage.textContent = 'Enter a valid age!';
      return false;
    }
  }

  if (input.name === 'phone') {
    // eslint-disable-next-line max-len
    const pattern = /(\+\d{1,4})?[ -]?\(?(\d{2,3})\)?[ -]?(\d{3})[ -]?(?:(\d{2})[ -]?(\d{2}))/;
    if (!pattern.test(input.value)) {
      errorMessage.textContent = 'Enter a valid phone number!';
      return false;
    }
  }

  if (input.name === 'zip') {
    const pattern = /^\d{5}(?:[-\s]\d{4})?$/;
    if (!pattern.test(input.value)) {
      errorMessage.textContent = 'Enter a valid zip!';
      return false;
    }
  }

  if (input.name === 'birth') {
    const enteredDate = new Date(input.value);
    const today = new Date();
    if (enteredDate > today) {
      errorMessage.textContent = 'Enter a valid date!';
    }
  }

  if (input.name === 'fruit') {
    const pattern = /[Aa]pple*/;
    if (!pattern.test(input.value)) {
      errorMessage.textContent = 'I know you like apples';
      return false;
    }
  }
  return true;
};

const displayInputError = (input, value) => {
  const errorMessage = document.getElementById(`${input.name}-error`);
  value
    ? (errorMessage.style.display = 'none')
    : (errorMessage.style.display = 'block');
};

const validateForm = (e) => {
  if (!inputs.every((input) => validateInput(input))) {
    e.preventDefault();
    inputs.forEach((input) => {
      displayInputError(input, validateInput(input));
    });
  }
};

inputs.forEach((input) => {
  input.addEventListener('focusout', () => {
    displayInputError(input, validateInput(input));
  });
});

submitBtn.addEventListener('click', (e) => {
  validateForm(e);
});
