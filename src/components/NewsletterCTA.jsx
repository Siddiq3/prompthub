"use client";

import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // You can integrate with an email service like Mailchimp, Brevo, etc.
      // For now, we'll just simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Newsletter signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-slate-100 to-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Never miss new prompts
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Get the latest AI prompts delivered to your inbox weekly
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-400 font-semibold">
            ✓ Thanks for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}
