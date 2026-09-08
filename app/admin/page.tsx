"use client";

import { useState } from "react";
import { defaultTripDetails, tripDetailsSchema, tripLogisticsSchema, tripStorageKey, totalTripSlots, type TripDetails } from "../lib/trip";

const roles = ["Never sailed", "Can help", "Qualified skipper", "Comfortable skipper"];
const people = [
  ["Maya Green", "maya@example.com", "+44 7700 900101", "Can help"], ["Jon Bell", "jon@example.com", "+44 7700 900102", "Qualified skipper"], ["Priya Shah", "priya@example.com", "+44 7700 900103", "Never sailed"], ["Alex Morgan", "alex@example.com", "+44 7700 900104", "Comfortable skipper"], ["Luca Rossi", "luca@example.com", "+44 7700 900105", "Can help"], ["Sofia Martin", "sofia@example.com", "+44 7700 900106", "Never sailed"], ["Theo Clarke", "theo@example.com", "+44 7700 900107", "Qualified skipper"], ["Nina Patel", "nina@example.com", "+44 7700 900108", "Can help"], ["Sam Wilson", "sam@example.com", "+44 7700 900109", "Never sailed"], ["Elena Costa", "elena@example.com", "+44 7700 900110", "Comfortable skipper"], ["Arthur Jones", "arthur@example.com", "+44 7700 900111", "Can help"], ["Mia Brown", "mia@example.com", "+44 7700 900112", "Never sailed"], ["Leo Evans", "leo@example.com", "+44 7700 900113", "Qualified skipper"], ["Grace Lee", "grace@example.com", "+44 7700 900114", "Can help"], ["Noah Smith", "noah@example.com", "+44 7700 900115", "Never sailed"], ["Isla Turner", "isla@example.com", "+44 7700 900116", "Can help"], ["Daniel King", "daniel@example.com", "+44 7700 900117", "Qualified skipper"], ["Ava Scott", "ava@example.com", "+44 7700 900118", "Never sailed"], ["Max Taylor", "max@example.com", "+44 7700 900119", "Can help"],
].map(([name, email, phone, role]) => ({ name, email, phone, role }));

type SchemaField = { key: keyof TripDetails; label: string; type: string };

export default function AdminPage() {
  const [trip, setTrip] = useState<TripDetails>(defaultTripDetails);
  const [accepted, setAccepted] = useState<string[]>(["Maya Green", "Jon Bell", "Alex Morgan", "Luca Rossi", "Theo Clarke", "Nina Patel", "Elena Costa", "Arthur Jones", "Leo Evans", "Grace Lee"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [settingsDirty, setSettingsDirty] = useState(false);
  const paymentStatus: Record<string, "Deposit paid" | "Paid in full"> = { "Jon Bell": "Deposit paid", "Alex Morgan": "Paid in full" };
  const paidDepositCount = Object.keys(paymentStatus).length;
  const filteredPeople = people.filter((person) => `${person.name} ${person.email} ${person.role} ${person.phone}`.toLowerCase().includes(searchTerm.toLowerCase()));
  const acceptedPeople = people.filter((person) => accepted.includes(person.name));
  const roleCounts = roles.map((role) => ({ role, count: acceptedPeople.filter((person) => person.role === role).length }));
  const maxRoleCount = Math.max(...roleCounts.map((item) => item.count), 1);

  function updateField(key: keyof TripDetails, value: string) {
    const numericFields = ["boatCount", "capacityPerBoat", "estimatedCost", "depositCost"];
    setTrip((current) => ({ ...current, [key]: numericFields.includes(key) ? Number(value.replace(/[^0-9]/g, "")) || 0 : value }));
    setSettingsDirty(true);
  }

  function saveSettings() {
    const nextTrip = { ...trip, acceptedCount: accepted.length, paidDepositCount };
    setTrip(nextTrip); localStorage.setItem(tripStorageKey, JSON.stringify(nextTrip)); setSettingsDirty(false);
  }

  function renderField(field: SchemaField) {
    const value = String(trip[field.key] ?? "");
    return <label className="setting-label" key={field.key}>{field.label}{field.type === "textarea" ? <textarea className="text-control" rows={field.key === "arrivalInfo" || field.key === "description" ? 6 : 3} value={value} onChange={(event) => updateField(field.key, event.target.value)} /> : <input className="text-control" type="text" inputMode={field.type === "number" ? "numeric" : undefined} value={value} onChange={(event) => updateField(field.key, event.target.value)} />}</label>;
  }

  return <main className="app-shell"><header className="app-header"><a className="brand" href="/"><span className="brand-mark">SW</span><span>Sail Week</span></a><div className="app-user"><span>Admin · admin@sailweek.test</span><a href="/">Sign out</a></div></header><section className="dashboard-heading"><div><p className="eyebrow">Admin workspace</p><h1>Shape the week.</h1><p>Edit the trip brief once, then participant-facing views use the same details.</p></div><span className="status-pill admin-pill">Admin access</span></section><div className="admin-stats"><div><span>Accepted crew</span><strong>{accepted.length}</strong></div><div><span>Boats</span><strong>{trip.boatCount || "—"}</strong></div><div><span>Total slots</span><strong>{totalTripSlots(trip) || "—"}</strong></div><div><span>Deposits paid</span><strong>{paidDepositCount}</strong></div></div><div className="admin-grid"><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Waitlist</p><h2>Review the crew</h2></div><span className="saved-label">{people.length} people</span></div><p className="panel-copy">Accepted crew have been approved from the waitlist. A place is reserved only after the deposit is paid.</p><div className="role-breakdown"><div className="role-breakdown-heading"><span>Roles of accepted crew</span><span>{acceptedPeople.length} accepted</span></div>{roleCounts.map((item) => <div className="role-bar-row" key={item.role}><span>{item.role}</span><div className="role-bar-track"><div className="role-bar-fill" style={{ width: `${(item.count / maxRoleCount) * 100}%` }} /></div><strong>{item.count}</strong></div>)}</div><label className="waitlist-search"><span>Search the waitlist</span><input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by name, email, role, or phone" /></label><div className="people-list">{filteredPeople.length ? filteredPeople.map((person) => <div className="person-row" key={person.email}><div><strong>{person.name} <span className={`payment-tag ${paymentStatus[person.name] === "Paid in full" ? "paid-full" : paymentStatus[person.name] ? "paid-deposit" : "awaiting-payment"}`}>{paymentStatus[person.name] ?? (accepted.includes(person.name) ? "Awaiting payment" : "Not accepted")}</span></strong><span>{person.email} · {person.role}</span><a className="phone-link" href={`https://wa.me/${person.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${person.name.split(" ")[0]}, it’s Youth Sailing about the Croatia trip.`)}`} target="_blank" rel="noreferrer">{person.phone}</a></div><div className="person-actions"><button className={`mini-status ${accepted.includes(person.name) ? "accepted" : ""}`} onClick={() => setAccepted((current) => current.includes(person.name) ? current.filter((name) => name !== person.name) : [...current, person.name])}>{accepted.includes(person.name) ? "Accepted" : "Accept"}</button></div></div>) : <p className="empty-search">No people match “{searchTerm}”.</p>}</div></section><section className="panel admin-trip-panel"><div className="panel-heading"><div><p className="eyebrow">Trip details schema</p><h2>Format the trip</h2></div>{settingsDirty ? <span className="unsaved-label">Unsaved changes</span> : <span className="saved-label">Saved</span>}</div><p className="panel-copy">Youth Sailing Croatia 2027 · Croatia. The trip name and country are fixed; edit the participant-facing information and logistics below.</p><div className="schema-form"><section className="form-section"><p className="form-section-label">Trip information</p>{tripDetailsSchema.map((field) => renderField(field as SchemaField))}</section><section className="form-section"><p className="form-section-label">Location, dates and capacity</p>{tripLogisticsSchema.map((field) => renderField(field as SchemaField))}<p className="form-note">Boat check-in is fixed at 17:00 on the Saturday of the selected start week.</p></section></div><button className="button button-primary save-button" disabled={!settingsDirty} onClick={saveSettings}>Save trip details</button></section></div></main>;
}
