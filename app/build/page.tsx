"use client";
import Link from "next/link";
import { useEffect, useState, FormEvent } from "react";
import { Project } from "./mockData";
import { createNewProject, getAllProjects } from "@/utils/api";
const Build = () => {
  useEffect(() => {
    async function getData() {
      const data = await getAllProjects();
      console.log({ data });
      setProjects(data);
    }
    getData();
  }, []);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const handleAddProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject = await createNewProject(projectName);
    console.log("newProject", newProject);
    setProjects([...projects, newProject]);
  };
  return (
    <div>
      <form onSubmit={handleAddProject}>
        <label htmlFor="add-input">Add Project</label>
        <input
          id="add-input"
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {projects.map(({ id, name }: { id: number; name: string }) => {
          return (
            <li key={id}>
              <Link href={`/build/${id}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Build;
