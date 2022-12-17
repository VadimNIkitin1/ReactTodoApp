import { Component } from "react";
import TasksFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    const { todos } = this.props;
    const completedCount = todos.filter((el) => el.completed).length;
    return (
      <footer className="footer">
        <span className="todo-count">{completedCount} Item Left</span>
        <TasksFilter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}
