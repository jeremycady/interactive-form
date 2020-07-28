// document.addEventListener('DOMContentLoaded', () => {
    const job = document.querySelector('#title');
    const colorDiv = document.querySelector('#colors-js-puns');
    const designSelect = document.querySelector('#design');
    const colorSelect = document.querySelector('#color');
    const activities = document.querySelectorAll('input[type=checkbox]');
    let checkedActivities = [];
    const paymentSelect = document.querySelector('#payment');
    const button = document.querySelector('button');
    const errorObjects = {
        name: document.querySelector('#name'),
        mail: document.querySelector('#mail'),
        activities: document.querySelector('.activities'),
        ccNum: document.querySelector('#cc-num'),
        zip: document.querySelector('#zip'),
        cvv: document.querySelector('#cvv')
    };
    let validation = {
        name: false,
        mail: false,
        activities: false, 
        ccNum: false,
        zip: false,
        cvv: false
    };

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

    // validate form inputs
    const isValid = input => {
        if (input.id === 'name') {
            validation.name = /^[a-z]+$/.test(input.value.toLowerCase());
        } else if (input.id === 'mail') {
            validation.mail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(input.value);
            getMailError();
        } else if (input.id === 'cc-num') {
            validation.ccNum = /(?:^\d{13}$)|(?:^\d{16}$)/.test(input.value);
        } else if (input.id === 'zip') {
            validation.zip = /^\d{5}$/.test(input.value);
        } else if (input.id === 'cvv') {
            validation.cvv = /^\d{3}$/.test(input.value);
        } else if (checkedActivities.length > 0) {
            validation.activities = true;
        } else if (checkActivities.length === 0) {
            validation.activities = false;
        }
    }

    // unhides errors to inputs and prevents submission if
    const submitErrors = (e) => {
        for (let key in validation) {
            const getClass = `${key}Error`;
            const getError = document.querySelector(`.${getClass}`);

            if (validation[key]) {
                getError.hidden = true;
                errorObjects[key].style.borderColor = '';
            } else {
                getError.hidden = false;
                errorObjects[key].style.borderColor = 'darkred';
                e.preventDefault();
            }
        }
    }

    // make errors message on fields
    const getMailError = () => {
        const mail = document.querySelector('#mail');
        const mailError = document.querySelector('.mailError');

        mailError.hidden = true;
        mail.style.borderColor = '';
        if (mail.value.length === 0) {
            mailError.hidden = false;
            mailError.textContent = 'Field required';
            mail.style.borderColor = 'darkred';
        } else if (!validation.mail) {
            mailError.hidden = false;
            mailError.textContent = 'Format required: email@example.com';
            mail.style.borderColor = 'darkred';
        } 
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
        isValid(e.target);
        validated();
    });

    paymentSelect.addEventListener('change', e => {
        payment(e.target.value);
        isValid(e.target);
        validated();
    });

    document.querySelector('#name').addEventListener("input", e => {
        isValid(e.target);
        validated();
    });

    mail.addEventListener("input", e => {
        isValid(e.target);
        validated();
    });

    document.querySelector('#cc-num').addEventListener("input", e => {
        isValid(e.target);
        validated();
    });

    document.querySelector('#zip').addEventListener("input", e => {
        isValid(e.target);
        validated();
    });

    document.querySelector('#cvv').addEventListener("input", e => {
        isValid(e.target);
        validated();
    });

    button.addEventListener('click', (e) => {
        submitErrors(e);
    });
// });