import React, { useEffect, useState } from 'react'

const Timer = ({ datetime }) => {
    const calculateTimeLeft = (datetime) => {
        const difference = new Date(datetime) - new Date();
        let timeLeft = "";

        if (difference > 0) {
            let days = Math.floor(difference / (1000 * 60 * 60 * 24))
            let hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
            let minutes = Math.floor((difference / 1000 / 60) % 60)
            let seconds = Math.floor((difference / 1000) % 60)

            if(days>0){
                timeLeft += days + "d : "
            }
            if(hours>0){
                timeLeft += hours + "h : "
            }
            if(minutes>0){
                timeLeft += minutes + "m : "
            }
            timeLeft += seconds + "s"
        }
        else {
            timeLeft = "Time Up"
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(datetime));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(datetime))
        }, 1000)

        return () => clearTimeout(timer);
    })
    

    return (
        <div style={{color: "red", fontSize:"13px"}}>
            {timeLeft}
        </div>
    )
}

export default Timer