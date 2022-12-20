import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";

import { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdString: this.formatTime(props.createdTime),
      label: props.label,
    };
  }

  static defaultProps = {
    label: "",
    completed: "",
    edit: "",
    id: 0,
    onDeleted: () => {},
    onToggleCompleted: () => {},
    changeEditClassName: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    completed: PropTypes.bool,
    edit: PropTypes.bool,
    id: PropTypes.number,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    changeEditClassName: PropTypes.func,
  };

  // Функции показателя времени
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
  // Функции редактирования задач

  onLabelEditChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmitEdit = (e) => {
    e.preventDefault();
    this.props.changeTodoTask(this.props.id, this.state.label);
  };

  render() {
    // Получение свойств
    const {
      label,
      completed,
      id,
      onDeleted,
      onToggleCompleted,
      edit,
      changeEditClassName,
    } = this.props;
    // Добавления класса 'выполнено'
    let completedClassName = "";
    if (completed) {
      completedClassName += "completed";
    }

    return !edit ? (
      <li className={completedClassName}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={onToggleCompleted}
            checked={completed}
          />
          <label>
            <span className="description">{label}</span>
            <span className="created">{this.state.createdString}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => changeEditClassName(id)}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    ) : (
      <form onSubmit={this.onSubmitEdit}>
        <input
          className="edit"
          onChange={this.onLabelEditChange}
          value={this.state.label}
          autoFocus
        />
      </form>
    );
  }
}
