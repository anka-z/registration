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
  const [editForm, setEditForm] = useState<{ [key: number]: Partial<Registration> }>({});
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
    setRegistrations(prevRegistrations =>
      prevRegistrations.map(event => ({
        ...event,
        registrations: event.registrations.filter(r => r.id !== registrationId)
      }))
    );
  };

  const handleUpdate = async (registrationId: number, updatedData: Partial<Registration>) => {
    await updateRegistration(registrationId, updatedData);

    setRegistrations(prevRegistrations => {
      const updatedRegistrations = prevRegistrations.map(event => ({
        ...event,
        registrations: event.registrations.map(r =>
          r.id === registrationId ? { ...r, ...updatedData } : r
        )
      }));
      return updatedRegistrations;
    });
  };

  const handleEditClick = (registration: Registration) => {
    setEditForm({
      ...editForm,
      [registration.id]: {
        name: registration.name,
        surname: registration.surname,
        email: registration.email,
        event_id: registration.event_id
      }
    });
    setEditMode({ ...editMode, [registration.id]: true });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    registrationId: number
  ) => {
    const { name, value } = e.target;
    setEditForm(prevEditForm => ({
      ...prevEditForm,
      [registrationId]: {
        ...prevEditForm[registrationId],
        [name]: value
      }
    }));
  };

  const handleSaveClick = async (registrationId: number) => {
    try {
      const updatedData = editForm[registrationId];
      if (updatedData) {
        await handleUpdate(registrationId, updatedData);
        setEditMode({ ...editMode, [registrationId]: false });
      }
    } catch (error) {
      console.error("Error updating registration:", error);
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
                          value={editForm[registration.id]?.name || ''}
                          onChange={(e) => handleFormChange(e, registration.id)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="surname"
                          value={editForm[registration.id]?.surname || ''}
                          onChange={(e) => handleFormChange(e, registration.id)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editForm[registration.id]?.email || ''}
                          onChange={(e) => handleFormChange(e, registration.id)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <select
                          name="event_id"
                          value={editForm[registration.id]?.event_id || ''}
                          onChange={(e) => handleFormChange(e, registration.id)}
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
