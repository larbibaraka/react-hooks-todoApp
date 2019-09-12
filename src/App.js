import React, { useReducer, useContext, useEffect } from "react";
import "./App.css";

function appReducer(state, action) {
  switch (action.type) {
    case "reset": {
      console.log("action.payload : ", action.payload);
      return action.payload;
    }
    case "add": {
      return [
        ...state,
        {
          id: Date.now(),
          text: "baraka xD",
          isCompleted: false
        }
      ];
    }
    case "delete": {
      return state.filter(item => item.id !== action.payload);
    }
    case "completeTask": {
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...state,
            isCompleted: !item.isCompleted
          };
        }
        return item;
      });
    }
    default:
      return state;
  }
}

const Context = React.createContext();

export default function TodosApp() {
  const [state, dispatch] = useReducer(appReducer, []);

  useEffect(() => {
    const raw = localStorage.getItem("data");
    dispatch({
      type: "reset",
      payload: JSON.parse(raw)
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

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
  return items.map(item => <TodoItem {...item} />);
}

function TodoItem({ id, text, isCompleted }) {
  const dispatch = useContext(Context);
  return (
    <div
      key={id}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "1%"
      }}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() =>
          dispatch({
            type: "completeTask",
            payload: id
          })
        }
      />
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
