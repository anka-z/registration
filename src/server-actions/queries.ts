"use server";
import { sql } from "@vercel/postgres";

interface Registration {
  id: number;
  name: string;
  surname: string;
  email: string;
  event_id: number;
}

interface Event {
  id: number;
  title: string;
  start_time: string;
  description: string;
  visitor_limit: number;
}

interface EventWithRegistrations {
  eventId: number;
  title: string;
  registrations: Registration[];
}

interface RegistrationData {
  name: string;
  surname: string;
  email: string;
  eventId: string;
}

export async function getData() {
  const res =
    await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  return res.rows.map((row) => row.table_name).join(", ");
}

export async function fetchRegistrations(): Promise<EventWithRegistrations[]> {
  const res = await sql`
    SELECT 
      events.id as event_id, 
      events.title, 
      registrations.id, 
      registrations.name, 
      registrations.surname, 
      registrations.email,
      registrations.event_id 
    FROM registrations 
    JOIN events ON registrations.event_id = events.id
  `;

  const grouped = res.rows.reduce((acc, row) => {
    const { event_id, title, ...registration } = row;
    if (!acc[event_id]) {
      acc[event_id] = { eventId: event_id, title, registrations: [] };
    }
    acc[event_id].registrations.push({ ...registration, event_id });
    return acc;
  }, {} as Record<number, EventWithRegistrations>);

  return Object.values(grouped);
}

export async function deleteRegistration(registrationId: number): Promise<void> {
  await sql`DELETE FROM registrations WHERE id = ${registrationId}`;
}

export async function updateRegistration(registrationId: number, updatedData: Partial<Registration>): Promise<void> {
  const { name, surname, email, event_id } = updatedData;
  await sql`
    UPDATE registrations 
    SET name = ${name}, surname = ${surname}, email = ${email}, event_id = ${event_id}
    WHERE id = ${registrationId}
  `;
}

export async function registerForEvent({ name, surname, email, eventId }: RegistrationData): Promise<void> {
  await sql`
    INSERT INTO registrations (name, surname, email, event_id)
    VALUES (${name}, ${surname}, ${email}, ${eventId})
  `;
}

export async function fetchEvents(): Promise<Event[]> {
  const res = await sql`
    SELECT 
      id, 
      title, 
      to_char(start_time, 'YYYY-MM-DD, HH24:MI') as start_time, 
      description, 
      visitor_limit 
    FROM events
  `;
  return res.rows as Event[];
}
