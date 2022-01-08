import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';
import Container from './components/Container';
import Section from './components/Section';



const initialContacts = [
{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ??
      [...initialContacts,]
    );
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  
  const [filter, setFilter] = useState('');


 const handelAddContact = newContact => {
    setContacts([...contacts, newContact]);
  };

  
  const isExistContact = name => {
    return contacts.some(contact => contact.name === name);
  };


    const handleDeleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const handleFilterChange = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

     return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm
          handelAddContact={handelAddContact}
          isExistContact={isExistContact}
        />
      </Section>
      <Section title="Contacts">
        {contacts.length > 1 && (
          <Filter filter={filter} onChange={handleFilterChange} />
        )}
        {contacts.length > 0 ? (
          <ContactsList
            contacts={visibleContacts}
            onRemove={handleDeleteContact}
          />
        ) : (
          <p>Your phonebook is empty. Please add contact</p>
        )}
         <ToastContainer/>
      </Section>
    </Container>
  );
}


export default App;

