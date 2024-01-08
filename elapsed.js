// epoch is the date and time i last spoke to her
const epoch = new Date("2023-11-14T18:07:23")
let [epochYear, epochMonth, epochDay, epochHour, epochMin, epochSec] = [
    epoch.getFullYear(),
    epoch.getMonth() + 1, //.getMonth converts month to a 0-index system
    epoch.getDate(),
    epoch.getHours(),
    epoch.getMinutes(),
    epoch.getSeconds(),
];

const now = new Date();
let [nowYear, nowMonth, nowDay, nowHour, nowMin, nowSec] = [
    now.getFullYear(),
    now.getMonth() + 1, //.getMonth converts month to a 0-index system 
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
];

const elapsedYear = function () {
    // had to simplify without the use for loops
    if (nowMonth < epochMonth) { //month based yearly count
        elapsed = (nowYear - epochYear) -1; //if total months is less than 12months, it means month count resumed to the following year. no add to year count
        return elapsed.toString();
    } else {
        elapsed = nowYear - epochYear;// if month count more than the epoch month, the year diff works just fine!
        return elapsed.toString();
    }
}

let elapsedMonth = function () {
    //the calculation accounts for a negative result
    if (epochMonth > nowMonth) {// accounts for epochMonth as 0 month not 1month 
        elapsed = nowMonth + (12 - (epochMonth + 1));
        // 1 is the diff of 12 months of the year to the epochMonth 
        return elapsed.toString();
    } else {
        elapsed = nowMonth - epochMonth;
        return elapsed.toString();
    }
}
const elapsedWeek = function () {
    let noWeekDays = elapsedTotalDay() % 31;
    let weeks = parseInt(noWeekDays/ 7) ;
    return weeks;
}
    

const elapsedDay = function () {
    let noWeekDays = elapsedTotalDay() % 31;
    let days = noWeekDays % 7;
    return days;
}

const elapsedTotalDay = function () {
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let elapsed = Number(elapsedMonth());
    let sum1 = 0;
    let sum2 = 0;
    let sum = 0;
    let now = nowMonth - 1;
    //      12             11           1
    if (months.length - epochMonth <= elapsed) {
        for (let i = epochMonth; i < months.length; i++) {
            //              11              12
            let current = months[i % months.length];
            sum1 = sum1 + current;
        }
        for (let a = 0; a < now; a++) {
            let current = months[a % now];
            sum2 = sum2 + current;
        }
        sum = sum1 + sum2;
    } else {
        for (let i = epochMonth;  i < epochMonth + elapsed; i++) {
            let current = months[i % months.length];
            sum = sum + current;
        }
    }
    //             8           
    let totalDays = (months[epochMonth] - epochDay) + sum + nowDay;

    return totalDays;
}

const elapsedHour = function () {
    if (epochHour > nowHour) {
        elapsed = nowHour + (24 - epochHour);
        return elapsed.toString()
    } else {
        elapsed = nowHour - epochHour;
        return elapsed.toString();
    }
}

const elapsedMin = function () {
    if (epochMin > nowMin) {
        elapsed = nowMin + (60 - epochMin);
        return elapsed.toString()
    } else {
        elapsed = nowMin - epochMin;
        return elapsed.toString();
    }
}

const elapsedSec = function () {
    if (epochSec > nowSec) {
        elapsed = nowSec + (60 - epochSec);
        return elapsed.toString();
    } else {
        elapsed = nowSec - epochSec;
        return elapsed.toString();
    }
}



document.addEventListener('DOMContentLoaded', function () {
    const runYears = document.getElementById('years');
    const runMonths = document.getElementById('months');
    const runWeeks = document.getElementById('weeks');
    const runDays = document.getElementById('days');
    const runHrs = document.getElementById('hours');
    const runMins = document.getElementById('mins');
    const runSecs = document.getElementById('secs');

    if (runYears, runMonths, runWeeks, runDays, runHrs, runMins, runSecs) {
        runYears.innerText = elapsedYear();
        runMonths.innerText = elapsedMonth();
        runWeeks.innerText = elapsedWeek();
        runDays.innerText = elapsedDay();
        runHrs.innerText = elapsedHour();
        runMins.innerText = elapsedMin();
        runSecs.innerText = elapsedSec();
    }
});

console.log(elapsedYear() + 'yr/s', elapsedMonth() + 'month/s', elapsedWeek() + 'week/s', elapsedDay() + 'day/s', elapsedHour() + 'hr/s', elapsedMin() + 'min/s', elapsedSec() + 'sec/s');
