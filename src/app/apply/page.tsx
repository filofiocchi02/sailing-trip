"use client";

import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth, firebaseConfigured, saveWaitlistProfile } from "../lib/firebase";
import PasswordField from "../password-field";

const roles = ["I've never been sailing", "I know I have been sailing and I can help", "I am a qualified skipper, but I do not feel comfortable skippering by myself", "I am a qualified skipper, and I feel comfortable skippering a boat"];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState(""); const [password, setPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState(""); const [role, setRole] = useState(roles[0]); const [note, setNote] = useState(""); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (password !== confirmPassword) { setError("Your passwords do not match."); return; }
    setSaving(true);
    try {
      if (firebaseConfigured && firebaseAuth) {
        const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        await updateProfile(credential.user, { displayName: name });
        await saveWaitlistProfile(credential.user, { name, email, phone, role, note });
      } else {
        localStorage.setItem("sail-week-waitlist-account", JSON.stringify({ name, email, phone, password, role, note, status: "waitlisted" }));
      }
      setSubmitted(true);
    } catch (submitError) {
      const code = submitError instanceof Error && "code" in submitError ? String((submitError as { code?: string }).code) : "";
      setError(code.includes("email-already-in-use") ? "An account already exists for this email. Try signing in instead." : "We could not save your application. Please check your details and try again.");
    } finally { setSaving(false); }
  }
  if (submitted) return <main className="auth-shell"><a className="brand" href="/" aria-label="Youth Sailing home"><span className="brand-mark">YS</span><span>Youth Sailing</span></a><section className="auth-card" aria-live="polite"><p className="eyebrow">You&apos;re on the list</p><h1>Thanks, {name.split(" ")[0]}.</h1><p className="auth-intro">We&apos;ve saved your interest in the Croatia 2027 trip. We&apos;ll be in touch at {email} when places and dates are confirmed.</p><div className="panel" style={{ marginTop: 28, background: "#e0e9e1" }}><p className="eyebrow">Waitlist status</p><h2 style={{ fontSize: 32, marginBottom: 12 }}>Application received</h2><p className="panel-copy" style={{ marginBottom: 0 }}>You are currently waitlisted. We&apos;ll let you know when your place is approved.</p></div><div className="hero-actions" style={{ marginTop: 28 }}><a className="button button-primary" href="/">Back to trip overview <span aria-hidden="true">→</span></a><a className="text-link" href="/login">Sign in to check status</a></div></section></main>;
  return <main className="auth-shell"><a className="brand" href="/" aria-label="Youth Sailing home"><span className="brand-mark">YS</span><span>Youth Sailing</span></a><section className="auth-card"><p className="eyebrow">Croatia · 2027</p><h1>Join the waitlist.</h1><p className="auth-intro">Tell us a little about yourself, how to contact you, and create a password. We&apos;ll use this to shape the crew as the trip takes form.</p><form onSubmit={handleSubmit} className="form-stack"><label>Name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" autoComplete="name" required /></label><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required /></label><label>Phone number<input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+44 7700 900000" autoComplete="tel" required /></label><PasswordField label="Create a password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Choose a password" autoComplete="new-password" minLength={6} /><PasswordField label="Confirm password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your password" autoComplete="new-password" minLength={6} /><label>How will you help on board?<select className="select-control" value={role} onChange={(event) => setRole(event.target.value)}>{roles.map((option) => <option key={option} value={option}>{option}</option>)}</select></label><label>Anything else we should know? <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span><textarea className="text-control" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Availability, experience, or questions" rows={4} /></label>{error && <p className="form-error">{error}</p>}<button className="button button-primary" type="submit" disabled={saving}>{saving ? "Saving application…" : "Join the waitlist"} <span aria-hidden="true">→</span></button></form></section></main>;
}
