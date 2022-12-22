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
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label } = this.state;
    const { onAddedItem } = this.props;
    e.preventDefault();
    onAddedItem(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={label} />
      </form>
    );
  }
}
