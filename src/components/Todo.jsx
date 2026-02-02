import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";


function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [dateTime, setDateTime] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input) return;
    if (todos.includes(input)) {
      setInput("");
      return;
    }
    setTodos((prevTodos) => [...prevTodos, input]);
    setInput("");
  };

  localStorage.setItem("todos", JSON.stringify(todos));


  // for date and time ----------
  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString([], { hour12: true });
      setDateTime(`${date} - ${time}`);
    }, 1000);
  }, [setDateTime]);

  // clear all todos
  const handleClearAll = () => {
    setTodos([])
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="mt-10 mb-5">
        <h1 className="text-white text-center text-4xl font-bold">Todo List</h1>
        <h1 className="mt-4 text-gray-200 text-xl font-semibold">{dateTime}</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="">
          <input
            type="text"
            className="bg-gray-200 text-gray-800 p-4 w-50 -mr-4 rounded-l-3xl outline-none"
            placeholder="Add a new todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-4 rounded-r-3xl ml-2 cursor-pointer"
          >
            Add Task
          </button>
        </div>
      </form>

      <section>
        <ul className="mt-8">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="w-72 bg-gray-200 text-gray-800 p-4 mb-2 text-start border rounded-3xl"
            >
              {todo}
              <FaTrashCan className="inline float-right text-red-500 cursor-pointer ml-2 size-6"
                onClick={() => setTodos(todos.filter((_, i) => i !== index))}
              />
              <FaCheckCircle className="inline float-right text-green-500 cursor-pointer size-6 mx-4"
                
              />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <button className="bg-red-600 text-white p-2 rounded-lg mt-5 cursor-pointer" onClick={handleClearAll}>Clear All</button>
      </section>
    </div>
  );
}

export default Todo;
