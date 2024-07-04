'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    // Load Bootstrap JavaScript dynamically on the client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" passHref>
          <a className="navbar-brand">MNN</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/events">
                Wydarzenia
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/register">
                Rejestracja
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
