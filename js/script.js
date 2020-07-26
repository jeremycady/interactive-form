const jobRole = document.querySelector('#title');
const tshirtDesign = document.querySelector('#design');
const tshirtColors = document.querySelector('#color').children;

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

//change TShirt Color Menu
const changeTshirtColor = () => {
    const tshirtColorSelection = document.querySelector('#color');
    tshirtColorSelection.innerHTML = '';

    if (tshirtDesign.value === 'js puns') {
        for (let i=0; i<3; i++) {
            const color = tshirtColors[i];
            tshirtColorSelection.innerHTML += color;
        }
    } else if (tshirtDesign.value === 'heart js') {
        for (let i=3; i<6; i++) {
            const color = tshirtColors[i];
            tshirtColorSelection.innerHTML += color;
        }
    } else {
        tshirtColorSelection.innerHTML = '<option>Please select a T-shirt theme</option>';
    }
}

focusFirstInput();
changeOtherRole();
// changeTshirtColor();

jobRole.addEventListener('change', () => {
    changeOtherRole();
});

tshirtDesign.addEventListener('change', () => {
    changeTshirtColor();
});