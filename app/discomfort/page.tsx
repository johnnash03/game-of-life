"use client";
import {
  addUncomfortableTask,
  getUnfinishedUncomfortable,
  markUncomfortableFinished,
} from "@/utils/api";
import { useEffect, useState } from "react";

const Undone = ({ undoneTasks, handleCheck }) => {
  const tasksList = undoneTasks.map((undoneTask) => {
    return (
      <label className="label cursor-pointer" key={undoneTask.id}>
        <span className="label-text">{undoneTask.name}</span>
        <input
          type="checkbox"
          className="checkbox-accent checkbox"
          onChange={(e) => handleCheck(e, undoneTask.id)}
          checked={undoneTask.done}
        />
      </label>
    );
  });
  return tasksList;
};
const Discomfort = () => {
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [undoneTasks, setUndoneTasks] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getUnfinishedUncomfortable();
      setUndoneTasks(data);
    })();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await addUncomfortableTask(name, Number(points));
    if (res.id) {
      setUndoneTasks((currVal) => {
        return [...currVal, res];
      });
    }
    console.log("res", res);
  }

  async function handleCheck(e, undoneTaskId) {
    if (e.target.checked) {
      setUndoneTasks((currVal) => {
        return currVal.map((undoneTask) => {
          if (undoneTask.id === undoneTaskId) {
            return {
              ...undoneTask,
              done: true,
            };
          }
          return undoneTask;
        });
      });
      const updatedData = await markUncomfortableFinished(undoneTaskId);

      console.log("markUncomfortableFinished", updatedData);
    }
  }
  return (
    <div className="px-4">
      <div className="py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Fear/Discomfort"
            className="input input-bordered"
          />
          <input
            type="number"
            value={points}
            onChange={(e) => {
              setPoints(e.target.value);
            }}
            placeholder="points"
            className="input input-bordered"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={name === "" || points === ""}
          >
            Add
          </button>
        </form>
      </div>
      <div>
        <h4>Undone</h4>
        <Undone undoneTasks={undoneTasks} handleCheck={handleCheck} />
      </div>
    </div>
  );
};

export default Discomfort;
