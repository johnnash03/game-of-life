"use client";
import React, { useState, useRef } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { createTask, updateTask } from "@/app/actions";
import { useParams } from "next/navigation";
import Timer from "@/components/Timer";
import clsx from "clsx";
const Task = ({ data }) => {
  console.log("data in list", data);
  const [taskSelectedId, setTaskSelectedId] = useState(0);
  function handleTaskClick(id) {
    setTaskSelectedId(id);
  }
  let selectedTaskIndex, timeAlreadySpent, strategyId;
  if (taskSelectedId !== 0) {
    selectedTaskIndex = data.findIndex(({ id }) => id === taskSelectedId);
    timeAlreadySpent = data[selectedTaskIndex].time;
    strategyId = data[selectedTaskIndex].strategyid;
  }
  function onStop(isComplete: boolean, minutes: number) {
    console.log("minutes", minutes);
    // @FIXME: Remove 1
    updateTask(taskSelectedId, minutes, isComplete, strategyId);
    setTaskSelectedId(0);
  }
  return (
    <div>
      <AddForm />

      <List
        data={data}
        updateTask={handleTaskClick}
        taskSelectedId={taskSelectedId}
      ></List>
      {taskSelectedId !== 0 && (
        <Timer onStop={onStop} timeAlreadySpent={timeAlreadySpent * 60} />
      )}
    </div>
  );
};

const AddForm = () => {
  const params = useParams();
  console.log("params", params);
  const ref = useRef<HTMLFormElement>();
  async function handleFormSubmit(formData: FormData) {
    const response = await createTask(formData);
    if (response) {
      ref.current.reset();
    } else {
    }
  }
  return (
    <form action={handleFormSubmit} className="flex gap-2 p-4" ref={ref}>
      <input
        type="text"
        className="hidden"
        name="strategyid"
        readOnly
        value={Number(params.strategyid)}
      />
      <input
        type="text"
        className="input input-bordered w-32"
        id="task"
        name="task"
        required
        placeholder="New Task"
      />
      <input
        type="number"
        className="input input-bordered w-24"
        id="points"
        name="points"
        required
        placeholder="points"
      />
      <button type="submit" className="btn btn-primary rounded-full">
        +
      </button>
    </form>
  );
};
const List = ({ data, updateTask, taskSelectedId }) => {
  return (
    <div className="p-4">
      {data.map(({ id, name, points, time }) => {
        return (
          <div key={id}>
            <label>
              <div
                className={clsx("flex justify-between p-2", {
                  "flex rounded-md bg-gray-600 p-2": id === taskSelectedId,
                })}
              >
                <div>{name}</div>
                {time !== 0 && <div>{time} mins</div>}
              </div>
              <input
                className="hidden"
                type="radio"
                name="task"
                checked={id === taskSelectedId}
                onChange={() => updateTask(id)}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Task;
