import './App.css';
import React from 'react';

let textList = [];
let textItems = [];


class TextItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.state = {
      done: false
    };
  }

  handleDelete() {
    this.props.onDelete(this.props.text);
  }

  handleDone() {
    if (!this.state.done) {
      this.setState({done: true});
    }
    if (this.state.done) {
      this.setState({done: false});
    }
  }

  render() {
    let blockClassName = "block-item";
    let checkboxClassName = "checkbox-button checkbox-button-off";
    if (this.state.done) {
      blockClassName += " block-item-done";
      checkboxClassName = "checkbox-button checkbox-button-on";
    }
    return (
      <div className={blockClassName}>
        <button className={checkboxClassName} onClick={this.handleDone}></button>
        <p className="block-item-text">{this.props.text}</p>
        <button className="delete-button" onClick={this.handleDelete}></button>
      </div>
    )
  }

}

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.submitInput = this.submitInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitInput(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  handleChange(e) {
    this.props.onTextChange(e.target.value);
  }

  render() {
    return (
      <form onSubmit={this.submitInput}>
          <input className="text-input text-input-high" type="text" placeholder="Добавить дел" value={this.props.text} onChange={this.handleChange} />
          <button className="add-button add-button-high" type="submit" value=""></button>
      </form>
    )
  }
}





class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemDelete = this.itemDelete.bind(this);
    this.state = {
      text: ""
    };
  }

  handleTextChange(text) {
    this.setState({text: text});
  }

  handleSubmit() {
    if (textList.includes(this.state.text)) {
      alert("Такая запись уже есть!");
    } else if (!this.state.text) {
      alert("Введите текст!");
    } else {
      textList.push(this.state.text);
      textItems = textList.map((text) => <TextItem key={text} text={text} onDelete={this.itemDelete} />);
      this.setState({text: ""});
    }
  }

  itemDelete(text) {
    let index = textList.indexOf(text);
    textList.splice(index, 1);
    console.log(textList);
    textItems = textList.map((text) => <TextItem key={text} text={text} onDelete={this.itemDelete} />);
    this.setState({text: ""});
  }

  render() {
    return (
      <div className="main">

        <div className="high-block">
            <h2 className="block-title">Список дел</h2>
            <div className="block-input">
                <Input text={this.state.text} onTextChange={this.handleTextChange} onSubmit={this.handleSubmit} />
            </div>
            <div className="block-items-high">
              {textItems}
            </div>
        </div>

      </div>
    )
  }
}

export default ToDoList;
