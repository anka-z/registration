'use client';

import { useEffect, useState } from 'react';
import { fetchRegistrations, deleteRegistration, updateRegistration, fetchEvents } from '@/server-actions/queries';
import Navbar from '@/components/Navbar';

interface Registration {
  id: number;
  name: string;
  surname: string;
  email: string;
  event_id: number;
}

interface EventWithRegistrations {
  eventId: number;
  title: string;
  registrations: Registration[];
}

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState<EventWithRegistrations[]>([]);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editForm, setEditForm] = useState<Partial<Registration>>({});
  const [events, setEvents] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    async function loadRegistrations() {
      const data: EventWithRegistrations[] = await fetchRegistrations();
      setRegistrations(data);
    }
    loadRegistrations();

    async function loadEvents() {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
    }
    loadEvents();
  }, []);

  const handleDelete = async (registrationId: number) => {
    await deleteRegistration(registrationId);
    setRegistrations(registrations.map(event => ({
      ...event,
      registrations: event.registrations.filter(r => r.id !== registrationId)
    })));
  };

  const handleUpdate = async (registrationId: number, updatedData: Partial<Registration>) => {
    await updateRegistration(registrationId, updatedData);

    setRegistrations((prevRegistrations) => {
      let updatedRegistrations = prevRegistrations.map(event => ({
        ...event,
        registrations: event.registrations.filter(r => r.id !== registrationId)
      }));

      const eventIndex = updatedRegistrations.findIndex(event => event.eventId === updatedData.event_id);
      if (eventIndex !== -1) {
        updatedRegistrations[eventIndex].registrations.push({ id: registrationId, ...updatedData } as Registration);
      } else {
        const newEvent = events.find(e => e.id === updatedData.event_id);
        if (newEvent) {
          updatedRegistrations.push({
            eventId: newEvent.id,
            title: newEvent.title,
            registrations: [{ id: registrationId, ...updatedData } as Registration]
          });
        }
      }

      return updatedRegistrations;
    });
  };

  const handleEditClick = (registration: Registration) => {
    setEditForm(registration);
    setEditMode({ ...editMode, [registration.id]: true });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveClick = async (registrationId: number) => {
    try {
      await handleUpdate(registrationId, editForm);
      setEditMode({ ...editMode, [registrationId]: false });
    } catch (error) {
      console.error("Błąd podczas aktualizacji rejestracji:", error);
    }
  };

  const handleCancelClick = (registrationId: number) => {
    setEditMode({ ...editMode, [registrationId]: false });
  };

  return (
    <div className="container m-4">
      <Navbar />
      <h2>Zarządzaj rejestracją</h2>
      {registrations.map(event => (
        <div key={event.eventId}>
          <h3>{event.title}</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Email</th>
                <th>Wydarzenie</th>
                <th>Zarządzaj</th>
              </tr>
            </thead>
            <tbody>
              {event.registrations.map(registration => (
                <tr key={registration.id}>
                  {editMode[registration.id] ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name || ''}
                          onChange={handleFormChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="surname"
                          value={editForm.surname || ''}
                          onChange={handleFormChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editForm.email || ''}
                          onChange={handleFormChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <select
                          name="event_id"
                          value={editForm.event_id || ''}
                          onChange={handleFormChange}
                          className="form-control"
                        >
                          {events.map(event => (
                            <option key={event.id} value={event.id}>
                              {event.title}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleSaveClick(registration.id)}
                        >
                          Zapisz
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleCancelClick(registration.id)}
                        >
                          Anuluj
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{registration.name}</td>
                      <td>{registration.surname}</td>
                      <td>{registration.email}</td>
                      <td>{event.title}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEditClick(registration)}
                        >
                          Modyfikuj
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(registration.id)}
                        >
                          Usuń
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
