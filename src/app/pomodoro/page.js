// app/pomodoro/page.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Menu from '@/components/Menu';


export default function PomodoroPage() {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [type, setType] = useState('work');

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else if (time === 0) {
            setIsActive(false);
            setType(type === 'work' ? 'break' : 'work');
            setTime(type === 'work' ? 5 * 60 : 25 * 60);
        }
        return () => clearInterval(interval);
    }, [isActive, time, type]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setType('work');
        setTime(25 * 60);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <div className="container">
        <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <h1 className="mb-5">Pomodoro Timer</h1>
          <div className=" bg-body-tertiary rounded p-5" style={{ minWidth: "300px" }}>
            <div className="card-body text-center">
              <h2 className="mb-4">
                {type === "work" ? "Time to Focus" : "Break Time"}
              </h2>
              <h3 className="display-1 mb-4">{formatTime(time)}</h3>
              <button
                className="btn btn-primary btn me-3"
                onClick={toggleTimer}
              >
                {isActive ? "Pause" : "Start"}
              </button>
              <button className="btn btn-secondary btn" onClick={resetTimer}>
                Reset
              </button>
            </div>
          </div>
        
        </main>
        <Menu />
      </div>
    );
}