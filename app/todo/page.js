"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Editing an existing task
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex] = { title, description };
      setMainTask(updatedTasks);
      setEditIndex(null);
    } else {
      // Adding a new task
      setMainTask([...mainTask, { title, description }]);
    }
    // Reset input fields
    setTitle("");
    setDescription("");
  };

  const handleEdit = (i) => {
    const taskToEdit = mainTask[i];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setEditIndex(i);
  };

  const handleDelete = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const handleLogout = () => {
    router.back();
  };

  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between mb-5">
          <div className="flex justify-between w-2/4">
            <h5 className="text-3xl font-semibold">{t.title}</h5>
            <h6 className="text-xl font-medium">{t.description}</h6>
          </div>
          <button
            onClick={() => handleEdit(i)}
            className="bg-yellow-500 text-white px-4 py-3 text-xl font-normal rounded-xl m-4"
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleDelete(i);
            }}
            className="bg-red-600 text-red px-4 py-3 text-xl font-normal rounded-xl m-4"
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-3xl font-bold text-center">
        To Do List
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-2xl font-normal border-black border-2 m-10 px-5 py-4"
          placeholder="Add New Task Here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl font-normal border-zinc-500 border-2 m-10 px-5 py-4"
          placeholder="Task Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="bg-black text-white px-4 py-3 text-xl font-bold rounded-xl m-4">
          {editIndex !== null ? "Update" : "Add"}
        </button>

        <button
        onClick={handleLogout}
        className="bg-stone-600 text-white px-4 py-3 text-xl font-bold rounded-xl ml-40 place-content-end"
      >
        Logout
      </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-800 text-white">
        <ul className="text-center">{renderTask}</ul>
      </div>
    </>
  );
};

export default todo;
