import { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  render() {
    // Получение свойств
    const { label, onDeleted, onToggleCompleted, completed } = this.props;

    let completedClassName = "";
    if (completed) {
      completedClassName += "completed";
    }

    return (
      <li className={completedClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={onToggleCompleted}>
              {label}
            </span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}
