import React from 'react';
import { Link } from "react-router-dom";

const AdminNav = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                    Dashboard
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/book" className="nav-link">
                    Book
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/books" className="nav-link">
                    Books
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/reservation" className="nav-link">
                    Reservation
                </Link>
            </li>

        </ul>
    </nav>
)

export default AdminNav;
