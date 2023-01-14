import { Component } from 'react';

import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTask/NewTaskForm';

export default class App extends Component {
  // Генерация ID

  maxID = 1;

  // инициализация состояния приложения

  state = {
    todoData: [
      this.createTodoItem('Drink Cofee', 0, 5),
      this.createTodoItem('Build React App', 1, 5),
      this.createTodoItem('Go walking', 1, 30),
    ],
    currentFilter: 'all',
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { todoData } = this.state;
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

      this.setState({
        todoData: newTodoData,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getFilteredTasks() {
    const { currentFilter, todoData } = this.state;
    if (currentFilter === 'active') {
      return todoData.filter((el) => !el.completed);
    }

    if (currentFilter === 'completed') {
      return todoData.filter((el) => el.completed);
    }

    return todoData;
  }

  toggleTimer = (id) => {
    const { todoData } = this.state;
    const idx = todoData.findIndex((data) => data.id === id);
    if (idx === -1) return;
    const newTodoData = [...todoData];
    newTodoData[idx].stopped = !newTodoData[idx].stopped;
    newTodoData[idx].lastTick = Date.now();
    this.setState({
      todoData: newTodoData,
    });
  };

  // Функция удаления задачи из списка
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  changeEditClassName = (id) => {
    const { todoData } = this.state;
    const update = todoData.map((data) => {
      const newData = data;
      if (newData.id === id) {
        newData.edit = !newData.edit;
      } else {
        newData.edit = false;
      }
      return newData;
    });
    this.setState({ todoData: update });
  };

  changeTodoTask = (id, string) => {
    const { todoData } = this.state;
    const update = todoData.map((data) => {
      const newData = { ...data };
      if (newData.id === id) {
        newData.label = string;
      }
      newData.edit = false;
      return newData;
    });
    this.setState({ todoData: update });
  };

  // Функция добавления задачи в список
  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  // Функция смены задачи на 'выполнено'
  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  // функция очистки выполненых задач
  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const completedArr = todoData.filter((el) => !el.completed);
      return {
        todoData: completedArr,
      };
    });
  };

  // Функции фильтрации списка задач
  onFilterChange = (filter) => {
    this.setState({ currentFilter: filter });
  };

  // Функцция создания нового элемента для state
  createTodoItem(label, min, sec) {
    const time = Number(min) * 60 + Number(sec);
    return {
      label,
      time,
      lastTick: 0,
      timeOut: time !== 0,
      stopped: true,
      completed: false,
      id: this.maxID++,
      createdTime: new Date(),
      edit: false,
    };
  }

  render() {
    const { currentFilter, todoData } = this.state;
    return (
      <div className="App">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm onAddedItem={this.addItem} />
          </header>
          <section className="main">
            <TaskList
              toggleTimer={this.toggleTimer}
              todos={this.getFilteredTasks()}
              onEdit={this.changeEditClassName}
              onDeleted={this.deleteItem}
              onToggleCompleted={this.onToggleCompleted}
              changeTodoTask={this.changeTodoTask}
            />
            <Footer
              currentFilter={currentFilter}
              completedCount={todoData.filter((el) => !el.completed).length}
              onClearCompleted={this.onClearCompleted}
              onFilterChange={this.onFilterChange}
            />
          </section>
        </section>
      </div>
    );
  }
}
