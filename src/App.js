import React, { useState, useEffect } from "react";
import { addDoc , collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { v4 } from "uuid";

const App = () => {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [tempid, setTempid] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const todosRef = collection(db, "todos");

  // Post
  const createPost = async () => {
    const id = v4();
    await addDoc(todosRef, {
      todo: todo,
      done: false,
      id: id,
    });
    setTodos([...todos, { todo: todo, done: false, id: id }]);
    setTodo("");
  };

  // Delete
  const deletePost = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);

    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Get
  const getPosts = async () => {
    const data = await getDocs(todosRef);
    const fetchedTodos = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setTodos(fetchedTodos);
  };

  useEffect(() => {
    const todosRef = collection(db, "todos");

    const unsubscribe = onSnapshot(todosRef, (snapshot) => {
      const fetchedTodos = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
    
    // getPosts();
  }, []);

  // Update
  const updatePost = async (id, newTodoText) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, {
      todo: newTodoText
    });
    
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, todo: newTodoText } : todo
    ));
    setTodo("");
  };

  return(
    <>
      <h1 className="font-bold text-4xl">TODO</h1>
      <input value={todo} onChange={e => setTodo(e.target.value)} className="bg-gray-200 p-1 border-2 border-black" type="text" />
      {
        !isEdit
        ?  <button onClick={createPost} className="bg-gray-400 rounded-md p-1">Submit</button>
        : <>
            <button onClick={() => updatePost(tempid, todo)}className="bg-gray-400 rounded-md p-1">Update</button>
            <button onClick={() => {
              setIsEdit(false);
              setTempid("");
            }} className="bg-gray-400 rounded-md p-1">X</button>
          </>
      }

      {
        todos.map(todo => (
          <div className="m-2 bg-blue-300 w-44 rounded-md p-1">
            <h2 className="">{todo.todo}</h2>
            <button className="mr-6 p-1 bg-gray-400 rounded-md" onClick={() => {
              setTempid(todo.id);
              setIsEdit(true);
            }
            }>edit</button>
            <button className="p-1 bg-gray-400 rounded-md" onClick={() => deletePost(todo.id)}>delete</button>
          </div>
        ))
      }
    </>
  );
};

export default App;
