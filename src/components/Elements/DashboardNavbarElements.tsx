import React, { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app from '@/lib/firebase';

export default function DashboardNavbarElements() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const [user, setUser] = useState<User | null>(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState<string | null>(null); // Menambahkan state untuk URL foto profil.
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);

        const userProfilePhoto = authUser.photoURL;

        if (userProfilePhoto) {
          setProfilePhotoURL(userProfilePhoto);
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className={`sm:flex ${isMobileMenuOpen ? 'hidden' : 'sm:flex'}`}> {/* Add conditional class for mobile menu */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/team"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Team
                  </Link>
                  <Link
                    href="/projects"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/calendar"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Calendar
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
              {user ? (
                <h1 className='text-white font-medium' style={{ paddingLeft: '10px' }}>{user.displayName}</h1>
              ) : (
                <p className='text-white font-medium'>Wait!!..</p>
              )}              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    {profilePhotoURL ? (
                      <img src={profilePhotoURL} alt="Profile" className="h-8 w-8 rounded-full focus:outline-none"
                      />
                    ) : (
                      <img src="logo.png" alt="Default Profile" className="h-8 w-8 rounded-full focus:outline-none"
                      />
                    )}
                  </button>
                </div>
                <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDropdownOpen ? 'block' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                  <Link href="/profile">
                    <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0" onClick={toggleDropdown}>
                      Your Profile
                    </p>
                  </Link>
                  <Link href="/settings">
                    <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1" onClick={toggleDropdown}>
                      Settings
                    </p>
                  </Link>
                  <Link href="/logout">
                    <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2" onClick={toggleDropdown}>
                      Log Out
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">
              Dashboard
            </Link>
            <Link href="/team" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Team
            </Link>
            <Link href="/projects" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Projects
            </Link>
            <Link href="/calendar" className="text-gray-300 hover-bg-gray-700 hover-text-white block rounded-md px-3 py-2 text-base font-medium">
              Calendar
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
