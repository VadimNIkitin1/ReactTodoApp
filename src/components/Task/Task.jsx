import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = { createdString: this.formatTime(props.createdTime) };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        createdString: this.formatTime(this.props.createdTime),
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime(time) {
    return formatDistanceToNow(time, { includeSeconds: true });
  }

  render() {
    // Получение свойств
    const { label, onDeleted, onToggleCompleted, completed } = this.props;
    // Добавления класса 'выполнено'
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
            <span className="created">{this.state.createdString}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}
