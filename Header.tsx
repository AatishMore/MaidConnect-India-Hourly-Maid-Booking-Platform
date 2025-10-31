
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import NotificationBell from './NotificationBell';

const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `pb-1 transition ${isActive ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`;

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary">
                    MaidConnect
                </Link>
                <div className="flex items-center space-x-4 md:space-x-6">
                    {isAuthenticated ? (
                        <>
                            {user?.role === Role.USER && (
                                <div className="hidden md:flex items-center space-x-6">
                                    <NavLink to="/dashboard" className={getNavLinkClass}>Dashboard</NavLink>
                                    <NavLink to="/my-bookings" className={getNavLinkClass}>My Bookings</NavLink>
                                    <NavLink to="/profile/edit" className={getNavLinkClass}>My Profile</NavLink>
                                </div>
                            )}
                            {user?.role === Role.MAID && (
                                <div className="hidden md:flex items-center space-x-6">
                                    <NavLink to="/maid-dashboard" className={getNavLinkClass}>Dashboard</NavLink>
                                    <NavLink to="/maid-profile/edit" className={getNavLinkClass}>Edit Profile</NavLink>
                                </div>
                            )}
                            <NotificationBell />
                            <div className="flex items-center space-x-3">
                                <img src={user?.profileImage} alt={user?.name} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
                                <span className="text-gray-700 hidden sm:inline">Hi, {user?.name.split(' ')[0]}</span>
                            </div>
                            <button onClick={logout} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition">
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition">
                            Login / Register
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
