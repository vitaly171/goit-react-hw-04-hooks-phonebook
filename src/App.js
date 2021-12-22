import { Component } from 'react';

import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';
import Container from './components/Container';
import Section from './components/Section';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contacts);

    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    } 
  }

  componentDidUpdate(prevProps, prevState) {

    const nextContact = this.state.contacts;
    const prevContact = prevState.contacts;

    if (nextContact !== prevContact) {
      localStorage.setItem('contacts', JSON.stringify(nextContact));
    }
  }

  handelAddContact = newContact =>
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

  handelCheckContact = name => {
    const { contacts } = this.state;

    const existContact = contacts.some(contact => contact.name === name);
    existContact && alert(`${name} is already in contacts`);
    
    return !existContact;
  };

  handleDeleteContact = contactId =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));

  handleFilterChange = filter => this.setState({ filter });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm
            onAdd={this.handelAddContact}
            onCheckContact={this.handelCheckContact}
          />
        </Section>
        <Section title="Contacts">
          {contacts.length > 1 && (
            <Filter filter={filter} onChange={this.handleFilterChange} />
          )}
          {contacts.length > 0 ? (
            <ContactsList
              contacts={visibleContacts}
              onRemove={this.handleDeleteContact}
            />
          ) : (
            <p>Your phonebook is empty. Please add contact</p>
          )}
        </Section>
      </Container>
    );
  }
}

export default App;
