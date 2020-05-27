/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
--aiming for exceeds expectations--
******************************************/

// 'hide' function hides whatever element is passed into it
// @param {element} element
function hide(element) {
    element.hidden = true;
};

// 'display' function displays whatever element is passed into it
// @param {element} element
function display(element) {
    element.hidden = false;
};

// 'focusFirstField' function automatically sets the focus on 
// the first text field when the page first loads
function focusFirstField() {           
    document.getElementById("name").focus();
};
focusFirstField();

/**
    --JOB ROLE SECTION--
**/

// Event listener is added so that when the "Other" option is selected 
// from the "Job Role" drop down menu, a previously hidden text field 
// is revealed where the user can type their own response
const otherTitleInput = document.getElementById('other-title');
const jobRoleTitle = document.getElementById('title');
const jobOptionOther = jobRoleTitle[5];

hide(otherTitleInput);

jobRoleTitle.addEventListener('click', (e) => {
    if (e.target.value == jobOptionOther.value) {
        display(otherTitleInput);
    } else {
        hide(otherTitleInput);
    }; 
});

/**
    --T-SHIRT INFO SECTION--
**/

// Color label and drop down menu are initially hidden
const colorSelect = document.getElementById('color');
const colorLabel = colorSelect.labels[0];

hide(colorSelect);
hide(colorLabel);

// A new option element is added to the list of color options, and this element 
// is given text that tells the user to first select a t-shirt theme 
const colorOption1 = colorSelect[0];
const chooseColorMessage = document.createElement('option');

colorSelect.insertBefore(chooseColorMessage, colorOption1);
chooseColorMessage.textContent = 'Please select a T-shirt theme';
chooseColorMessage.setAttribute('selected', '');
hide(chooseColorMessage);

// All the actual color options are hidden
const colorOptions = colorSelect.options;

for (let i = 1; i < colorOptions.length; i++) {
    hide(colorOptions[i]);
};

// Event listener is added to the design drop down menu
// "Select Theme" option is also hidden, so user cannot actually select it as an option
const designMenu = document.getElementById('design');
const designOption0 = designMenu.options[0];

hide(designOption0);

designMenu.addEventListener('change', (e) => {
    const selectedDesign = e.target;
    const designJSPuns = designMenu.options[1];
    const designHeartJS = designMenu.options[2];

    // displays the color label and drop down menu
    function showColorField() {
        display(colorLabel);
        display(colorSelect);
        chooseColorMessage.textContent = 'Select Color'; // -text of the option created earlier is changed (since now a design has been chosen)
        chooseColorMessage.selected = true;
    };

    // only displays the color options that match the design the user selected
    if (selectedDesign.value === designJSPuns.value) {
        showColorField();
        for (let i = 1; i <= 3; i++) {
            display(colorOptions[i]);
        };
        for (let i = 4; i <= 6; i++) {
            hide(colorOptions[i]);
        };
    } else if (selectedDesign.value === designHeartJS.value) {
        showColorField();
        for (let i = 1; i < 4; i++) {
            hide(colorOptions[i]);
        };
        for (let i = 4; i < 7; i++) {
            display(colorOptions[i]);
        };
    };
});

/**
    --REGISTER FOR ACTIVITIES SECTION--
**/

// New h3 element added to display the total cost of the activities
// (but it is only displayed later once a user actually starts to select activities)
let cost = 0;
const activitiesFieldset = document.querySelector('.activities');
const totalCostHTML = document.createElement('h3');
activitiesFieldset.appendChild(totalCostHTML);

// Event listener is added to activities section
activitiesFieldset.addEventListener('change', (e) => {
    const activitiesCheckboxes = document.querySelectorAll('.activities input');
    const clickedCheckbox = e.target;
    
    // when the user selects a workshop, any other workshops that are at the same time are disabled 
    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        const clickedDayTime = clickedCheckbox.getAttribute('data-day-and-time');
        const checkboxDayTime = activitiesCheckboxes[i].getAttribute('data-day-and-time');
        
        if (clickedDayTime === checkboxDayTime && clickedCheckbox !== activitiesCheckboxes[i]) {
            if (clickedCheckbox.checked) {
                activitiesCheckboxes[i].disabled = true;  
                activitiesCheckboxes[i].parentNode.style.color = 'gray';            
            } else {
                activitiesCheckboxes[i].disabled = false;
                activitiesCheckboxes[i].parentNode.style.color = 'black';  
            };
        };
    };
    
    // as a user selects/deselects activities, the total cost is displayed and updated
    display(totalCostHTML);
    const clickedCost = parseInt(clickedCheckbox.getAttribute('data-cost'));
    
    if (clickedCheckbox.checked) {
        cost += clickedCost;
    } else {
        cost -= clickedCost;
    };
    totalCostHTML.textContent = `Total Cost: $${cost}`;
});

/**
    --PAYMENT INFO SECTION--
**/

// PayPal and Bitcoin divs are initially hidden, and only Credit Card div is displayed
const divCreditCard = document.getElementById('credit-card');
const divPayPal = document.getElementById('paypal');
const divBitcoin = document.getElementById('bitcoin');

hide(divPayPal);
hide(divBitcoin);

// "Select Payment Method" option is hidden, so user cannot actually select it as an option
let creditCardSelected = true;
const paymentMenu = document.getElementById('payment');
const paymentOption0 = paymentMenu.options[0];
const paymentCreditCard = paymentMenu.options[1];
const paymentPayPal = paymentMenu.options[2];
const paymentBitcoin = paymentMenu.options[3];

paymentCreditCard.setAttribute('selected', '');
hide(paymentOption0);

// Event listener is added to the payment drop down menu
paymentMenu.addEventListener('change', (e) => {
    const clickedPayment = e.target;

    // displays the payment info based on the payment option the user chooses
    if (clickedPayment.value === paymentCreditCard.value) {
        display(divCreditCard);
        hide(divPayPal);
        hide(divBitcoin);
    } else if (clickedPayment.value === paymentPayPal.value) {
        creditCardSelected = false;
        hide(divCreditCard);
        display(divPayPal);
        hide(divBitcoin);
    } else if (clickedPayment.value === paymentBitcoin.value) {
        creditCardSelected = false;
        hide(divCreditCard);
        hide(divPayPal);
        display(divBitcoin);
    };
});

/**
    --FORM VALIDATION AND MESSAGES--
**/

const nameInput = document.getElementById('name'); // this input will have real-time error messaging
const emailInput = document.getElementById('mail');  // this input will have real-time (AND conditional) error messaging
const activitiesInput = document.querySelectorAll('.activities input'); // this input will have real-time error messaging
const creditCardInput = document.getElementById('cc-num'); // this input will have real-time error messaging
const zipCodeInput = document.getElementById('zip'); // this input will have real-time error messaging
const cvvInput = document.getElementById('cvv'); // this input will have real-time error messaging

// `error` function displays an error message when called
// @param {element} element
// @param {string} message - the message to be displayed for the given error
// @param {string} labelId - an id assigned to the newly created errorLabel
function displayError(element, message, labelId) {
    let errorLabel = document.createElement('label');
    errorLabel.className = 'error';
    errorLabel.id = labelId;
    element.parentNode.insertBefore(errorLabel, element);
    document.getElementById(labelId).textContent = message;
};

// Name validation function - ensures name input is not blank, and that two names are provided
function nameValid() {
    const nameValue = nameInput.value;
    const testName = /^[a-z\s]+ [a-z\s]+$/i.test(nameValue);
    
    if (testName === true) {
        nameInput.style.borderColor = 'white';
        displayError(nameInput, '', 'name-error');
        return true;
    } else {
        nameInput.style.borderColor = 'red';
        displayError(nameInput, 'Please include both your first and last name.', 'name-error');
        return false;
    };
};

// Email validation function - ensures the input is a validly formatted e-mail address
// -please note that this function has conditional error messaging that displays a different
//  error depending on if nothing was entered or if the email is formatted incorrectly
function emailValid() {
    const emailValue = emailInput.value;
    const testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    const testAt = emailValue.indexOf('@');
    const testDot = emailValue.indexOf('.');
    
    if (testEmail === true) {
        emailInput.style.borderColor = 'white';
        displayError(emailInput, '', 'email-error');
        return true;
    } else if (emailValue === '') {
        emailInput.style.borderColor = 'red';
        displayError(emailInput, 'Please enter an email address.', 'email-error');
        return false;
    } else if (testAt === -1 || testDot === -1) {
        emailInput.style.borderColor = 'red';
        displayError(emailInput, 'Please enter a valid email (must be in the format name@gmail.com).', 'email-error');
        return false;
    };
};

// Activities validation function - ensures that the user selects at least one activity
function activitiesValid() {
    const firstActivityInput = document.querySelectorAll('.activities input')[0];
    const activitiesLegend = activitiesFieldset.firstElementChild;
    
    for (let i = 0; i < activitiesInput.length; i++) {
        if (activitiesInput[i].checked) {
            displayError(firstActivityInput, '', 'activities-error');
            return true;
        };    
    };
    displayError(firstActivityInput, 'You must select at least one activity.', 'activities-error');
    return false;
};

// Credit card number validation function - ensures the input only accepts a number between 13 and 16 digits
function creditCardValid() {
    const creditCardValue = creditCardInput.value;
    const testCreditCard = /^\d{13,16}$/.test(creditCardValue);
    
    if (testCreditCard === true) {
        creditCardInput.style.borderColor = 'white';
        displayError(creditCardInput, '', 'cc-error');
        return true;
    } else {
        creditCardInput.style.borderColor = 'red';
        displayError(creditCardInput, 'Please enter a valid credit card number (must be between 13-16 digits long).', 'cc-error');
        return false;
    };
};

// Zip Code validation function - ensures the input only accepts a 5-digit number
function zipCodeValid() {
    const zipCodeValue = zipCodeInput.value;
    const testZipCode = /^\d{5}$/.test(zipCodeValue);
    
    if (testZipCode === true) {
        zipCodeInput.style.borderColor = 'white';
        displayError(zipCodeInput, '', 'zip-error');
        return true;
    } else {
        zipCodeInput.style.borderColor = 'red';
        displayError(zipCodeInput, 'Please enter a valid zip code (must be 5 digits long).', 'zip-error');
        return false;
    };
};

// CVV validation function - ensures the input only accepts a number that is exactly 3 digits long
function cvvValid() {
    const cvvValue = cvvInput.value;
    const testCVV = /^\d{3}$/.test(cvvValue);
    if (testCVV === true) {
        cvvInput.style.borderColor = 'white';
        displayError(cvvInput, '', 'cvv-error');
        return true;
    } else {
        cvvInput.style.borderColor = 'red';
        displayError(cvvInput, 'Please enter a valid CVV number (must be 3 digits long).', 'cvv-error');
        return false;
    };
};

// Event listeners are added to several inputs to add real-time error messaging functionality
nameInput.addEventListener('input', nameValid);
emailInput.addEventListener('input', emailValid);
activitiesFieldset.addEventListener('input', activitiesValid);
creditCardInput.addEventListener('input', creditCardValid);
zipCodeInput.addEventListener('input', zipCodeValid);
cvvInput.addEventListener('input', cvvValid);

// Event listener added to the "Register" button
// -if any of the validation functions return false, the appropriate error messages are displayed
const regButton = document.getElementsByTagName('button')[0];

regButton.addEventListener('click', (e) => {
    if (!nameValid()) {
        e.preventDefault();
        console.log('invalid name prevented submission');
    };
    if (!emailValid()) {
        e.preventDefault();
        console.log('invalid email prevented submission');
    };
    if (!activitiesValid()) {
        e.preventDefault();
        console.log('invalid activities prevented submission');
    };
    if (!creditCardValid() && creditCardSelected === true) {
        e.preventDefault();
        console.log('invalid credit card number prevented submission');
    };
    if (!zipCodeValid() && creditCardSelected === true) {
        e.preventDefault();
        console.log('invalid zip code prevented submission');
    };
    if (!cvvValid() && creditCardSelected === true) {
        e.preventDefault();
        console.log('invalid cvv prevented submission');
    };
});