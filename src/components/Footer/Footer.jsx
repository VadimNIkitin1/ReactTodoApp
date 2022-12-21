import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

export default class Footer extends Component {
  static defaultProps = {
    completedCount: '',
    currentFilter: '',
    onClearCompleted: () => {},
    onFilterChange: () => {},
  };
  static propTypes = {
    completedCount: PropTypes.number,
    currentFilter: PropTypes.string,
    onClearCompleted: PropTypes.func,
    onFilterChange: PropTypes.func,
  };
  render() {
    const { completedCount, onClearCompleted, onFilterChange, currentFilter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{completedCount} Item Left</span>
        <TasksFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
