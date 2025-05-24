# Hotwire vs Inertia Showcase

Hotwire vs Inertia Showcase is a Rails application demonstrating and comparing two modern approaches for building SPA-like user interfaces within Rails:

- **Hotwire** (Turbo & Stimulus): server-driven HTML updates with minimal JavaScript.
- **Inertia.js** (React & Vite): client-side routing and state management using a JavaScript framework.

The project includes parallel implementations of a simple feedback management interface under the `hotwire` and `inertia` namespaces, allowing you to explore:

- Differences in update patterns and page rendering.
- Trade-offs in code organization and developer workflow.
- Performance characteristics and JavaScript footprint.

Feel free to browse the `app/controllers/hotwire`, `app/views/hotwire`, `app/controllers/inertia`, and `app/javascript/inertia` directories to see each implementation side by side.
