// document.addEventListener('DOMContentLoaded', () => {
    const job = document.querySelector('#title');
    const colorDiv = document.querySelector('#colors-js-puns');
    const designSelect = document.querySelector('#design');
    const colorSelect = document.querySelector('#color');
    const activities = document.querySelectorAll('input[type=checkbox]');
    let checkedActivities = [];
    const inputs = document.querySelectorAll('input');
    const paymentSelect = document.querySelector('#payment');
    const button = document.querySelector('button');
    const errorObjects = {
        name: document.querySelector('#name'),
        mail: document.querySelector('#mail'),
        activities: document.querySelector('.activities'),
        'cc-num': document.querySelector('#cc-num'),
        zip: document.querySelector('#zip'),
        cvv: document.querySelector('#cvv')
    };
    let validation = {};

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

    // hide color options on page load
    const hideColorDiv = () => {
        colorDiv.hidden = true;
    }

    // inserts total field in activity section
    const insertTotal = () => {
        const h3 = document.createElement('h3');
        const classActivities = document.querySelector('.activities');
        h3.textContent = 'Total: $0.00';

        classActivities.appendChild(h3);
    }

    // removes the select payment option and defaults to cc
    const removePayment = () => {
        const selectMethod = paymentSelect.firstElementChild;
        paymentSelect.removeChild(selectMethod);
    }

    // inserts error divs before inputs and hide until validation
    const insertErrors = () => {
        for (let key in errorObjects) {
            const parentOfError = errorObjects[key].parentNode;
            const childOfError = errorObjects[key].firstElementChild;
            const createError = document.createElement('div');
            
            createError.style.color = 'darkred';
            createError.style.backgroundColor = 'tomato';
            createError.style.padding = '10px';
            createError.hidden = true;
            createError.display = 'inline-block';
            createError.textContent = 'Field required';
            createError.className = `${key}Error`

            if (key === 'activities') {
                createError.style.marginBottom = '10px';
                errorObjects[key].insertBefore(createError, childOfError);
            } else {
                parentOfError.insertBefore(createError, errorObjects[key]);
            }
        }
    };

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
        const themeSelect = designSelect.firstElementChild;
        themeSelect.hidden = true;
        colorDiv.hidden = false;
        
        if (tshirtSelection === 'js puns') {
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
    const checkActivities = () => {
        checkedActivities = [];
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
    const selectActivities = () => {
        for (let i=0; i<activities.length; i++) {
            const activity = activities[i];
            disableActivity(activity, 1, false);
        }

        checkActivities();

        for (let i=0; i<activities.length; i++) {
            const activity = activities[i];
            
            if (!activity.checked) {
                for (let i=0; i<checkedActivities.length; i++) {
                    const checkedActivity = checkedActivities[i];
                    if (checkedActivity.time === activity.getAttribute('data-day-and-time')) {
                        disableActivity(activity, .5, true);
                    }
                }
            }
        }
    }

    // total checked activities
    const totalActivities = () => {
        const h3 = document.querySelector('h3');
        let total = 0;

        for (let i=0; i<activities.length; i++) {
            const activity = activities[i];
            if (activity.checked) {
                total += parseInt(activity.getAttribute('data-cost'));
            }
        }
        h3.textContent = `Total: $ ${total}.00`;
    }

    // hide the payment options not selected
    const payment = paymentType => {
        const selectedPayment = paymentType.replace(' ','-');
        const paymentDivs = document.querySelectorAll('div');

        for (let i=0; i<paymentDivs.length; i++) {
            if (paymentDivs[i].id === 'credit-card' || paymentDivs[i].id ===  'paypal' || paymentDivs[i].id ===  'bitcoin') {
                if (selectedPayment !== paymentDivs[i].id) {
                    paymentDivs[i].hidden = true;
                } else {
                    paymentDivs[i].hidden = false;
                }
            }
        }
    }

    // remove error style 
    const removeError = (key, getError) => {
        getError.hidden = true;
        errorObjects[key].style.borderColor = '';
    }

    // apply error style
    const applyError = (key, getError, e) => {
        getError.hidden = false;
        errorObjects[key].style.borderColor = 'darkred';
        e.preventDefault();
    }

    // validate form inputs, does not include activities
    const validate = (input) => {
        validation = {};
        validation.name = /^[a-z]+$/.test(input.value.toLowerCase());
        validation.mail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(input.value);
        validation['cc-num'] = /(?:^\d{13,16}$)/.test(input.value);
        validation.zip = /^\d{5}$/.test(input.value);
        validation.cvv = /^\d{3}$/.test(input.value);
    }

    // hide/show errors on submission
    const submitErrors = (e) => {
        for (let i=0; i<inputs.length; i++) {
            const input = inputs[i];
            const getClass = `${input.id}Error`;
            const getError = document.querySelector(`.${getClass}`);

            validate(input);
            if (input.id === 'name') {
                if (validation.name) {
                    removeError(input.id, getError);
                } else {
                    applyError(input.id, getError, e);
                }
            } else if (input.id === 'mail') {
                if (errorObjects[input.id].value.length === 0) {
                    applyError(input.id, getError, e);
                    getError.textContent = 'Field required';
                } else if (validation.mail) {
                    removeError(input.id, getError);
                } else {
                    applyError(input.id, getError, e);
                    getError.textContent = 'Format required: email@example.com';
                }
            } else if (input.id === 'cc-num') {
                if (paymentSelect.value === 'credit card') { 
                    if (validation['cc-num']) {
                        removeError(input.id, getError);
                    } else {
                        applyError(input.id, getError, e);
                    }
                }
            } else if (input.id === 'zip') {
                if (validation.zip) {
                    removeError(input.id, getError);
                } else {
                    applyError(input.id, getError, e);
                }
            } else if (input.id === 'cvv') {
                if (validation.cvv) {
                    removeError(input.id, getError);
                } else {
                    applyError(input.id, getError, e);
                }
            }
        }
        validActivities(e);
    }

    // make errors message on fields
    const validateMail = (key, getError, e) => {
        removeError(key, getError);
        if (errorObjects[key].value.length === 0) {
            applyError(key, getError, e);
            getError.textContent = 'Field required';
        } else if (!validation.mail) {
            applyError(key, getError, e);
            getError.textContent = 'Format required: email@example.com';
        } 
    }

    // validates activities 
    const validActivities = e => {
        for (let i=0; i<activities.length; i++) {
            if (activities[i].checked) {
                document.querySelector('.activitiesError').hidden = true;
                return;
            }
        }
        document.querySelector('.activitiesError').hidden = false;
        e.preventDefault();
    }

    focusFirstInput();
    changeOtherRole();
    hideColorDiv();
    insertTotal();
    insertErrors();
    removePayment();
    payment('credit card');
    paymentSelect.value = 'credit card';

    job.addEventListener('change', () => {
        changeOtherRole();
    });

    design.addEventListener('change', e => {
        changeDesign(e.target.value);
    });

    document.querySelector('.activities').addEventListener('change', e => {
        selectActivities();
        totalActivities();
    });

    paymentSelect.addEventListener('change', e => {
        payment(e.target.value);
    });

    // errorObjects.mail.addEventListener("input", e => {
    //     validateMail();
    // });

    button.addEventListener('click', (e) => {
        submitErrors(e);
    });
// });