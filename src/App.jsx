import { useState, useEffect } from 'react';

import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTask/NewTaskForm';

export default function App() {
  let maxID = 1;

  const createTodoItem = (label, min, sec) => {
    const time = Number(min) * 60 + Number(sec);
    return {
      label,
      time,
      lastTick: 0,
      timeOut: time !== 0,
      stopped: true,
      completed: false,
      id: maxID++,
      createdTime: new Date(),
      edit: false,
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink Cofee', 0, 5),
    createTodoItem('Build React App', 1, 5),
    createTodoItem('Go walking', 1, 30),
  ]);

  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setTodoData((todoData) => {
        const newTodoData = todoData.map((task) => {
          const newTask = { ...task };
          const now = Date.now();
          const diff = (now - newTask.lastTick) / 1000;
          if (!task.stopped) {
            newTask.time += newTask.timeOut ? -diff : diff;
            newTask.time = Math.max(newTask.time, 0);
            newTask.lastTick = now;
          }

          if (newTask.time <= 0 || newTask.completed) {
            newTask.stopped = true;
          }

          return newTask;
        });

        return newTodoData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getFilteredTasks = () => {
    if (currentFilter === 'active') {
      return todoData.filter((el) => !el.completed);
    }

    if (currentFilter === 'completed') {
      return todoData.filter((el) => el.completed);
    }

    return todoData;
  };

  const toggleTimer = (id) => {
    const idx = todoData.findIndex((data) => data.id === id);
    if (idx === -1) return;
    const newTodoData = [...todoData];
    newTodoData[idx].stopped = !newTodoData[idx].stopped;
    newTodoData[idx].lastTick = Date.now();
    setTodoData(newTodoData);
  };

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return newArr;
    });
  };

  const changeEditClassName = (id) => {
    const update = todoData.map((data) => {
      const newData = data;
      if (newData.id === id) {
        newData.edit = !newData.edit;
      } else {
        newData.edit = false;
      }
      return newData;
    });
    setTodoData(update);
  };

  const changeTodoTask = (id, string) => {
    const update = todoData.map((data) => {
      const newData = { ...data };
      if (newData.id === id) {
        newData.label = string;
      }
      newData.edit = false;
      return newData;
    });
    setTodoData(update);
  };

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    setTodoData((todoData) => {
      const newArr = [...todoData, newItem];
      return newArr;
    });
  };

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return newArr;
    });
  };

  const onClearCompleted = () => {
    setTodoData((todoData) => todoData.filter((el) => !el.completed));
  };

  const onFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddedItem={addItem} />
        </header>
        <section className="main">
          <TaskList
            toggleTimer={toggleTimer}
            todos={getFilteredTasks()}
            onEdit={changeEditClassName}
            onDeleted={deleteItem}
            onToggleCompleted={onToggleCompleted}
            changeTodoTask={changeTodoTask}
          />
          <Footer
            currentFilter={currentFilter}
            completedCount={todoData.filter((el) => !el.completed).length}
            onClearCompleted={onClearCompleted}
            onFilterChange={onFilterChange}
          />
        </section>
      </section>
    </div>
  );
}
