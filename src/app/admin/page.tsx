"use client";
import { useEffect, useState } from "react";
import {
  fetchRegistrations,
  deleteRegistration,
  updateRegistration,
  fetchEvents,
  Event,
  Registration,
} from "@/server-actions/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define the username and password
const username = "admin";
const password = "admin";

interface EventWithRegistrations {
  eventId: number;
  title: string;
  visitorLimit: number;
  currentRegistrations: number;
  registrations: Registration[];
}

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState<EventWithRegistrations[]>(
    []
  );
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editForm, setEditForm] = useState<{
    [key: number]: Partial<Registration>;
  }>({});
  const [events, setEvents] = useState<Event[]>([]);
  const [authenticated, setAuthenticated] = useState(false); // Track authentication state

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
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((event) => ({
        ...event,
        registrations: event.registrations.filter(
          (r) => r.id !== registrationId
        ),
      }))
    );
  };

  const handleUpdate = async (
    registrationId: number,
    updatedData: Partial<Registration>
  ) => {
    try {
      await updateRegistration(registrationId, updatedData);

      setRegistrations((prevRegistrations) => {
        let updatedRegistrations = prevRegistrations.map((event) => ({
          ...event,
          registrations: event.registrations.map((r) =>
            r.id === registrationId ? { ...r, ...updatedData } : r
          ),
        }));

        return updatedRegistrations;
      });

      setEditMode({ ...editMode, [registrationId]: false });
    } catch (error) {
      console.error("Błąd aktualizacji rejestracji:", error);
    }
  };

  const handleEditClick = (registration: Registration) => {
    setEditForm({
      ...editForm,
      [registration.id]: {
        name: registration.name,
        surname: registration.surname,
        email: registration.email,
        event_id: registration.event_id,
      },
    });
    setEditMode({ ...editMode, [registration.id]: true });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    registrationId: number
  ) => {
    const { name, value } = e.target;
    setEditForm((prevEditForm) => ({
      ...prevEditForm,
      [registrationId]: {
        ...prevEditForm[registrationId],
        [name]: value,
      },
    }));
  };

  const handleCancelClick = (registrationId: number) => {
    setEditMode({ ...editMode, [registrationId]: false });
  };

  const handleAuthentication = () => {
    const enteredUsername = prompt("Nazwa użytkownika:");
    const enteredPassword = prompt("Podaj hasło:");

    if (enteredUsername === username && enteredPassword === password) {
      setAuthenticated(true);
    } else {
      alert("Niepoprawny login lub hasło");
    }
  };

  // Render authentication form if not authenticated
  if (!authenticated) {
    return (
      <div className="container mt-4">
        <h2 className="my-5">Wymagana autoryzacja</h2>
        <button className="btn btn-success mr-2" onClick={handleAuthentication}>Zaloguj</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Navbar />
      <h2 className="my-5">Zarządzaj rejestracją</h2>
      {registrations.map((event) => (
        <div key={event.eventId} className="my-4">
          <h3>{event.title}</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Email</th>
                <th>Zarządzaj</th>
              </tr>
            </thead>
            <tbody>
              {event.registrations.map((registration) => (
                <tr key={registration.id}>
                  {editMode[registration.id] ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={editForm[registration.id]?.name || ""}
                          onChange={(e) => handleFormChange(e, registration.id)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="surname"
                          value={editForm[registration.id]?.surname || ""}
                          onChange={(e) => handleFormChange(e, registration.id)}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={editForm[registration.id]?.email || ""}
                          onChange={(e) => handleFormChange(e, registration.id)}
                        />
                      </td>
                      <td>
                        <div className="d-grid gap-2 d-md-flex">
                          <button
                            className="btn btn-success mr-2"
                            onClick={() =>
                              handleUpdate(
                                registration.id,
                                editForm[registration.id] || {}
                              )
                            }
                          >
                            Zapisz
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleCancelClick(registration.id)}
                          >
                            Anuluj
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{registration.name}</td>
                      <td>{registration.surname}</td>
                      <td>{registration.email}</td>
                      <td>
                        <div className="d-grid gap-2 d-md-flex">
                          <button
                            className="btn btn-primary mr-2"
                            onClick={() => handleEditClick(registration)}
                          >
                            Edytuj
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(registration.id)}
                          >
                            Usuń
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default AdminPanel;