import { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onAddedItem: () => {},
  };

  static propTypes = {
    onAddedItem: PropTypes.func,
  };

  state = {
    label: '',
    labelMin: '',
    labelSec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onLabelMinChange = (e) => {
    this.setState({
      labelMin: e.target.value,
    });
  };

  onLabelSecChange = (e) => {
    this.setState({
      labelSec: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label, labelMin, labelSec } = this.state;
    const { onAddedItem } = this.props;
    e.preventDefault();
    onAddedItem(label, labelMin, labelSec);
    this.setState({
      label: '',
      labelMin: '',
      labelSec: '',
    });
  };

  render() {
    const { label, labelMin, labelSec } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          name="task"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          name="min"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onLabelMinChange}
          value={labelMin}
        />
        <input
          name="sec"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onLabelSecChange}
          value={labelSec}
        />
        <button style={{ display: 'none' }} type="submit">
          Submit
        </button>
      </form>
    );
  }
}
