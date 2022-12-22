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
      this.createTodoItem('Drink Cofee'),
      this.createTodoItem('Build React App'),
      this.createTodoItem('Go walking'),
    ],
    currentFilter: 'all',
  };

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
  addItem = (text) => {
    const newItem = this.createTodoItem(text);
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
  createTodoItem(label) {
    return {
      label,
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
