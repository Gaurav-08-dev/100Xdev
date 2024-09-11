import {useRecoilState, useRecoilValue} from "recoil";
import { gymSelector, todos } from "../store/atoms/Todos";
import { useState } from "react";
const Todo = () => {

    const [todo, setTodo] = useRecoilState(todos);
    const gymTodo = useRecoilValue(gymSelector)

    console.log(gymTodo)
  const [todoDetail, setTodoDetail] = useState({});
  const handleTitleChange = (e) => {
    setTodoDetail({
      ...todoDetail,
      title: e.target.value,
    });
  };
  const handleDescriptionChange = (e) => {
    setTodoDetail({
      ...todoDetail,
      desc: e.target.value,
    });
  };
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <input onChange={(e)=>handleTitleChange(e)} value={todoDetail.title} placeholder="title"/>
      <input onChange={(e)=>handleDescriptionChange(e)} value={todoDetail.desc} placeholder="description"/>
      <button
        onClick={() => {
          setTodo([...todo, todoDetail]);
          setTodoDetail({});
        }}
      >
        Add Todo
      </button>

      {
        <div style={{display:"flex", flexDirection:"column"}}>
            {
                todo.map(item => <span key={item.title}>{item.title}</span>)
            }
        </div>
      }


    </div>
  );
};

export default Todo;
