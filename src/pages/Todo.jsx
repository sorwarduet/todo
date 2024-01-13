import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";

const Todo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [taskUpdate, setTaskUpdate] = useState({});

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalUpdate = () => {
    setIsOpenUpdate(false);
  };

  const handleTask = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputTask = { id: Date.now(), text: task };
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks, inputTask];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });

    setTask("");
    setIsOpen(false);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    console.log(taskUpdate);
    let list = [];
    tasks.map((item) => {
      if (item.id == taskUpdate.id) {
        list.push({ id: item.id, text: taskUpdate.text });
      } else {
        list.push(item);
      }
    });

    setTasks(list);

    localStorage.setItem("tasks", JSON.stringify(list));
    setIsOpenUpdate(false);
  };

  const handleDelete = (todo) => {
    const updatedTasks = tasks.filter((task) => task.id !== todo.id);
    setTasks(updatedTasks);

    // Remove the task from local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleTaskUpdate = (e) => {
    setTaskUpdate({ id: taskUpdate.id, text: e.target.value });
  };

  const handleUpdate = (todo) => {
    setIsOpenUpdate(true);
    setTaskUpdate({ id: todo.id, text: todo.text });
  };

  useEffect(() => {
    const storeTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storeTasks);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[40%] bg-emerald-300 p-3">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Todo List</h2>
          <button
            className="px-2 py-1 bg-yellow-500 rounded-sm"
            onClick={openModal}
          >
            Create
          </button>
        </div>

        <div>
          <ul className="py-3">
            {tasks.map((todo, key) => (
              <li
                key={todo.id}
                className="pb-2 flex justify-between items-center border border-amber-200"
              >
                <p className=" py-2 px-2 font-bold capitalizes ">
                  {" "}
                  {key + 1}: {todo.text}
                </p>
                <div className="">
                  <button
                    className="py-1 px-1 bg-white text-indigo-600 rounded-sm mr-2"
                    onClick={() => handleUpdate(todo)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(todo)}
                    className="py-1 px-1 bg-white text-red-500 rounded-sm"
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
              placeholder="Enter Task"
              onChange={handleTask}
            />
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-yellow-500 py-2 px-2 rounded-md w-full">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isOpenUpdate} onClose={closeModalUpdate}>
        <form onSubmit={handleSubmitUpdate}>
          <div className="flex flex-col">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
              value={taskUpdate.text}
              placeholder="Enter Task"
              onChange={handleTaskUpdate}
            />
          </div>
          <div className="flex justify-center mt-3">
            <button className="bg-blue-300 py-2 px-2 rounded-md w-full">
              Update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Todo;
