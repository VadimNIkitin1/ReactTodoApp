import { Component } from "react";
import Task from "../Task/Task";
import "./TaskList.css";

export default class TaskList extends Component {
  render() {
    const { todos, onEdit, onDeleted, onToggleCompleted, changeTodoTask } =
      this.props;
    const elements = todos.map((el) => {
      const { id, ...elProps } = el;
      return (
        <Task
          {...elProps}
          key={id}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          changeEditClassName={onEdit}
          id={id}
          changeTodoTask={changeTodoTask}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
