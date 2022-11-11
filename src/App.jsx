import "./App.css";
import { nanoid } from "nanoid";
import React, { Component } from "react";
import { AppContainer, H1, H2 } from "App.styled";

import Phonebook from "components/Phonebook/Phonebook";
import SearchInput from "components/SearchInput/SearchInput";
import ContactList from "components/ContactList/ContactList";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  // { id: "id-1", name: "Rosie Simpson", phoneNumber: "459-12-56" },
  // { id: "id-2", name: "Hermione Kline", phoneNumber: "443-89-12" },
  // { id: "id-3", name: "Eden Clements", phoneNumber: "645-17-79" },
  // { id: "id-4", name: "Annie Copeland", phoneNumber: "227-91-26" },
  formSubmitHandler = ({ name, phoneNumber }) => {
    const contact = {
      id: nanoid(),
      name,
      phoneNumber,
    };

    const findContact = this.state.contacts.find((contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );

    findContact
      ? alert(`${name} is already in contact`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  changeFilterInput = (event) => {
    this.setState({ filter: event.target.value });
  };

  findContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <AppContainer>
        <H1>Phonebook</H1>
        <Phonebook onSubmit={this.formSubmitHandler} />

        <H2>Contacts</H2>
        <SearchInput
          filter={this.state.filter}
          changeFilterInput={this.changeFilterInput}
        />

        <ContactList
          contacts={this.findContacts()}
          deleteContact={this.deleteContact}
        />
      </AppContainer>
    );
  }
}
