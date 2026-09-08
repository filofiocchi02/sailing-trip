import { getApps, initializeApp } from "firebase/app";
import { getAuth, signOut, type User } from "firebase/auth";
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

// Firebase configuration is supplied at build time. Keep the local/demo fallback active when the checked-in example config uses
// the placeholder key. A real Firebase key can be supplied later without
// changing the application code.
export const firebaseConfigured = Object.values(firebaseConfig).every(Boolean) && firebaseConfig.apiKey !== "xx";
export const firebaseAdminEmail = env.VITE_FIREBASE_ADMIN_EMAIL;
const firebaseAppName = "youth-sailing";
export const firebaseApp = firebaseConfigured
  ? (getApps().find((app) => app.name === firebaseAppName) ?? initializeApp(firebaseConfig, firebaseAppName))
  : null;
export const firebaseAuthTenantId = env.VITE_FIREBASE_AUTH_TENANT_ID?.trim() || null;
export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
if (firebaseAuth) firebaseAuth.tenantId = firebaseAuthTenantId;
export const firebaseDb = firebaseApp ? getFirestore(firebaseApp) : null;

export async function prepareTenantAuth() {
  if (!firebaseAuth || !firebaseAuthTenantId) return;
  await firebaseAuth.authStateReady();
  if (firebaseAuth.currentUser && firebaseAuth.currentUser.tenantId !== firebaseAuthTenantId) {
    await signOut(firebaseAuth);
  }
}

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
