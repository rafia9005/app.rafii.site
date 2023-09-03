import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app from '@/lib/firebase';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState<string | null>(null); // Menambahkan state untuk URL foto profil.
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);

        // Mendapatkan URL foto profil dari pengguna (jika ada).
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

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>test</h1>
    </>
  );
}
