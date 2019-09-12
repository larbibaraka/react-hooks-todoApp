import React, { useReducer } from "react";
import "./App.css";

function appReducer(state, action) {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          id: Date.now(),
          text: "",
          isCompleted: false
        }
      ];
    }
    default:
      return state;
  }
}

export default function TodosApp() {
  const [state, dispatch] = useReducer(appReducer, []);

  const handleClick = () => {
    dispatch({
      type: "add"
    });
  };
  return (
    <div className="App">
      <h1>React hooks</h1>
      <button className="addbutton" onClick={handleClick}>
        New Todo
      </button>
      <br />
      <br />
      <br />
      <TodoList items={state} />
    </div>
  );
}

function TodoList({ items }) {
  return items.map(item => <TodoItem key={item.id} {...item} />);
}

function TodoItem({ id, text, isCompleted }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "1%"
      }}
    >
      <input type="checkbox" checked={isCompleted} />
      <input type="text" defaultValue={text} />
      <button className="deletebutton">delete</button>
    </div>
  );
}
