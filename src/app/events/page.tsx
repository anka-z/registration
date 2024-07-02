import Navbar from "@/components/Navbar";
import EventList from "@/components/EventList";

export default function EventsPage() {
  return (
    <div className="container m-4">
      <Navbar />
      <EventList />
    </div>
  );
}
