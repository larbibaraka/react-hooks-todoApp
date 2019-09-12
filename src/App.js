import React, { useReducer, useContext } from "react";
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
    case "delete": {
      return [...state];
    }
    default:
      return state;
  }
}

const Context = React.createContext();

export default function TodosApp() {
  const [state, dispatch] = useReducer(appReducer, []);

  const handleAdd = () => {
    dispatch({
      type: "add"
    });
  };
  return (
    <Context.Provider value={dispatch} className="App">
      <h1>React hooks</h1>
      <button className="addbutton" onClick={handleAdd}>
        New Todo
      </button>
      <br />
      <br />
      <TodoList items={state} />
    </Context.Provider>
  );
}

function TodoList({ items }) {
  return items.map(item => <TodoItem key={item.id} {...item} />);
}

function TodoItem({ id, text, isCompleted }) {
  const dispatch = useContext();
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
      <button
        className="deletebutton"
        onClick={() =>
          dispatch({
            type: "delete",
            payload: id
          })
        }
      >
        delete
      </button>
    </div>
  );
}
