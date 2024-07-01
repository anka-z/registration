import ListTables from "@/components/list-tables";
import Navbar from "@/components/Navbar";

export default function App() {
  return (
    <div className="container m-4">
      <Navbar />
      <h1>Test</h1>
      <h2>What tables do you have in your database?</h2>
      <ListTables />
    </div>
  );
}
