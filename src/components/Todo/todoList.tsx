import React, { useState, useEffect } from "react";
import { Todo } from "../../data/dataDef";
import { addTodo } from "../../Function/add";

import "./TodoList.scss"; // Import the SCSS file
import { Start } from "./start";
import { InProgress } from "./progress";
import { Completed } from "./completed";

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTodos(addTodo(todos, newTodo));
      setNewTodo("");
    }
  };

  const addingList = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTodos(addTodo(todos, newTodo));
    setNewTodo("");
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    toggle && localStorage.setItem("todos", JSON.stringify(todos));
    setToggle(true);
  }, [todos]);

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
        />
        <button onClick={addingList}>Add</button>
      </div>
      <div className="container">
        <Start todos={todos} setTodos={setTodos} />
        <InProgress todos={todos} setTodos={setTodos} />
        <Completed todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};
