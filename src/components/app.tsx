import Navbar from "@/components/Navbar";
import "@/styles/styles.css";

export default function App() {

  return (
    <div className="appBackground">
      <Navbar />
      <header>
        <div className="container px-4 px-lg-5 h-100">
          <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end">
              <h1 className="display-3 font-weight-bold m-5 text-white">Małopolska Noc Naukowców</h1>
              <hr className="divider" />
            </div>
            <div className="col-lg-8 align-self-baseline text-white">
              <h3 className="m-3 mb-3">Odwiedź nas 10 września 2024!</h3>
              <p className="lead">W programie m. in. pokazy doświadczeń fizycznych, pokazy filmów popularnonaukowych oraz zwiedzanie pracowni i laboratoriów.</p>
              <p className="lead mb-5">Zapraszamy do rejestracji na nasze wydarzenia!</p>
              <a className="btn btn-primary btn-xl" href="events/">Dowiedz się więcej</a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
