"use client";
import { useEffect, useState, FormEvent } from "react";
import { mockProjectProgressType, Project } from "../mockData";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import {
  createProjectDetail,
  getAllProgressTypes,
  getProjectTimeline,
} from "@/utils/api";

const Timeline = ({
  currentProjectData,
  projectId,
}: {
  currentProjectData: Project;
  projectId: number;
}) => {
  const htmlData = Object.keys(currentProjectData)
    .sort()
    .reverse()
    .map((key, index) => {
      const isLast = index === Object.keys(currentProjectData).length - 1;
      if (isLast)
        return (
          <SingleTimeline
            key={key}
            isLast={true}
            date={currentProjectData[key][0].createdAt}
            data={currentProjectData[key]}
          />
        );
      return (
        <SingleTimeline
          isLast={false}
          date={currentProjectData[key][0].createdAt}
          data={currentProjectData[key]}
        />
      );
    });
  // return <div>{newTimeline()}</div>;
  return (
    <div>
      <h4>Project Timeline</h4>
      <div className="py-4">{htmlData}</div>
    </div>
  );
};

const SingleTimeline = ({ isLast, data, date }: { isLast: boolean }) => {
  if (!isLast) {
    return (
      <div className="flex">
        <div className="flex w-[calc(50%-4px)] items-center justify-center">
          {date}
        </div>
        <div className="relative w-1 bg-primary">
          <div className="absolute -left-[6px] -top-[8px] h-4 w-4 rounded-full bg-primary"></div>
        </div>
        <div className="w-[calc(50%-4px)]">
          <ul className="text-xs">
            {data.map(({ note }) => {
              return <li>{note}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="flex w-[calc(50%-4px)] items-center justify-center">
        {date}
      </div>
      <div className="relative w-1 bg-primary">
        <div className="absolute -left-[6px] -top-[8px] h-4 w-4 rounded-full bg-primary"></div>
        <div className="absolute -bottom-[8px] -left-[6px] h-4 w-4 rounded-full bg-primary"></div>
      </div>
      <div className="w-[calc(50%-4px)]">
        <ul className="text-xs">
          {data.map(({ note }) => {
            return <li>{note}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
const Add = ({
  projectId,
  handleAdd,
}: {
  projectId: string;
  handleAdd: (typeId: number, note: string) => void;
}) => {
  const [selectedTypeId, setSelectedTypeId] = useState(1);
  const [note, setNote] = useState("");
  function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAdd(selectedTypeId, note, setNote);
  }
  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        {mockProjectProgressType.map(({ id, name, points }) => {
          return (
            <div className="form-control" key={id}>
              <label className="label cursor-pointer" htmlFor={String(id)}>
                <span className="label-text">
                  {name} - {points}
                </span>
                <input
                  className="radio"
                  type="radio"
                  name="progresstype"
                  id={String(id)}
                  value={id}
                  checked={selectedTypeId === id}
                  onChange={() => {
                    setSelectedTypeId(id);
                  }}
                />
              </label>

              {/* <label htmlFor={String(id)}>
                {name} - {points}
              </label> */}
            </div>
          );
        })}
        <div className="flex gap-2 py-4">
          <label className="input input-bordered flex w-full items-center gap-2">
            Note
            {/* <input type="text" className="grow" placeholder="Daisy" /> */}
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full"
            />
          </label>
          <button disabled={note === ""} className="btn btn-primary  w-20">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
const SingleProject = () => {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  useEffect(() => {
    async function getProgressTypes() {
      const progressTypes = await getAllProgressTypes();
      const projectTimeline = await getProjectTimeline(projectId);
      setCurrentProjectData(projectTimeline);
    }
    getProgressTypes();
  }, [projectId]);

  const [currentProjectData, setCurrentProjectData] = useState([]);
  const [showToast, setShowToast] = useState("");
  async function handleAdd(
    typeId: number,
    note: string,
    updateNote: (text: string) => void,
  ) {
    const res = await createProjectDetail(projectId, typeId, note);
    if (res.id) {
      const newCurrentProjectData = { ...currentProjectData };
      const date = dayjs(newCurrentProjectData.createdAt).format("DD-MM-YY");
      if (newCurrentProjectData[date]) {
        newCurrentProjectData[date].push({ ...res, createdAt: date });
      } else {
        newCurrentProjectData[date] = [{ ...res, createdAt: date }];
      }
      setCurrentProjectData(newCurrentProjectData);
      setShowToast(`You got ${res.points} points`);
      updateNote("");
      setTimeout(() => {
        setShowToast("");
      }, 2000);
    }
  }
  return (
    <>
      <div className="p-4">
        <Add projectId={projectId} handleAdd={handleAdd} />
        <Timeline
          currentProjectData={currentProjectData}
          projectId={projectId}
        />
        {showToast !== "" && (
          <div className="toast">
            <div className="alert alert-info">
              <span>{showToast}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SingleProject;
