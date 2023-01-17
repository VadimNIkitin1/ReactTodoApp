import PropTypes from 'prop-types';
import './NewTaskForm.css';
import { useState } from 'react';

export default function NewTaskForm(props) {
  const { onAddedItem } = props;
  NewTaskForm.defaultProps = {
    onAddedItem: () => {},
  };

  NewTaskForm.propTypes = {
    onAddedItem: PropTypes.func,
  };

  const [label, setLabel] = useState('');
  const [labelMin, setLabelMin] = useState('');
  const [labelSec, setLabelSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onLabelMinChange = (e) => {
    setLabelMin(e.target.value);
  };

  const onLabelSecChange = (e) => {
    setLabelSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddedItem(label, labelMin, labelSec);
    setLabel('');
    setLabelMin('');
    setLabelSec('');
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        name="task"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={label}
      />
      <input
        name="min"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onLabelMinChange}
        value={labelMin}
      />
      <input
        name="sec"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onLabelSecChange}
        value={labelSec}
      />
      <button style={{ display: 'none' }} type="submit">
        Submit
      </button>
    </form>
  );
}
