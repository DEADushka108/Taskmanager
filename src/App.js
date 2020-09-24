import React, {useEffect} from 'react';
import TodoList from './todo/todo-list';
import Context from './context.js';
import Loader from './loader.js';
import Modal from './modal/modal.js';

const AddTodo = React.lazy(() => import('./todo/add-todo.js'));

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] =React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([
      {
        title,
        id: Date.now(),
        completed: false
      }
    ]))
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className='wrapper'>
        <h1>React Taskmanager</h1>
        <Modal></Modal>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo}></AddTodo>
        </React.Suspense>
        {loading && <Loader></Loader>}
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}></TodoList> : (
        loading ? null : <p>No todos</p>)}
      </div>
    </Context.Provider>
  );
}

export default App;
