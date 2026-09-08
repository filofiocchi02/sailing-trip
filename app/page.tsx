"use client";

import { useEffect, useState } from "react";
import { availableTripSlots, defaultTripDetails, tripStorageKey, type TripDetails } from "./lib/trip";

export default function Home() {
  const [trip, setTrip] = useState<TripDetails>(defaultTripDetails);
  useEffect(() => {
    const storedTrip = localStorage.getItem(tripStorageKey);
    if (storedTrip) setTrip({ ...defaultTripDetails, ...JSON.parse(storedTrip) });
  }, []);
  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Youth Sailing home"><span className="brand-mark" aria-hidden="true">YS</span><span>Youth Sailing</span></a>
        <div className="topbar-links"><a href="#how-it-works">How it works</a><a href="/apply">Join the waitlist</a><a className="button button-small button-quiet" href="/login">Sign in</a></div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{trip.country} · 2027</p>
          <h1 id="hero-title">{trip.name}</h1>
          <p className="hero-lede">{trip.description}</p>
          <div className="hero-actions"><a className="button button-primary" href="/apply">Join the waitlist <span aria-hidden="true">→</span></a><a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-card" aria-label="Trip snapshot">
          <img className="hero-card-image" src="/images/crew-beach.jpeg" alt="The crew on a beach beside the sea" />
          <div className="hero-card-overlay" />
          <div className="route-map" aria-hidden="true"><svg viewBox="0 0 280 100" className="route-squiggle-svg"><path className="route-squiggle" d="M8 52 C35 20 55 75 82 45 S129 35 151 56 S181 78 207 62" /></svg><span className="route-boat">⛵</span></div>
          <div className="hero-card-label">Trip snapshot</div><div className="hero-card-place">{trip.country}</div>
          <div className="hero-card-meta"><span>Provisional location</span><strong>{trip.provisionalLocation}</strong></div>
          <div className="hero-card-meta"><span>Timing</span><strong>{trip.finalWeek === "Not finalised" ? trip.provisionalWeeks[0] : trip.finalWeek}</strong></div>
        </div>
      </section>

      <section className="public-details" id="how-it-works" aria-labelledby="details-title">
        <div className="section-heading"><div><p className="eyebrow">The plan so far</p><h2 id="details-title">A small fleet, a good crew, and a week to remember.</h2></div><p>Sign up to share your availability. Once places open up, accepted crew members can choose their role, boat, and reservation.</p></div>
        <div className="public-grid">
          <article className="public-stat"><strong>{trip.acceptedCount}</strong><span>accepted crew</span><p>The waitlist is open while we work out the best week and fleet size.</p></article>
          <article className="public-stat public-stat-accent"><strong>{availableTripSlots(trip)}</strong><span>places currently available</span><p>Capacity updates as boats are added and deposits are paid.</p></article>
          <article className="public-info"><p className="eyebrow">What happens next</p><ol><li>Join the waitlist with your sailing experience.</li><li>Share the weeks you can make.</li><li>Reserve your place once accepted.</li></ol><a className="card-link" href="/apply">Join the waitlist <span aria-hidden="true">↗</span></a></article>
        </div>
        <div className="photo-strip" aria-label="Memories from the water">
          <img src="/images/harbour-sunset.jpeg" alt="Sunset over a Croatian harbour" />
          <img src="/images/crew-sailing.jpeg" alt="Crew members sailing together" />
          <img src="/images/helm.jpeg" alt="Crew at the helm of a sailboat" />
          <img src="/images/sailboat-sunset.jpeg" alt="Sailboat at sunset" />
        </div>
        <div className="trip-brief" aria-label="Trip information">
          <div className="trip-brief-intro"><p className="eyebrow">Trip brief</p><h2>Know before you go.</h2></div>
          <div className="trip-facts"><article><span>Arrival and travel</span><strong>Before you go</strong><p>{trip.arrivalInfo}</p></article><article><span>Location</span><strong>{trip.finalLocation === "To be confirmed" ? trip.provisionalLocation : trip.finalLocation}</strong><p>{trip.locationCoordinates ? `Google Maps: ${trip.locationCoordinates}` : "The final marina location will be shared with the crew."}</p></article><article><span>Boat check-in</span><strong>17:00 on Saturday</strong><p>Be at the boat by 5 pm on the Saturday of the selected start week.</p></article></div>
        </div>
      </section>

      <footer className="footer"><span>Youth Sailing · Croatia 2027</span><span>Built for a good crew.</span></footer>
    </main>
  );
}
