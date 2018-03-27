import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../index.css"
// function CustomTextInput(props) {
//   return (
//     <input
//       value={props.value}
//       onChange={props.onChange}
//       name={props.name}
//       className={props.className}
//       size={props.size}
//       placeholder={props.placeholder}
//       type={props.type}
//       style={props.style}
//       pattern={props.pattern}
//       title={props.title}
//     />
//   );
// }
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      budgetedAmount: 0,
      isActive: false
    }
  }

  componentDidMount() { }
  render() {
    return (
      <form
        onSubmit={e => {
          //e.preventDefault();
          /*
          console.log(
            `name:${this.name.value}  age:${this.age.value} email:${this.email
              .value}`
          );
          */

          this.props.addAccount({
            name: this.state.name.value,
            description: this.state.description.value,
            budgetedAmount: this.state.budgetedAmount.value,
            isActive: this.state.isActive.value
          });
          this.setState({
            name: '',
            description: '',
            budgetedAmount: 0,
            isActive: false
          })
        }}
      >
        <div style={{ height: '160px', display: 'block', marginTop: '80px' }}>
          <div>
            <label htmlFor='name'>name</label>
            <input
              onChange={name => this.setState({ name })}
              className="inputText"
              label="name"
              type="text"
              size="30"
              id='name'
            />
          </div>
          <div>
            <label htmlFor="description">description</label>
            <input
              onChange={description => this.setState({ description })}
              className="inputText"
              type="text"
              label="description"
              id="description"
              size="20"
            />
          </div>
          <div>
            <label htmlFor="budgetedAcount">Budgeted Amount</label>
            <input
              onChange={budgetedAmount => this.setState({ budgetedAmount })}
              className="inputText"
              type="float"
              pattern="\d*(\.\d\d)?"
              title="if decimal must be followed by 2 digits"
              label="budgeted amount"
              id='budgetedAmount'
              size="15"
            />
          </div>
          <div>
            <label htmlFor="isActive">Is Active</label>
            <input
              onChange={isActive => this.setState({ isActive })}
              className="inputText"
              type="boolean"
              label="is active"
              size="5"
            />
          </div>
        </div>
        <button type="submit">Add Account</button>
        <button>
          <Link to="/">Back to List</Link>
        </button>
      </form>
    );
  }
}
