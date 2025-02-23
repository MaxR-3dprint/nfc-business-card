import { useRouter } from "next/router";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function UserPage() {
  const router = useRouter();
  const { user } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      };
      fetchUser();
    }
  }, [user]);

  if (!userData) return <p>Lädt...</p>;

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>Firma: {userData.company}</p>
      <p>Telefon: {userData.phone}</p>
      <a href={`/api/generateVCard?user=${user}`}>📥 VCF Herunterladen</a>
    </div>
  );
}
