import { useState, useEffect } from "react";
import Header from '../components/app/header';
import Qoute from '../components/elapsed/Qoute';

function ElapsedApp() {
    
    const now = new Date().getTime();
    const start = new Date(2023, 10, 14, 19, 7, 0).getTime();
    const elapsed = now - start;
    
    const totalDays = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((elapsed % (1000 * 60)) / 1000);

    const totalWeeks = Math.floor(totalDays / 7); //total 
    const totalMonths = Math.floor(totalWeeks / 4);

    const day = Math.floor(totalDays % 7);
    const yrs = Math.floor(totalMonths / 12);
    const week = Math.floor(totalWeeks % 4);
    const month = Math.floor(totalMonths % 12)

    const [time, setTime] = useState(secs);
    //update code after every sec
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => time > 58 ? 0:time + 1);
        }, 999);
        //clears when component unmounts
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <div id="title" >elapsed time</div>
            <ul>
                
                <li id="yrs" >{yrs} <div>{yrs < 2 ? 'year':'years' }</div></li>
                <li id="months" >{month} <div>months</div> </li>
                <li id="weeks" >{week} <div>weeks</div></li>
                <li id="days" >{day} <div>days</div></li>
                <li id="hrs" >{hrs} <div>hours</div></li>
                <li id="mins" >{mins} <div>minutes</div></li>
                <li id="secs" >{time} <div>seconds</div></li>
            </ul>
            <div></div>
        </>
    )
}

export default ElapsedApp;