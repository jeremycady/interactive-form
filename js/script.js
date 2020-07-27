document.addEventListener('DOMContentLoaded', () => {
    const job = document.querySelector('#title');
    const colorSelect = document.querySelector('#color');
    const activities = document.querySelectorAll('input[type=checkbox]');
    let checkedActivities = [];
    const paymentSelect = document.querySelector('#payment');
    const button = document.querySelector('button');
    const mail = document.querySelector('#mail');
    const mailError = document.createElement('div');
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

    // insert please select design into tshirt colors
    const insertDesignNotChosen = () => {
        const firstColor = colorSelect.firstElementChild;
        const pleaseSelect = document.createElement('option');

        pleaseSelect.textContent = 'Please select a T-shirt theme';
        pleaseSelect.value = 'please-select';

        colorSelect.insertBefore(pleaseSelect, firstColor);
        colorSelect.value = pleaseSelect.value;
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

    // disables the submit button
    const disableButton = () => {
        button.disabled = true;
    }

    // inserts error div before email input and hides until validation
    const insertError = () => {
        const parentMail = mail.parentNode;
        mailError.style.color = 'darkred';
        mailError.style.backgroundColor = 'tomato';
        mailError.style.padding = '10px';
        mailError.hidden = true;
        mailError.display = 'inline-block';

        parentMail.insertBefore(mailError, mail);
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
            error();
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

    // if inputs are valid enable button
    const validated = () => {
        if (validation.name && validation.mail && validation.activities && validation.ccNum && validation.zip && validation.cvv) {
            button.disabled = false;
        } else if (validation.name && validation.mail && validation.activities && paymentSelect.value !== 'credit card') {
            button.disabled = false;
        } else {
            disableButton();
        }
    }

    // make error message on email field
    const error = () => {
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
    insertDesignNotChosen();
    insertTotal();
    insertError();
    removePayment();
    changeDesign('Select Theme');
    payment('credit card');
    paymentSelect.value = 'credit card';
    disableButton();

    job.addEventListener('change', () => {
        changeOtherRole();
    });

    document.querySelector('#design').addEventListener('change', e => {
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
});