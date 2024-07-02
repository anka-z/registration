import ListTables from "@/components/list-tables";
import Navbar from "@/components/Navbar";

export default function App() {
  return (
    <div className="container m-4">
      <Navbar />
      <h1>Małopolska Noc Naukowców</h1>
      <p>Zapraszamy do rejestracji na nasze wydarzenia!</p>
      <ListTables />
    </div>
  );
}
