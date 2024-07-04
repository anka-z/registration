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
      try {
        const data: Event[] = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    }
    loadEvents();
  }, []);

  return (
    <div>
      <h2 className="my-5">Wydarzenia</h2>
      <div className="row">
        {events.map(event => (
          <div key={event.id} className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <h6>{event.start_time}</h6>
                <p className="card-text">{event.description}</p>
                <a href={`/register/`} className="btn btn-primary">
                  Zarejestruj
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;





