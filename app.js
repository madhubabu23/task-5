const destinations = [
  {
    id: "kyoto", name: "Kyoto, Japan", region: "Asia", category: "Culture",
    description: "Quiet lanes, little tea houses and a thousand shades of green.",
    price: 1240, duration: "5 days", rating: "4.9", tag: "Slow mornings",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "amalfi", name: "Amalfi Coast, Italy", region: "Europe", category: "Coast",
    description: "Salt air, lemon groves and long lunches by the sea.",
    price: 1680, duration: "6 days", rating: "4.8", tag: "By the sea",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "marrakech", name: "Marrakech, Morocco", region: "Africa", category: "Culture",
    description: "A sensory little maze of colour, courtyards and spice.",
    price: 980, duration: "4 days", rating: "4.9", tag: "A little wonder",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "bali", name: "Ubud, Indonesia", region: "Asia", category: "Nature",
    description: "Wake up to rice terraces, rainforest and the sound of rain.",
    price: 1120, duration: "7 days", rating: "4.7", tag: "Find your calm",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lisbon", name: "Lisbon, Portugal", region: "Europe", category: "City",
    description: "Tile-lined streets, golden light and one more pastel de nata.",
    price: 890, duration: "4 days", rating: "4.8", tag: "City wandering",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "patagonia", name: "Patagonia, Chile", region: "Americas", category: "Nature",
    description: "Big skies, wild trails and the kind of quiet you remember.",
    price: 2150, duration: "8 days", rating: "4.9", tag: "Go a little further",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85"
  }
];

const app = document.querySelector("#app");
const announcer = document.querySelector("#announcer");
const plannerCount = document.querySelector("#planner-count");
const nav = document.querySelector("#site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const validRoutes = new Set(["home", "destinations", "planner", "about"]);
let activeFilter = "All";
let savedTrips = loadTrips();

function loadTrips() {
  try {
    const stored = JSON.parse(localStorage.getItem("wanderly-trips") || "[]");
    return Array.isArray(stored) ? stored.filter((id) => destinations.some((item) => item.id === id)) : [];
  } catch (error) {
    console.warn("Could not read the saved trip list.", error);
    return [];
  }
}

function saveTrips() {
  try {
    localStorage.setItem("wanderly-trips", JSON.stringify(savedTrips));
  } catch (error) {
    console.warn("Could not save the trip list in this browser.", error);
    announce("Your trip list changed, but this browser could not save it.");
    return false;
  }
  return true;
}

function announce(message) {
  announcer.textContent = message;
}

function getRoute() {
  const route = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return route || "home";
}

function currency(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

function cardTemplate(place) {
  const isSaved = savedTrips.includes(place.id);
  return `
    <article class="destination-card">
      <div class="card-image">
        <img src="${place.image}" alt="Scenery in ${place.name}" loading="lazy">
        <span class="card-tag">${place.tag}</span>
      </div>
      <div class="card-body">
        <div class="card-meta"><span>${place.region} · ${place.duration}</span><span>★ ${place.rating}</span></div>
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <div class="card-bottom">
          <span>From <strong>${currency(place.price)}</strong></span>
          <button class="add-button" type="button" data-add="${place.id}" aria-label="${isSaved ? "Remove" : "Add"} ${place.name} ${isSaved ? "from" : "to"} your planner" aria-pressed="${isSaved}">${isSaved ? "✓" : "+"}</button>
        </div>
      </div>
    </article>`;
}

function homePage() {
  return `
    <div class="page-enter">
      <section class="hero">
        <div>
          <span class="eyebrow">For the joy of getting lost</span>
          <h1>Find your <em>somewhere.</em></h1>
          <p class="hero-copy">A few days away can change everything. Find the places that make you feel a little more like yourself.</p>
          <div class="hero-actions"><a class="button" href="#/destinations">Find your next trip <span aria-hidden="true">↗</span></a><a class="text-link" href="#/about">Get to know us</a></div>
        </div>
        <div class="hero-art">
          <div class="hero-photo">
            <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=90" alt="A peaceful alpine lake surrounded by mountains">
            <div class="photo-label"><div><strong>Lake Como, Italy</strong><span>Your next slow morning?</span></div><span class="rating">★ 4.9</span></div>
          </div>
          <div class="floating-note">A good place to begin<strong>Somewhere unexpected</strong></div>
        </div>
      </section>
      <section class="section featured">
        <div class="section-heading"><div><span class="eyebrow">A few good ideas</span><h2>Places to fall for</h2></div><a class="text-link" href="#/destinations">See all destinations ↗</a></div>
        <div class="card-grid">${destinations.slice(0, 3).map(cardTemplate).join("")}</div>
      </section>
      <section class="quote-band"><div><span class="eyebrow">A note from us</span><h2>“The best trips leave a little room for the unexpected.”</h2></div><a class="button" href="#/planner">Start a little list <span aria-hidden="true">↗</span></a></section>
    </div>`;
}

function destinationsPage() {
  const filters = ["All", "Culture", "Coast", "Nature", "City"];
  const visible = activeFilter === "All" ? destinations : destinations.filter((place) => place.category === activeFilter);
  return `
    <div class="page-enter">
      <section class="page-heading"><span class="eyebrow">Go where you feel</span><h1>Find a place that stays with you.</h1><p>Consider this your little collection of places worth taking the long way for. Pick a few and start your own list.</p></section>
      <section class="section listing-section">
        <div class="filter-row" aria-label="Filter destinations">${filters.map((filter) => `<button class="filter-chip" type="button" data-filter="${filter}" aria-pressed="${activeFilter === filter}">${filter}</button>`).join("")}</div>
        <div class="card-grid">${visible.map(cardTemplate).join("")}</div>
      </section>
    </div>`;
}

function plannerPage() {
  const trips = destinations.filter((place) => savedTrips.includes(place.id));
  const total = trips.reduce((sum, place) => sum + place.price, 0);
  const list = trips.length
    ? `<div class="planner-list">${trips.map((place) => `<article class="planner-item"><img src="${place.image}" alt="" loading="lazy"><div><h3>${place.name}</h3><p>${place.duration} · From ${currency(place.price)}</p></div><button class="remove-button" type="button" data-remove="${place.id}" aria-label="Remove ${place.name} from your planner">Remove</button></article>`).join("")}</div>`
    : `<div class="empty-state"><h2>Your list is ready for a first idea.</h2><p>Save any destination you like and it will be waiting right here.</p><a class="button" href="#/destinations">Explore destinations <span aria-hidden="true">↗</span></a></div>`;
  return `
    <div class="page-enter">
      <section class="page-heading"><span class="eyebrow">Your next chapter</span><h1>A little list of possibilities.</h1><p>Keep the places you're dreaming about together. Your picks stay saved in this browser.</p></section>
      <section class="planner-layout"><div>${list}</div><aside class="planner-summary"><span class="eyebrow">Your daydream, so far</span><h2>${trips.length} ${trips.length === 1 ? "place" : "places"} saved</h2><p>These are starting prices for inspiration, not a booking. The best part is deciding where to go.</p><div class="summary-total"><span>Starting-price total</span><strong>${currency(total)}</strong></div><a class="text-link" href="#/destinations">Add another place ↗</a></aside></section>
    </div>`;
}

function aboutPage() {
  return `
    <div class="page-enter">
      <section class="page-heading"><span class="eyebrow">A little about us</span><h1>Travel, with room to breathe.</h1></section>
      <section class="about-layout">
        <img class="about-image" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85" alt="Sunlight falling across a green mountain valley">
        <div class="about-copy"><span class="eyebrow">The wanderly feeling</span><h2>Not more places. More meaningful moments.</h2><p>Wanderly is a small travel-planning demo built around a simple thought: a good trip isn't a checklist. It's a slower breakfast, a conversation you didn't expect, and a view that makes you stop for a minute.</p><p>We collect a few ideas to help you get started. Save the places that speak to you, follow your curiosity, and leave a little space in the plan.</p><a class="button" href="#/destinations">Find a little inspiration <span aria-hidden="true">↗</span></a></div>
      </section>
    </div>`;
}

function notFoundPage() {
  return `<section class="not-found page-enter"><span class="eyebrow">A small detour</span><h1>That page wandered off.</h1><p>Try heading back to somewhere familiar.</p><a class="button" href="#/home">Back to discover <span aria-hidden="true">↗</span></a></section>`;
}

function render() {
  const route = getRoute();
  const knownRoute = validRoutes.has(route);
  const titles = { home: "Discover", destinations: "Destinations", planner: "My planner", about: "Our story" };
  document.title = `${knownRoute ? titles[route] : "Page not found"} — Wanderly`;
  app.setAttribute("aria-busy", "true");
  app.innerHTML = knownRoute
    ? ({ home: homePage, destinations: destinationsPage, planner: plannerPage, about: aboutPage })[route]()
    : notFoundPage();
  app.setAttribute("aria-busy", "false");
  document.querySelectorAll(".site-nav [data-route]").forEach((link) => {
    if (link.dataset.route === route) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  plannerCount.textContent = String(savedTrips.length);
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}

function toggleTrip(id) {
  const place = destinations.find((item) => item.id === id);
  if (!place) return;
  const isSaved = savedTrips.includes(id);
  savedTrips = isSaved ? savedTrips.filter((savedId) => savedId !== id) : [...savedTrips, id];
  saveTrips();
  render();
  announce(isSaved ? `${place.name} removed from your planner.` : `${place.name} added to your planner.`);
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    toggleTrip(addButton.dataset.add);
    return;
  }
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    toggleTrip(removeButton.dataset.remove);
    return;
  }
  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    activeFilter = filterButton.dataset.filter;
    render();
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
});

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
