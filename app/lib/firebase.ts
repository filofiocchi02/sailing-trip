import { getApps, initializeApp } from "firebase/app";
import { getAuth, type User } from "firebase/auth";
import { doc, getFirestore, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const env = import.meta.env as Record<string, string | undefined>;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

export const firebaseConfigured = Object.values(firebaseConfig).every(Boolean);
export const firebaseAdminEmail = env.VITE_FIREBASE_ADMIN_EMAIL;
export const firebaseApp = firebaseConfigured ? (getApps()[0] ?? initializeApp(firebaseConfig)) : null;
export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const firebaseDb = firebaseApp ? getFirestore(firebaseApp) : null;

export type WaitlistProfile = {
  name: string;
  email: string;
  phone: string;
  role: string;
  note: string;
  status: "waitlisted" | "accepted";
};

export async function saveWaitlistProfile(user: User, profile: Omit<WaitlistProfile, "status">) {
  if (!firebaseDb) throw new Error("Firebase is not configured.");
  await setDoc(doc(firebaseDb, "waitlistApplications", user.uid), { ...profile, status: "waitlisted", createdAt: serverTimestamp() }, { merge: true });
}

export async function getWaitlistProfile(user: User) {
  if (!firebaseDb) return null;
  const snapshot = await getDoc(doc(firebaseDb, "waitlistApplications", user.uid));
  return snapshot.exists() ? snapshot.data() as WaitlistProfile : null;
}
