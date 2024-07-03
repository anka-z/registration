import Link from 'next/link';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <a className="navbar-brand" href="/">MNN</a>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" href="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/events">Wydarzenia</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/register">Rejestracja</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" href="/admin">Admin</Link>
          </li>
      </ul>
    </div>
    </div>
  </nav>
);

export default Navbar;
