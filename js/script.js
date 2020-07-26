const jobRole = document.querySelector('#title');

// focuses on the first text input field
const focusFirstInput = () => {
    const input = document.querySelector('input[type=text]');
    input.focus();
}

// select and set display value of Other Job Role
const selectOtherRole = display => {
    const otherTitle = document.querySelector('#other-title');
    const otherLabel = otherTitle.previousElementSibling;
        
    otherTitle.style.display = display;
    otherLabel.style.display = display;
}

//change Other Job Role display
const changeOtherRole = () => {
    const value = jobRole.value;

    if (value !== 'other') {
        selectOtherRole('none');
    } else {
        selectOtherRole('block');
    }
}

focusFirstInput();
changeOtherRole();

jobRole.addEventListener('change', () => {
    changeOtherRole();
});