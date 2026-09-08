"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { firebaseAdminEmail, firebaseAuth, firebaseConfigured, getWaitlistProfile } from "../lib/firebase";
import PasswordField from "../password-field";

const accounts = {
  user: { username: "sailor@example.com", password: "sailor2027", destination: "/dashboard", type: "user" },
  admin: { username: "admin@sailweek.test", password: "admin2027", destination: "/admin", type: "admin" },
  waitlisted: { username: "waitlisted@example.com", password: "waiting2027", destination: "/waitlist", type: "waitlisted" },
};

export default function LoginPage() {
  const router = useRouter(); const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      if (firebaseConfigured && firebaseAuth) {
        const credential = await signInWithEmailAndPassword(firebaseAuth, username, password);
        if (firebaseAdminEmail && credential.user.email?.toLowerCase() === firebaseAdminEmail.toLowerCase()) {
          localStorage.setItem("sail-week-session", JSON.stringify({ username, type: "admin" })); router.push("/admin"); return;
        }
        const profile = await getWaitlistProfile(credential.user);
        const type = profile?.status === "accepted" ? "user" : "waitlisted";
        localStorage.setItem("sail-week-session", JSON.stringify({ username: credential.user.email, type })); router.push(type === "user" ? "/dashboard" : "/waitlist"); return;
      }
      const stored = localStorage.getItem("sail-week-waitlist-account"); const storedAccount = stored ? JSON.parse(stored) : null; const account = Object.values(accounts).find((item) => item.username === username && item.password === password) ?? (storedAccount?.email === username && storedAccount?.password === password ? { username, destination: "/waitlist", type: "waitlisted" } : null);
      if (!account) { setError("That username and password do not match a mock account."); return; }
      localStorage.setItem("sail-week-session", JSON.stringify({ username, type: account.type })); router.push(account.destination);
    } catch { setError("We could not sign you in. Check your email and password, then try again."); } finally { setLoading(false); }
  }
  return <main className="auth-shell"><a className="brand" href="/"><span className="brand-mark">YS</span><span>Youth Sailing</span></a><section className="auth-card"><p className="eyebrow">Crew access</p><h1>Welcome back to the trip plan.</h1><p className="auth-intro">Your access depends on your waitlist status. Accepted crew can see trip details and preferences; waitlisted users can check their status here.</p><form onSubmit={handleSubmit} className="form-stack"><label>Email or username<input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="sailor@example.com" autoComplete="email" required /></label><PasswordField label="Password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete="current-password" />{error && <p className="form-error">{error}</p>}<button className="button button-primary" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"} <span aria-hidden="true">→</span></button></form>{!firebaseConfigured && <div className="mock-credentials"><div><span>Participant</span><code>sailor@example.com</code><code>sailor2027</code></div><div><span>Admin</span><code>admin@sailweek.test</code><code>admin2027</code></div><div><span>Waitlisted</span><code>waitlisted@example.com</code><code>waiting2027</code></div></div>}</section></main>;
}
