"use client";

import { useState, useEffect } from "react";
import { createRoutineDetail, getRoutines } from "@/utils/api";
import { useDebouncedCallback } from "use-debounce";
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
      {history.map(({ routineid, createdat, points }) => {
        const days = dayjs().diff(createdat, "day");
        console.log("days", days);
        if (days >= 2 || points === 0) {
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
  const [doneTodayIds, setDoneTodayIds] = useState<
    {
      routineId: number;
      points: number;
    }[]
  >([]);
  const [history, setHistory] = useState([]);
  const debouncedCreateRoutine = useDebouncedCallback(
    // function
    (postData) => {
      createRoutineDetail(postData);
    },
    // delay in ms
    1000,
  );
  useEffect(() => {
    async function init() {
      const data = await getRoutines();
      setAllRoutines(data.allRoutines);
      setHistory(data.history);
      const todayRoutineIds = data.todayRoutine.map(
        ({ id, routineid: routineId, points }) => {
          return { id, routineId, points };
        },
      );
      console.log({ todayRoutineIds });
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

  async function handleSliderChange(e, postData) {
    // console.log(e.target.value, routineId);
    const newDoneTodayIds = [...doneTodayIds];
    const doneTodayIndex = doneTodayIds.findIndex(
      (routine) => routine.routineId === postData.routineId,
    );
    if (doneTodayIndex > -1) {
      newDoneTodayIds[doneTodayIndex].points = e.target.value;
    } else {
      newDoneTodayIds.push({
        routineId: postData.routineId,
        points: e.target.value,
      });
    }
    setDoneTodayIds(newDoneTodayIds);
    const createdRoutineData = debouncedCreateRoutine({
      ...postData,
      points: e.target.value,
    });
    console.log({ createdRoutineData });
    /*     const newDoneTodayIds = doneTodayIds.map((routine) => {
      console.log("routine&&", routine.routineId, routineId);
      if (routine.routineId === routineId)
        return {
          routineId,
          points: e.target.value,
        };
      return routine;
    }); */
    // setDoneTodayIds(newDoneTodayIds);
  }
  return (
    <div className="px-4">
      <div>
        {allRoutines.map((routine) => {
          const todayDataIndex = doneTodayIds.findIndex(
            ({ routineId }) => routineId === routine.id,
          );
          const points = doneTodayIds[todayDataIndex]?.points || 0;
          const postData =
            todayDataIndex > -1
              ? {
                  id: doneTodayIds[todayDataIndex].id,
                }
              : {};

          return (
            <div key={routine.id} className=" py-4">
              <span className="label-text">{routine.name}</span>
              <div className="" key={routine.id}>
                <input
                  type="range"
                  min={0}
                  max={3}
                  value={points}
                  className="range"
                  step="1"
                  onChange={(e) =>
                    handleSliderChange(e, {
                      ...postData,
                      routineId: routine.id,
                    })
                  }
                />
                <div className="flex w-full justify-between px-2 text-xs">
                  <span>Didn&apos;t Do</span>
                  <span>Showed up</span>
                  <span>Decent</span>
                  <span>Went hard</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Status allRoutines={allRoutines} history={history} />
    </div>
  );
};

export default Routine;
