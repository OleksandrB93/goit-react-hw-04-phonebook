import { nanoid } from "nanoid";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { HiUserAdd } from "react-icons/hi";
import { NameLabel, AddContactBtn, Input,IconAdd } from "./Phonebook.styled";

export default class Phonebook extends Component {
  state = {
    name: "",
    phoneNumber: "",
    img: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
  };

  nameInputId = nanoid();
  phoneNumberInputId = nanoid();

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.resetSubmit();
  };

  resetSubmit = () => {
    this.setState({ name: "", phoneNumber: "", img: "" });
  };
  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <NameLabel htmlFor={this.nameInputId}>
            Name:
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.handleChange}
              id={this.nameInputId}
              placeholder="Please write name"
            />
          </NameLabel>
          <label htmlFor={this.phoneNumberInputId}>
            Phone number:
            <Input
              type="tel"
              name="phoneNumber"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              id={this.phoneNumberInputId}
              placeholder="Please write number"
            />
          </label>
          <AddContactBtn tupe="submit">
            <HiUserAdd fill='#601c80' />
          </AddContactBtn>
        </form>
      </div>
    );
  }
}
Phonebook.prototypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
