import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RegistrationForm from "@/components/RegistrationForm";
import "@/styles/styles.css";

export default function RegisterPage() {
  return (
    <><Navbar />
      <div className="container mt-4">
      <RegistrationForm />
      <Footer />
    </div></>
  );
}
