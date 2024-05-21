"use client";
import { getTodayScore } from "@/utils/api";
import { useState, useEffect } from "react";
// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/misc/getTodayScore`);
//   const data = await res.json();
//   return data;
// }
export default function Home() {
  const [todayScore, setTodayScore] = useState(0);
  useEffect(() => {
    (async () => {
      const data = await getTodayScore();
      console.log("data in page", data);
      setTodayScore(data);
    })();
  }, []);
  // const data = await getData();
  // console.log("data", data);
  return (
    <main className="flex flex-col items-center">
      <h3>Your score today is</h3>
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-content">
          {todayScore}
        </div>
      </div>
    </main>
  );
}
