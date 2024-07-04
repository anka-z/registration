'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    // Load Bootstrap JavaScript dynamically on the client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" passHref className="navbar-brand">
          MNN
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
          className={`justify-content-end collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className={clsx(
                'nav-link',
                {
                  'nav-link active': pathname === '/',
                },
              )} href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={clsx(
                'nav-link',
                {
                  'nav-link active': pathname === '/events',
                },
              )} href="/events">
                Wydarzenia
              </Link>
            </li>
            <li className="nav-item">
              <Link className={clsx(
                'nav-link',
                {
                  'nav-link active': pathname === '/register',
                },
              )} href="/register">
                Rejestracja
              </Link>
            </li>
            <li className="nav-item">
              <Link className={clsx(
                'nav-link',
                {
                  'nav-link active': pathname === '/admin',
                },
              )} href="/admin">
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
