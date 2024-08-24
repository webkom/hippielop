"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

interface Props {
  date: Date;
  doneNode: ReactNode;
}

export const Countdown = ({ date, doneNode }: Props) => {
  const getSecondsLeft = useCallback(
    () => Math.ceil((date.getTime() - new Date().getTime()) / 1000),
    [date],
  );

  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft());

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      const secondsLeft = getSecondsLeft();
      setSecondsLeft(secondsLeft);
      if (secondsLeft <= 0) {
        // refresh page when countdown is done
        window.location.reload();
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [getSecondsLeft, secondsLeft]);

  const seconds = secondsLeft % 60;
  const minutes = Math.floor(secondsLeft / 60) % 60;
  const hours = Math.floor(secondsLeft / 60 / 60) % 24;
  const days = Math.floor(secondsLeft / 60 / 60 / 24);

  if (secondsLeft > 0) {
    return (
      <div className="flex flex-col items-center gap-2">
        <h2 className={`${pacifico.className} text-3xl text-white drop-shadow`}>
          Åpner om
        </h2>
        <div className="flex gap-2 text-white">
          <TimeBox title="Dager" number={days} className="bg-[#eb5a21]" />
          <TimeBox title="Timer" number={hours} className="bg-[#d673b0]" />
          <TimeBox title="Minutter" number={minutes} className="bg-[#088b47]" />
          <TimeBox title="Sekunder" number={seconds} className="bg-[#f5b815]" />
        </div>
      </div>
    );
  }
  return doneNode;
};

interface TimeBoxProps {
  title: string;
  number: number;
  className?: string;
}

const TimeBox = ({ title, number, className }: TimeBoxProps) => {
  return (
    <div
      className={`flex aspect-square w-20 flex-col justify-center ${className}`}
    >
      <p className="text-center">{title}</p>
      <p className="text-center text-2xl">{number}</p>
    </div>
  );
};
