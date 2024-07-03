export interface Event {
    id: number;
    title: string;
    visitorLimit: number;
    currentRegistrations: number;
  }
  
  export interface Registration {
    id: number;
    name: string;
    surname: string;
    email: string;
    event_id: number;
  }
  
  export interface EventWithRegistrations {
    eventId: number;
    title: string;
    registrations: Registration[];
    visitorLimit: number;
  }
  