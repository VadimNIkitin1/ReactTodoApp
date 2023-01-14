/* eslint-disable jsx-a11y/control-has-associated-label */
import { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

import './Task.css';

import { getPadTime } from '../../helpers/getPadTime';

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
      createdString: Task.formatTime(props.createdTime),
      labelNew: props.label,
    };
  }

  // Функции показателя времени
  componentDidMount() {
    this.timer = setInterval(() => {
      const { createdTime } = this.props;
      this.setState({
        createdString: Task.formatTime(createdTime),
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Функции редактирования задач

  onLabelEditChange = (e) => {
    this.setState({
      labelNew: e.target.value,
    });
  };

  onToggleTimer = () => {
    const { toggleTimer, id } = this.props;
    toggleTimer(id);
  };

  onSubmitEdit = (e) => {
    e.preventDefault();
    const { id, changeTodoTask } = this.props;
    const { labelNew } = this.state;

    changeTodoTask(id, labelNew);
  };

  render() {
    // Получение свойств
    const { label, completed, id, onDeleted, onToggleCompleted, edit, changeEditClassName, stopped, time } = this.props;
    const { createdString, labelNew } = this.state;
    // Добавления класса 'выполнено'
    let completedClassName = '';
    if (completed) {
      completedClassName += 'completed';
    }

    const min = Math.floor(time / 60);
    const sec = Math.round(time - min * 60);

    return !edit ? (
      <li className={completedClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
          <span className="wrap">
            <span className="description">{label}</span>
            <span className="description">
              <button
                className="icon-play-btn"
                onClick={this.onToggleTimer}
                style={stopped ? { display: 'inline' } : { display: 'none' }}
              />
              <button
                className="icon-pause-btn"
                onClick={this.onToggleTimer}
                style={stopped ? { display: 'none' } : { display: 'inline' }}
              />
              {`${getPadTime(min)}:${getPadTime(sec)}`}
            </span>
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
