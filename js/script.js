/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
--aiming for exceeds expectations--
******************************************/

// 'hide' function hides whatever element is passed into it
function hide(element) {
    element.hidden = true;
};

// 'display' function displays whatever element is passed into it
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
        chooseColorMessage.textContent = 'Select Color'; // -text of the option created earlier is changed
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
const activitiesFieldset = document.querySelector('.activities');
const totalCostHTML = document.createElement('h3');
activitiesFieldset.appendChild(totalCostHTML);
let cost = 0;

// Event listener is added to activities section
activitiesFieldset.addEventListener('change', (e) => {
    const activitiesCheckboxes = document.querySelectorAll('.activities input');
    const clickedCheckbox = e.target;
    
    // when the user selects a workshop, any other workshops that are at the same time are disabled 
    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        const clickedDayTime = clickedCheckbox.getAttribute('data-day-and-time');
        const checkboxDayTime = activitiesCheckboxes[i].getAttribute('data-day-and-time');
        const activitiesLabels = document.querySelectorAll('.activities label');

        if (clickedDayTime === checkboxDayTime && clickedCheckbox !== activitiesCheckboxes[i]) {
            if (clickedCheckbox.checked) {
                activitiesCheckboxes[i].disabled = true;  
                activitiesLabels[i].style.textDecoration = 'line-through';            
            } else {
                activitiesCheckboxes[i].disabled = false;
                activitiesLabels[i].style.textDecoration = 'none';  
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
const paymentMenu = document.getElementById('payment');
const paymentOption0 = paymentMenu.options[0];

hide(paymentOption0);

// Event listener is added to the payment drop down menu
paymentMenu.addEventListener('change', (e) => {
    const clickedPayment = e.target;
    const paymentCreditCard = paymentMenu.options[1];
    const paymentPayPal = paymentMenu.options[2];
    const paymentBitcoin = paymentMenu.options[3];

    // displays the payment info based on the payment option the user chooses
    if (clickedPayment.value === paymentCreditCard.value) {
        display(divCreditCard);
        hide(divPayPal);
        hide(divBitcoin);
    } else if (clickedPayment.value === paymentPayPal.value) {
        hide(divCreditCard);
        display(divPayPal);
        hide(divBitcoin);
    } else if (clickedPayment.value === paymentBitcoin.value) {
        hide(divCreditCard);
        hide(divPayPal);
        display(divBitcoin);
    };
});