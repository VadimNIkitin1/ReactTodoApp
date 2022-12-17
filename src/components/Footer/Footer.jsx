import { Component } from "react";
import TasksFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    const { completedCount, onClearCompleted, onFilterChange, currentFilter } =
      this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{completedCount} Item Left</span>
        <TasksFilter
          currentFilter={currentFilter}
          onFilterChange={onFilterChange}
        />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
