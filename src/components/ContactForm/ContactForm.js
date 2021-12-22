import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const INIITAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = INIITAL_STATE;

  handleInputForm = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAdd } = this.props;

    const isValidatedForm = this.validateForm();

    if (!isValidatedForm) return;

    onAdd({ id: uuid(), name, number });

    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckContact } = this.props;
    if (!name || !number) {
      alert('Some filed is empty');
      return false;
    }
    return onCheckContact(name);
  };

  resetForm = () => this.setState(INIITAL_STATE);

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleFormSubmit}>
        <label>
          <input
            className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            placeholder="Enter name"
            value={name}
            onChange={this.handleInputForm}
          />
        </label>
        <label>
          <input
            className={s.input}
            type="tell"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            placeholder="Enter phone number"
            value={number}
            onChange={this.handleInputForm}
          />
        </label>

        <button className={s.button} type="submit">
          {' '}
          Add Contact{' '}
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onCheckContact: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ContactForm;