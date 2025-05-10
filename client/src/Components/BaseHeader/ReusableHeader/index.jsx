import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Brain, Menu, X, LogOut, Settings } from 'lucide-react';
import { BiLoaderAlt } from 'react-icons/bi';

const ReusableHeader = ({
    menuItems = [],
    showIcons = false,
    onLogout,
    isLoggingOut,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-md z-50">
            {/* Top Nav Row */}
            <div className="flex justify-between items-center px-6 md:px-12 py-4 relative">
                <NavLink to="/" className="flex items-center space-x-2">
                    <Brain className="w-10 h-10 text-c-zinc" />
                    <h1 className="text-4xl font-bold text-c-zinc hidden md:block">ADHD Tracker</h1>
                </NavLink>

                {/* Desktop Menu Items */}
                <div className="hidden md:flex items-center space-x-4">
                    {menuItems?.map(({ label, to, onClick, icon, type }, idx) => (
                        <NavLink
                            key={idx}
                            to={to}
                            onClick={onClick}
                            className={`btn !px-6 ${type === "primary" ? "btn-primary" : type === "outline" ? "btn-outline" : ""}`}
                        >
                            {icon && <span className="mr-2">{icon}</span>}
                            {label}
                        </NavLink>
                    ))}
                    {showIcons && (
                        <div
                            className='flex flex-col md:flex-row space-x-8 px-12'
                        >
                            <span>

                                {
                                    isLoggingOut ? (
                                        <>
                                            <BiLoaderAlt
                                                className='text-c-zinc w-6 h-6 animate-spin'
                                            />
                                        </>
                                    ) : (
                                        <LogOut
                                            onClick={onLogout}
                                            className="cursor-pointer text-c-zinc w-6 h-6"
                                        />

                                    )
                                }

                            </span>


                        </div>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                        {menuOpen ? (
                            <X className="w-10 h-10 text-c-zinc" />
                        ) : (
                            <Menu className="w-10 h-10 text-c-zinc" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center space-y-4 px-6 pt-6 pb-12">
                    {menuItems?.map(({ label, to, onClick, icon, type }, idx) => (
                        <NavLink
                            key={idx}
                            to={to}
                            onClick={() => {
                                setMenuOpen(false);
                                if (onClick) onClick();
                            }}
                            className={`btn w-full text-center ${type === "primary" ? "btn-primary" : type === "outline" ? "btn-outline" : ""}`}
                        >
                            {icon && <span className="mr-2">{icon}</span>}
                            {label}
                        </NavLink>
                    ))}
                    {showIcons && (
                        <div className="flex flex-col space-y-4 w-full">
                            <button
                                className="btn btn-outline w-full flex items-center justify-center"
                                onClick={onLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? (
                                    <BiLoaderAlt className="w-5 h-5 animate-spin mr-2" />
                                ) : (
                                    <LogOut className="w-5 h-5 mr-2" />
                                )}
                                Logout
                            </button>
                        </div>
                    )}

                </div>
            )}
        </header>
    );
};

export default ReusableHeader;
