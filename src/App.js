import Footer from "./components/Footer/Footer";
import NewTaskForm from "./components/NewTask/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";
import { Component } from "react";

export default class App extends Component {
  // Генерация ID
  maxID = 1;
  //инициализация состояния приложения
  state = {
    todoData: [
      this.createTodoItem("Drink Cofee"),
      this.createTodoItem("Build React App"),
      this.createTodoItem("Go walking"),
    ],
  };
  // Функцция создания нового элемента для state
  createTodoItem(label) {
    return {
      label,
      completed: false,
      id: this.maxID++,
    };
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
      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArr,
      };
    });
  };
  render() {
    return (
      <div className="App">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm onAddedItem={this.addItem} />
          </header>
          <section className="main">
            <TaskList
              todos={this.state.todoData}
              onDeleted={this.deleteItem}
              onToggleCompleted={this.onToggleCompleted}
            />
            <Footer todos={this.state.todoData} />
          </section>
        </section>
      </div>
    );
  }
}
