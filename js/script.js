const job = document.querySelector('#title');
const design = document.querySelector('#design');
const colorSelect = document.querySelector('#color');

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
    const value = job.value;

    if (value !== 'other') {
        selectOtherRole('none');
    } else {
        selectOtherRole('block');
    }
}

// insert please select design into tshirt colors
const insertDesignNotChosen = () => {
    const firstColor = colorSelect.firstElementChild;
    const pleaseSelect = document.createElement('option');

    pleaseSelect.textContent = 'Please select a T-shirt theme';
    pleaseSelect.value = 'please-select';

    colorSelect.insertBefore(pleaseSelect, firstColor);
    colorSelect.value = pleaseSelect.value;
}

// build tshirtColor array with design, colors, and content
const getColors = () => {
    const colors = document.querySelector('#color');

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

// hide/unhide colors in color menu
const changeColor = (colors, include, select) => {
    for (let i=0; i<colors.length; i++) {
        const color = colors[i];
        if (color.textContent.includes(include)) {
            color.hidden = false;
        } else {
            color.hidden = true;
        }
    }   
    colorSelect.value = select;
}

// change tshirt Color Menu with change in design selection
const changeDesign = tshirtSelection => {
    const colors = colorSelect.children;
 
    if (tshirtSelection === 'Select Theme') {
        changeColor(colors,'Please select','please-select');
    } else if (tshirtSelection === 'js puns') {
        changeColor(colors,'JS Puns shirt only','cornflowerblue');
    } else if (tshirtSelection === 'heart js') {
        changeColor(colors,'I ♥ JS shirt only','tomato');
    }
}

focusFirstInput();
changeOtherRole();
insertDesignNotChosen();
changeDesign('Select Theme');

job.addEventListener('change', () => {
    changeOtherRole();
});

design.addEventListener('change', e => {
    const selectDesign = e.target.value;
    changeDesign(selectDesign);
});