import { Component } from "react";
import "./TasksFilter.css";

export default class TasksFilter extends Component {
  render() {
    const { onFilterChange, currentFilter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            className={currentFilter === "all" ? "selected" : ""}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={currentFilter === "active" ? "selected" : ""}
            onClick={() => onFilterChange("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={currentFilter === "completed" ? "selected" : ""}
            onClick={() => onFilterChange("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
