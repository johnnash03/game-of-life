"use client";

import { useState, useEffect } from "react";
import { createRoutineDetail, getRoutines } from "@/utils/api";
import dayjs from "dayjs";
const Status = ({ allRoutines, history }) => {
  console.log(allRoutines, history);
  const routineMapping = allRoutines.reduce((acc, value) => {
    return {
      ...acc,
      [value.id]: value.name,
    };
  }, {});

  return (
    <div>
      <h4>Status</h4>
      {history.map(({ routineid, createdat }) => {
        const days = dayjs().diff(createdat, "day");
        console.log("days", days);
        if (days >= 2) {
          return (
            <div className="text-red-700">
              Redeem {routineMapping[routineid]}
            </div>
          );
        }
        if (days === 1) {
          return (
            <div className="text-yellow-700">
              {routineMapping[routineid]} can go wrong
            </div>
          );
        }
        return (
          <div className="text-green-700">
            {routineMapping[routineid]} going strong
          </div>
        );
      })}
    </div>
  );
};

const Routine = () => {
  const [allRoutines, setAllRoutines] = useState([]);
  const [doneTodayIds, setDoneTodayIds] = useState([]);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    async function init() {
      const data = await getRoutines();
      setAllRoutines(data.allRoutines);
      setHistory(data.history);
      const todayRoutineIds = data.todayRoutine.map(
        ({ routineid: routineId }) => routineId,
      );
      setDoneTodayIds(todayRoutineIds);
    }

    init();
  }, []);
  async function handleToggle(e, routineId) {
    if (e.target.checked) {
      setDoneTodayIds((currValue) => [...currValue, routineId]);
      setHistory((currValue) => {
        const newHistory = currValue.map((singleHistory) => {
          if (routineId === singleHistory.routineid) {
            return {
              ...singleHistory,
              createdat: dayjs(),
            };
          }
          return singleHistory;
        });
        return newHistory;
      });
      const res = await createRoutineDetail(routineId);
    }
  }
  return (
    <div className="px-4">
      <div>
        {allRoutines.map((routine) => {
          return (
            <label className="label cursor-pointer" key={routine.id}>
              <span className="label-text">{routine.name}</span>
              <input
                type="checkbox"
                className="checkbox-accent checkbox"
                onChange={(e) => handleToggle(e, routine.id)}
                checked={doneTodayIds.indexOf(routine.id) > -1}
              />
            </label>
          );
        })}
      </div>
      <Status allRoutines={allRoutines} history={history} />
    </div>
  );
};

export default Routine;
