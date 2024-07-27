import React, { useState, useEffect, useRef } from 'react'
import './Stopwatch.css';

export const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [toggleStartPause, setToggleStartPause] = useState('start');
    const [finalStop,setFinalStop] = useState(false);
    const [finalTime,setFinalTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])

    function start() {
        setToggleStartPause('pause');
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
        setFinalStop(false);
        setFinalTime(0);
    }

    function pause() {
        setToggleStartPause('start');
        setIsRunning(false);
        setFinalStop(false);
        setFinalTime(0);
    }

    function stop() {
        setIsRunning(false);
        setFinalStop(true);
        setFinalTime(formatTime());
        setElapsedTime(0);
        setToggleStartPause('start');
    }

    function reset() {
        setToggleStartPause('start');
        setElapsedTime(0);
        setIsRunning(false);
        setFinalStop(false);
        setFinalTime(0);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className='stopwatch'>
            <div className='display'>{formatTime()}</div>
            <div className='controls'>
                {
                    toggleStartPause === 'start' && (
                        <button onClick={start} className='start-button'>Start</button>
                    )
                }

                {
                    toggleStartPause === 'pause' && (
                        <button onClick={pause} className='pause-button'>Pause</button>
                    )
                }

                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
            {
                finalStop && (
                    <h2>Final Elapsed Time - {finalTime}</h2>
                )
            }
        </div>
    )
}
