'use client';

import { useEffect, useState } from 'react';
import { fetchEvents } from '@/server-actions/queries';

interface Event {
  id: number;
  title: string;
  start_time: string;
  description: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents() {
      const data: Event[] = await fetchEvents();
      setEvents(data);
    }
    loadEvents();
  }, []);

  return (
    <div>
      <h2>Wydarzenia</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>Data: {event.start_time}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;




