import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await axios.get("https://backend-todo-js.vercel.app/api/todos");
      setTodos(response.data.data); // Assuming the data is stored in the 'data' property
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('https://backend-todo-js.vercel.app/api/todos/add', {
        Title: title
      });
      console.log('Data sent successfully');
      // Reset the input field after successful data submission
      setTitle('');
      fetchTodos(); // Fetch updated todos after adding a new one
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const del = (_id) =>{
    console.log(_id)
    axios.delete(`https://backend-todo-js.vercel.app/api/todos/${_id}`)
    .then((res)=>{
      console.log(res)
      fetchTodos()
    })
    .catch((err)=>{
      console.log(err)
    })
 }
 const edit =  (_id) =>{
   const newtodo = prompt('enter new title')

   axios.put(`https://backend-todo-js.vercel.app/api/todos/${_id}` , {
    Title: newtodo
  }).then((res)=>{
    console.log(res);
    fetchTodos()
  })
.catch((err)=>{
  console.log(err);
})

  console.log(_id)
}

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add todo</button>
        </form>
      </div>

      <div>
        <h2>Todos</h2>
        <ol>
          {todos.map(todo => (
            <li key={todo._id}>{todo.Title}
            <button  onClick={ ()=>edit(todo._id)}>edit</button>
            <button onClick={ ()=>del(todo._id)}>delete</button></li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default App;
