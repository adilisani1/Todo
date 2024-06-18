import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const Todos = () => {

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todokey');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [todoInput, setTodoInput] = useState("");
    const [todoId, setTodoId] = useState(2);


    useEffect(() => {
        localStorage.setItem('todokey', JSON.stringify(todos))
    }, [todos])

    const addTodo = (e) => {
        e.preventDefault();
        if (todoInput.trim().length === 0) {
            return;
        }
        setTodos([
            ...todos,
            {
                id: todoId,
                title: todoInput,
                isEditing: false,
                editingText: "",
                isCompleted: false,
            }
        ]);

        setTodoId(prevTodoId => prevTodoId + 1);
        setTodoInput("");
    };

    function handleEditingTextChange(id, text) {
        const changingTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    editingText: text,


                };
            }
            return todo;
        });
        setTodos(changingTodos);
    }

    function markAsEditing(id) {
        const editedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isEditing: true,
                    editingText: todo.title,




                };
            }
            return todo;
        });
        setTodos(editedTodos);
    }

    const updateTodo = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title: todo.editingText,
                    isEditing: false
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };


    const completeHandler = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                };
            }
            return todo;
        }));
    }

    return (
        <div className='max-w-xl p-3 shadow-md bg-slate-100 rounded-md mx-auto'>
            <h1 className='text-center font-semibold text-3xl mb-6 pt-5'>Todo App</h1>
            <form onSubmit={addTodo} className='mb-5'>
                <input
                    type='text'
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    placeholder='Add todo'
                    className='w-full mb-5 p-2 rounded-md ring-1 focus:ring-indigo-500 outline-none' />
                <div className='flex justify-end'>
                    <button type='submit' className='bg-indigo-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-indigo-600'>Add Todo</button>
                </div>
            </form>

            <ul>
                {todos.map((todo) => (
                    <div key={todo.id} className='flex items-center bg-slate-200 p-3 rounded-sm justify-between mb-5'>
                        {todo.isEditing ? (
                            <input
                                type='text'
                                value={todo.editingText}
                                onChange={(e) => handleEditingTextChange(todo.id, e.target.value)}
                                className={`w-full p-2 mr-2 rounded-md ring-1 focus:ring-indigo-500 outline-none `} />
                        ) : (
                            <li className={`text-lg font-medium font-sans ${todo.isCompleted ? 'line-through' : ''}  transition-all ease-in duration-500`}>
                                {todo.title}
                            </li>
                        )}
                        <div className='flex gap-3'>
                            {todo.isEditing ? (
                                <button className='bg-red-400 text-sm text-white px-3 py-2 rounded-md shadow-md hover:bg-red-300'
                                    onClick={() => updateTodo(todo.id)}>
                                    Save
                                </button>
                            ) : (
                                <button className='bg-orange-500 text-sm text-white px-3 py-2 rounded-md shadow-md hover:bg-orange-600'
                                    onClick={() => markAsEditing(todo.id)}>
                                    {/* Edit */}
                                    <MdEdit />
                                </button>
                            )}
                            <button className={`bg-green-500 text-md text-white px-2 py-2 rounded-md shadow-md hover:bg-green-600
                             ${todo.isCompleted ? ' bg-purple-500 hover:bg-purple-700' : ''}`}
                                onClick={() => completeHandler(todo.id)}>
                                {todo.isCompleted ? "Undo" : <TiTick />}
                            </button>
                            <button className='bg-red-500 text-sm text-white px-2 py-2 rounded-md shadow-md hover:bg-red-600'
                                onClick={() => deleteTodo(todo.id)}>

                                <RxCross2 />
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Todos;
