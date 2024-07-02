'use client';

import { useEffect, useState } from 'react';
import { fetchEvents, registerForEvent } from '@/server-actions/queries';

// Define the types
interface Event {
  id: number;
  title: string;
}

interface FormState {
  name: string;
  surname: string;
  email: string;
  eventId: string;
}

const RegistrationForm = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<FormState>({
    name: '',
    surname: '',
    email: '',
    eventId: ''
  });
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      const data: Event[] = await fetchEvents();
      setEvents(data);
    }
    loadEvents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerForEvent(form);
    setMessage('Registration successful!');
    setSubmitted(true);
  };

  if (submitted) {
    return <p>{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Imię</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="surname">Nazwisko</label>
        <input
          type="text"
          className="form-control"
          id="surname"
          name="surname"
          value={form.surname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="eventId">Wydarzenie</label>
        <select
          className="form-control"
          id="eventId"
          name="eventId"
          value={form.eventId}
          onChange={handleChange}
          required
        >
          <option value="">Wybierz wydarzenie</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.title}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Zarejestruj</button>
    </form>
  );
};

export default RegistrationForm;
