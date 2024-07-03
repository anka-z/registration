import Navbar from "@/components/Navbar";
import EventList from "@/components/EventList";
import Footer from "@/components/Footer";

export default function EventsPage() {
  return (
    <div className="container mt-4">
      <Navbar />
      <EventList />
      <Footer />
    </div>
  );
}
