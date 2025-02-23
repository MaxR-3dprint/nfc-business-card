import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    instagram: "",
    linkedin: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        router.push("/login");
      } else {
        setUser(authUser);
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          setFormData(userDoc.data());
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    await setDoc(doc(db, "users", user.uid), formData);
    alert("Daten gespeichert!");
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="text" name="company" placeholder="Firma" value={formData.company} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} />
        <input type="email" name="email" placeholder="E-Mail" value={formData.email} onChange={handleChange} />
        <input type="text" name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} />
        <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
        <input type="text" name="instagram" placeholder="Instagram" value={formData.instagram} onChange={handleChange} />
        <input type="text" name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
        <button onClick={handleSave}>Speichern</button>
      </div>
    </div>
  );
}
