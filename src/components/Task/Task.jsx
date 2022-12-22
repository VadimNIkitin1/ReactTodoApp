import { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  static defaultProps = {
    label: '',
    completed: '',
    edit: '',
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

  static formatTime(time) {
    return formatDistanceToNow(time, { includeSeconds: true });
  }

  constructor(props) {
    super(props);

    this.state = {
      createdString: this.formatTime(props.createdTime),
      labelNew: props.label,
    };
  }

  // Функции показателя времени
  componentDidMount() {
    this.timer = setInterval(() => {
      const { createdTime } = this.props;
      this.setState({
        createdString: this.formatTime(createdTime),
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Функции редактирования задач

  onLabelEditChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmitEdit = (e) => {
    e.preventDefault();
    const { id, changeTodoTask } = this.props;
    const { label } = this.state;

    changeTodoTask(id, label);
  };

  render() {
    // Получение свойств
    const { label, completed, id, onDeleted, onToggleCompleted, edit, changeEditClassName } = this.props;
    const { createdString, labelNew } = this.state;
    // Добавления класса 'выполнено'
    let completedClassName = '';
    if (completed) {
      completedClassName += 'completed';
    }

    return !edit ? (
      <li className={completedClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
          <span>
            <span className="description">{label}</span>
            <span className="created">{createdString}</span>
          </span>
          <button className="icon icon-edit" aria-label="Edit" onClick={() => changeEditClassName(id)} />
          <button className="icon icon-destroy" aria-label="Delete" onClick={onDeleted} />
        </div>
      </li>
    ) : (
      <form onSubmit={this.onSubmitEdit}>
        <input className="edit" onChange={this.onLabelEditChange} value={labelNew} />
      </form>
    );
  }
}
