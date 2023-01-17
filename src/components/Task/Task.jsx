import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

import './Task.css';

import { getPadTime } from '../../helpers/getPadTime';

export default function Task(props) {
  const {
    label,
    completed,
    id,
    onDeleted,
    onToggleCompleted,
    edit,
    changeEditClassName,
    stopped,
    time,
    createdTime,
    changeTodoTask,
  } = props;

  Task.defaultProps = {
    label: '',
    completed: '',
    edit: '',
    id: 0,
    onDeleted: () => {},
    onToggleCompleted: () => {},
    changeEditClassName: () => {},
  };

  Task.propTypes = {
    label: PropTypes.string,
    completed: PropTypes.bool,
    edit: PropTypes.bool,
    id: PropTypes.number,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    changeEditClassName: PropTypes.func,
  };
  const formatTime = () => formatDistanceToNow(createdTime, { includeSeconds: true });

  const [createdString, setCreatedString] = useState(formatTime(createdTime));
  const [labelNew, setLabelNew] = useState(label);

  useEffect(() => {
    const timer = setInterval(() => {
      setCreatedString(formatTime(createdTime));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const onLabelEditChange = (e) => {
    setLabelNew(e.target.value);
  };

  const onToggleTimer = () => {
    const { toggleTimer } = props;
    toggleTimer(id);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();
    changeTodoTask(id, labelNew);
  };

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
              onClick={onToggleTimer}
              style={stopped ? { display: 'inline' } : { display: 'none' }}
            />
            <button
              className="icon-pause-btn"
              onClick={onToggleTimer}
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
    <form onSubmit={onSubmitEdit}>
      <input className="edit" onChange={onLabelEditChange} value={labelNew} />
    </form>
  );
}
