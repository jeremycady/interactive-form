const job = document.querySelector('#title');
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

// change label opacity and activity disabled
const disableActivity = (activity, opacity, disable) => {
    const label = activity.parentNode;

    label.style.opacity = opacity;
    activity.disabled = disable;
}

// push checked activites into array to be compared
const checkActivities = (checkedActivities, activities) => {
    for (let i=0; i<activities.length; i++) {
        const activity = activities[i];
        if (activity.checked) {
            const activityObject = {
                name: activity.name,
                time: activity.attributes[2].value
            };
            checkedActivities.push(activityObject);
        }
    }
}

// disables activites that are at the same date and time of activity selected
const selectActivities = (e) => {
    const activities = document.querySelectorAll('input[type=checkbox]');
    const checkedActivities = [];

    for (let i=0; i<activities.length; i++) {
        const activity = activities[i];
        disableActivity(activity, 1, false);
    }

    checkActivities(checkedActivities, activities);

    for (let i=0; i<activities.length; i++) {
        const activity = activities[i];
        
        if (!activity.checked) {
            for (let i=0; i<checkedActivities.length; i++) {
                const checkedActivity = checkedActivities[i];
                if (checkedActivity.time === activity.attributes[2].value) {
                    disableActivity(activity, .5, true);
                }
            }
        }
    }
}

focusFirstInput();
changeOtherRole();
insertDesignNotChosen();
changeDesign('Select Theme');

job.addEventListener('change', () => {
    changeOtherRole();
});

document.querySelector('#design').addEventListener('change', e => {
    const selectDesign = e.target.value;
    changeDesign(selectDesign);
});

document.querySelector('.activities').addEventListener('change', e=> {
    selectActivities(e);
});