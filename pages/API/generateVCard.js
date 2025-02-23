import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { user } = req.query;
  
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return res.status(404).json({ error: "User nicht gefunden" });
  }
  
  const userData = docSnap.data();
  
  const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${userData.name}
ORG:${userData.company}
TEL:${userData.phone}
EMAIL:${userData.email}
END:VCARD
  `.trim();
  
  res.setHeader("Content-Type", "text/vcard");
  res.setHeader("Content-Disposition", `attachment; filename=${user}.vcf`);
  res.send(vCard);
}
