import {atom, selector} from "recoil";
export const todos = atom({
    key:"todos",
    default:[]
})

export const gymSelector = selector({

    key:"gymSelector",
    get:({get})=>{
        const gymTodo = get(todos)
        return gymTodo.filter(item => item.title.includes("gym") || item.desc.includes("gym"))
    }
})
