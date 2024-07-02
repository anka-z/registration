'use client';

import { useEffect, useState } from 'react';
import { fetchRegistrations, deleteRegistration, updateRegistration } from '@/server-actions/queries';
import Navbar from '@/components/Navbar';

interface Registration {
    id: number;
    name: string;
    surname: string;
    email: string;
  }
  
  interface EventWithRegistrations {
    eventId: number;
    title: string;
    registrations: Registration[];
  }

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState<EventWithRegistrations[]>([]);

  useEffect(() => {
    async function loadRegistrations() {
      const data: EventWithRegistrations[] = await fetchRegistrations();
      setRegistrations(data);
    }
    loadRegistrations();
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
    const updatedRegistrations = registrations.map(event => ({
      ...event,
      registrations: event.registrations.map(r => r.id === registrationId ? { ...r, ...updatedData } : r)
    }));
    setRegistrations(updatedRegistrations);
  };

  return (
    <div className="container m-4">
      <Navbar />
      <h2>Zarządzaj rejestracją</h2>
      {registrations.map(event => (
        <div key={event.eventId}>
          <h3>{event.title}</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Email</th>
                <th>Zarządzaj</th>
              </tr>
            </thead>
            <tbody>
              {event.registrations.map(registration => (
                <tr key={registration.id}>
                  <td>{registration.name}</td>
                  <td>{registration.surname}</td>
                  <td>{registration.email}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleUpdate(registration.id, {/* updated data here */})}>Modyfikuj</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(registration.id)}>Usuń</button>
                  </td>
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
