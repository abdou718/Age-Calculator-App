document.addEventListener('DOMContentLoaded', () => {
    const daySet = document.querySelector('#day');
    const monthSet = document.querySelector('#month');
    const yearSet = document.querySelector('#year');

    const Ryear = document.querySelector('.year');
    const Rmonth = document.querySelector('.month');
    const Rday = document.querySelector('.day');

    const currentDate = new Date();
    const Cyear = currentDate.getFullYear();
    const Cmonth = currentDate.getMonth() + 1;
    const Cday = currentDate.getDate();

    let MonthDay = {
        1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
        7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
    };

    const ErrorActive = document.querySelectorAll('.Ective');
    const labelError = document.querySelectorAll('.error');
    const calculator = document.querySelector('.calculator');
    calculator.addEventListener('click', () => {
        const day = parseInt(daySet.value);
        const month = parseInt(monthSet.value);
        const year = parseInt(yearSet.value);

        // Validate Input
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            document.querySelectorAll('.error-text').forEach(error => error.textContent = 'Please fill in all fields');
            ErrorActive.forEach(error => error.style.borderColor = 'red');
            labelError.forEach(error => error.style.color = 'red');
            return;
        }
        document.querySelectorAll('.error-text').forEach(error => error.textContent = '');
        ErrorActive.forEach(error => error.style.borderColor = '');
        labelError.forEach(error => error.style.color = '');

        if (year > Cyear || (year === Cyear && month > Cmonth) || (year === Cyear && month === Cmonth && day > Cday)) {
            document.querySelector('.Eyear').textContent = 'Must be in the past';
            document.querySelector('.yearError').style.borderColor = 'red';
            document.querySelector('.Label-year-error').style.color = 'red';
            return;
        }

        if (month < 1 || month > 12) {
            document.querySelector('.Emonth').textContent = 'Must be a valid month';
            document.querySelector('.monthError').style.borderColor = 'red';
            document.querySelector('.Label-month-error').style.color = 'red';
            return;
        }

        // Leap Year Handling
        let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (isLeapYear) MonthDay[2] = 29;

        if (day < 1 || day > MonthDay[month]) {
            document.querySelector('.Eday').textContent = 'Must be a valid day';
            document.querySelector('.dayError').style.borderColor = 'red';
            document.querySelector('.Label-day-error').style.color = 'red';
            return;
        }

        // Age Calculation
        let ageYear = Cyear - year;
        let ageMonth = Cmonth - month;
        let ageDay = Cday - day;

        if (ageDay < 0) {
            ageDay += MonthDay[month];
            ageMonth--;
        }

        if (ageMonth < 0) {
            ageMonth += 12;
            ageYear--;
        }

        // Display Result
        Ryear.textContent = ageYear;
        Rmonth.textContent = ageMonth;
        Rday.textContent = ageDay;
    });
});
