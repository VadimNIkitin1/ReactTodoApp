import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

export default function TaskList(props) {
  const { todos, onEdit, onDeleted, onToggleCompleted, changeTodoTask, toggleTimer } = props;

  TaskList.defaultProps = {
    onEdit: () => {},
    onDeleted: () => {},
    onToggleCompleted: () => {},
    changeTodoTask: () => {},
  };

  TaskList.propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        createdTime: PropTypes.instanceOf(Date).isRequired,
        edit: PropTypes.bool.isRequired,
      })
    ).isRequired,
    onEdit: PropTypes.func,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    changeTodoTask: PropTypes.func,
  };

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
        toggleTimer={toggleTimer}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}
