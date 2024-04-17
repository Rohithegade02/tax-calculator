const grossSalary = document.getElementById("floatingInputValue1");
const extraSalary = document.getElementById("floatingInputValue2");
const deductionSalary = document.getElementById("floatingInputValue3");
const ageGroup = document.getElementById("floatingSelect");

function validateNumber(input) {
    const isValid = /^\d+$/.test(input.value); 
    input.classList.toggle("is-invalid", !isValid);
    input.classList.toggle("is-valid", isValid);
    input.setCustomValidity(isValid ? "" : "Please enter numbers only");
    
}
function validateInput(input) {
    validateNumber(grossSalary)
    validateNumber(extraSalary)
    validateNumber(deductionSalary)
    validateString(ageGroup)
}
function validateString(input) {
    input.classList.toggle('is-invalid', input.value==='')
}
function calculateTax(totalIcome, ageGroup) {

const taxPercentage = {
    '40': 0.3,
    '40-60': 0.4,
    '60': 0.1
}
const tax = taxPercentage[ageGroup]
 return totalIcome -  (totalIcome * tax)
   
}
function handleSubmit(e) {
    e.preventDefault();
   
validateInput()
   
    if (document.querySelectorAll('.is-invalid').length > 0) {
        return;
    }

    
    const totalIncome = parseInt(grossSalary.value) + parseInt(extraSalary.value) - parseInt(deductionSalary.value);
    
    let message = ''
    if (totalIncome < 800000) {
        message = "Your overall income will be " +'Below 8lakhs & Tax will not be applied'
    } else {
        const calculatedTax = calculateTax(totalIncome, ageGroup.value)
        const totalValue = calculateTax ? calculatedTax?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") :''
        message = "Your overall income will be " + totalValue + " after tax deductions";
       
    }
    
    document.getElementById("calculatedAmount").textContent = message;

    const myModal = new bootstrap.Modal(document.getElementById('taxModal'), {
        keyboard: false
    });
    myModal.show();
}


