import React from 'react'
import TopNavigation from './TopNavigation'
import { useDispatch } from 'react-redux'

function Tasks() {

  let dispatch = useDispatch();
  return (
    <div>
        <TopNavigation/>
        <h1>Tasks</h1>
        <button onClick={()=>{

        dispatch({type:"addTask",data:"something"});

        }}>Add Tasks</button>
    </div>
  )
}

export default Tasks