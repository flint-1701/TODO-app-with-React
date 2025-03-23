import React, { useState } from 'react'
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";




const Body = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    let storageTodos = localStorage.getItem("todos");
    if(storageTodos){
      let parsedtodos = JSON.parse(storageTodos)
      setTodos(parsedtodos)
    }
  }, [])


  const savetoLs = () =>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const handleAdd = (t)=>{
    setTodos([...todos,{"id": uuidv4() ,"todo": todo,"isCompleted":false,"isDeleted":false}])
    setTodo("")
    savetoLs()
  }

  const handleChange = (e)=>{
    //console.log(e.target.value)
    setTodo(e.target.value)
  }

  const hanldeEdit = (e,id)=>{
    let latestTodo = todos.filter(x=>x.id === id)
    setTodo(latestTodo[0].todo)
    let LatestTodos = todos.filter(x=>
       x.id != id
    )
    setTodos(LatestTodos)
    savetoLs()
  }

  const handleDelete = (e,id)=>{
    confirm('Are you sure you want to delete the task')
    let LatestTodos = todos.filter(x =>
      x.id != id
    )
    setTodos(LatestTodos) 
    savetoLs()
  }

  const hanldeCheckBox = (e) => {
    let LatestTodos = [...todos]
    LatestTodos.forEach(x=>{
      if(x.id == e.target.name){
        x.isCompleted = !x.isCompleted
      }
    })
    setTodos(LatestTodos)
    savetoLs()
  }
  
  const handleCompleted = () =>{
    setShowCompleted(!showCompleted)
  }

  const hanldeInputClick = () =>{
    setClicked(!clicked)
  }


  return (
    <div>
      <div className='container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-screen'>      
        <div className="container flex flex-col items-center"> 
        <h1 className='font-bold'>My Todos</h1>  
        <input onChange={handleChange} className={`rounded-lg py-2 w-1/2 px-2 my-3 shadow-md1 focus:animate-bounce`} type='text' value={todo} />
        <button onClick = {handleAdd} disabled={todo.length<=3} className='bg-violet-500 hover:bg-violet-700 shadow-md text-white rounded-lg  w-1/2 mx-2 px-4 py-2 disabled:bg-gray-500 hover:cursor-pointer'>Add</button>
        </div>       
        
        <input type='checkbox' onChange={handleCompleted}/>
        <span className='my-3'> Show Completed Todos</span>
        <div className="todos">
        <h2 className="font-bold my-3">
          Your Todos :
        </h2>
            {todos.length == 0 && "No todos to display"}
            {todos.map( (tl)=>{
              return (showCompleted || (!tl.isCompleted)) && <div key={tl.id} className="todoList flex items-center w-1/2 my-3">
                <input type="checkbox" name = {tl.id} onChange={hanldeCheckBox} className='m-5' checked={tl.isCompleted} />
                <div  className={tl.isCompleted ? "line-through":""}>
                  {tl.todo}
                </div>
                <div className="config flex h-full">
                <button className='bg-violet-500 hover:bg-violet-700 text-white rounded-lg mx-2 px-4 py-2 shadow-md' onClick={(e)=> hanldeEdit(e,tl.id)} name={tl.id} ><MdModeEdit />
                </button>
                <button className='bg-violet-500 hover:bg-violet-700 text-white rounded-lg mx-2 px-4 py-2 shadow-md' name={tl.id} onClick={(e)=> handleDelete(e,tl.id)}><MdDeleteForever />
                </button>
                </div>                
              </div>
            })}
        </div>
      </div>
    </div>
  )
}

export default Body
