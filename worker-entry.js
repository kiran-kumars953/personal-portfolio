import { onRequestPost } from "./functions/api/contact.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle the contact form POST requests
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        return await onRequestPost({ request, env });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: "Server error in contact function.", detail: String(err) }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Otherwise, serve static assets (HTML, JS, CSS, images, videos) from the dist folder
    return env.ASSETS.fetch(request);
  },
};
