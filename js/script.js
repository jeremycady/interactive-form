const jobRole = document.querySelector('#title');
const tshirtDesign = document.querySelector('#design');
const colorSelection = document.querySelector('#color');
const tshirtColors = [
    {
        design: 'Select Theme',
        colors: ['please-select'],
        content: ['Please select a T-shirt theme']
    },
    {
        design: 'js puns',
        colors: ['cornflowerblue', 'darkslategrey', 'gold'],
        content: [
                    'Cornflower Blue (JS Puns shirt only)',
                    'Dark Slate Grey (JS Puns shirt only)',
                    'Gold (JS Puns shirt only)'
                ]
    },
    {
        design: 'heart js',
        colors: ['tomato', 'steelblue', 'dimgrey'],
        content: [
                    'Tomato (I &#9829; JS shirt only)',
                    'Steel Blue (I &#9829; JS shirt only)',
                    'Dim Grey (I &#9829; JS shirt only)'
                ]
    }
];

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

// insert please select design into tshirt colors
const insertDesignNotChosen = () => {
    const colorSelection = document.querySelector('#color');
    const firstColor = colorSelection.firstElementChild;
    const pleaseSelect = document.createElement('option');
    pleaseSelect.textContent = tshirtColors[0].content;
    pleaseSelect.value = tshirtColors[0].colors;

    colorSelection.insertBefore(pleaseSelect, firstColor);
    colorSelection.value = pleaseSelect.value;
}

// change TShirt Color Menu
const changeTshirtColors = design => {
    colorSelection.innerHTML = '';

    for (let i=0; i<tshirtColors.length; i++) {
        if (tshirtColors[i].design === design) {
            for (let j=0; j<tshirtColors[i].colors.length; j++) {
                colorSelection.innerHTML += `<option value="${tshirtColors[i].colors[j]}">${tshirtColors[i].content[j]}</option>`;
            }
        }
    }
}

focusFirstInput();
changeOtherRole();
insertDesignNotChosen();
changeTshirtColors('Select Theme');

jobRole.addEventListener('change', () => {
    changeOtherRole();
});

tshirtDesign.addEventListener('change', e => {
    const design = e.target.value
    changeTshirtColors(design);
});