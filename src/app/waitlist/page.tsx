"use client";

import { useEffect, useState } from "react";

export default function WaitlistPage() {
  const [name, setName] = useState("there");
  useEffect(() => { const stored = localStorage.getItem("sail-week-waitlist-account"); if (stored) setName(JSON.parse(stored).name?.split(" ")[0] || "there"); }, []);
  return <main className="auth-shell"><a className="brand" href="/"><span className="brand-mark">YS</span><span>Youth Sailing</span></a><section className="auth-card"><p className="eyebrow">Waitlist status</p><h1>Thanks, {name}.</h1><p className="auth-intro">You have been added to the Youth Sailing waitlist.</p><div className="panel waitlist-status-card"><h2>We&apos;ll let you know when your place is approved. The team is working on it.</h2><span className="status-pill">Currently waitlisted</span></div><div className="hero-actions" style={{ marginTop: 28 }}><a className="button button-primary" href="/">Back to trip overview <span aria-hidden="true">→</span></a><a className="text-link" href="/login">Sign out</a></div></section></main>;
}
