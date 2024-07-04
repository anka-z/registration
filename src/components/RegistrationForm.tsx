'use client';

import { useEffect, useState } from 'react';
import { fetchEvents, registerForEvent, Event, RegistrationData } from '@/server-actions/queries';

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
    const selectedEvent = events.find(event => event.id === parseInt(form.eventId, 10));
    console.log(selectedEvent);
    if (selectedEvent && selectedEvent.currentregistrations >= selectedEvent.visitor_limit) {
      alert('Osiągnięto limit odwiedzających. Rejestracja nie może być przetworzona.');
      return;
    }
    await registerForEvent(form as RegistrationData);
    setMessage('Zarejestrowano pomyślnie!');
    setSubmitted(true);
  };

  if (submitted) {
    return <><div className="alert alert-success my-5 col-4" role="alert">{message}</div>
    <a href={`/register/`} className="alert alert-primary link-underline link-underline-opacity-0 my-5 col-4" role="alert">Zarejestruj ponownie</a></>;
  }

  return (
    <div className="container-fluid">
      <h2 className="my-5">Formularz rejestracji</h2>
      <form className="col-6" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Imię</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Imię"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="surname" className="form-label">Nazwisko</label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            placeholder="Nazwisko"
            value={form.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="input-group">
          <div className="input-group-text">@</div>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Adres email"
            value={form.email}
            onChange={handleChange}
            required
          />
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="eventId" className="form-label">Wydarzenie</label>
          <select
            className="form-control form-select"
            id="eventId"
            name="eventId"
            value={form.eventId}
            onChange={handleChange}
            required
          >
            <option value="">Wybierz wydarzenie</option>
            {events.map(event => (
              <option 
                key={event.id} 
                value={event.id} 
                disabled={event.currentregistrations >= event.visitor_limit}
              >
                {event.title} {event.currentregistrations >= event.visitor_limit ? '(Brak miejsc)' : ''}
              </option>
            ))}
          </select>
          <div id="emailHelp" className="form-text">Liczba miejsc jest ograniczona</div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Zarejestruj</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;