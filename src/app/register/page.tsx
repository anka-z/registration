import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="container mt-4">
      <Navbar />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
