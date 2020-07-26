const jobRole = document.querySelector('#title');
const tshirtDesign = document.querySelector('#design');
const colorSelection = document.querySelector('#color');
const tshirtColors = [];

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

// build tshirtColor array with design, colors, and content
const getColors = () => {
    const colors = document.querySelector('#color').children;

    const selectTheme = {
        design: 'Select Theme',
        colors: ['please-select'],
        content: ['Please select a T-shirt theme']
    };

    tshirtColors.push(selectTheme);

    const jsPuns = {
        design: 'js puns',
        colors: [],
        content: []
    };

    const heartJs = {
        design: 'heart js',
        colors: [],
        content: []
    }
    
    for (let i=0; i<colors.length; i++) {
        const color = colors[i];
        if (color.textContent.includes('(JS Puns shirt only)')) {
            jsPuns.colors.push(color.value);
            jsPuns.content.push(color.textContent);
        } else if (color.textContent.includes('(I ♥ JS shirt only)')) {
            heartJs.colors.push(color.value);
            heartJs.content.push(color.textContent);
        }
    }

    tshirtColors.push(jsPuns);
    tshirtColors.push(heartJs);
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
getColors();
changeTshirtColors('Select Theme');

jobRole.addEventListener('change', () => {
    changeOtherRole();
});

tshirtDesign.addEventListener('change', e => {
    const design = e.target.value
    changeTshirtColors(design);
});