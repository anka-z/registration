"use server";
import { sql } from "@vercel/postgres";

export interface Registration {
  id: number;
  name: string;
  surname: string;
  email: string;
  event_id: number;
}

export interface Event {
  id: number;
  title: string;
  start_time: string;
  description: string;
  visitor_limit: number;
  currentregistrations: number; 
}

export interface EventWithRegistrations {
  eventId: number;
  title: string;
  visitorLimit: number;
  currentregistrations: number; 
  registrations: Registration[];
}

export interface RegistrationData {
  name: string;
  surname: string;
  email: string;
  eventId: string;
}

export async function fetchEvents(): Promise<Event[]> {
  const res = await sql`
    SELECT 
      e.id, 
      e.title, 
      to_char(e.start_time, 'YYYY-MM-DD, HH24:MI') as start_time, 
      e.description, 
      e.visitor_limit, 
      COALESCE(r.currentregistrations, 0) as currentregistrations
    FROM events e
    LEFT JOIN (
      SELECT event_id, COUNT(*) as currentregistrations
      FROM registrations
      GROUP BY event_id
    ) r ON e.id = r.event_id
  `;
  return res.rows as Event[];
}

export async function fetchRegistrations(): Promise<EventWithRegistrations[]> {
  const res = await sql`
    SELECT 
      e.id as event_id, 
      e.title, 
      e.visitor_limit,
      COALESCE(r.currentregistrations, 0) as currentregistrations,
      reg.id, 
      reg.name, 
      reg.surname, 
      reg.email,
      reg.event_id 
    FROM events e
    LEFT JOIN registrations reg ON e.id = reg.event_id
    LEFT JOIN (
      SELECT event_id, COUNT(*) as currentregistrations
      FROM registrations
      GROUP BY event_id
    ) r ON e.id = r.event_id
  `;

  const grouped = res.rows.reduce((acc, row) => {
    const { event_id, title, visitor_limit, currentregistrations, ...registration } = row;
    if (!acc[event_id]) {
      acc[event_id] = { 
        eventId: event_id, 
        title, 
        visitorLimit: visitor_limit,
        currentregistrations: currentregistrations,
        registrations: [] 
      };
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
