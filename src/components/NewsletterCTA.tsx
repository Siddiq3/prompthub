'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiArrowRight } from 'react-icons/fi';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email');
      return;
    }

    setStatus('loading');

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // Simulated success for demo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus('success');
      setMessage('✓ Thanks for subscribing!');
      setEmail('');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Try again!');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <section className="border-t border-slate-200 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 sm:p-8"
      >
        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#2271b1]"
            >
              <FiMail className="w-5 h-5" />
              Newsletter
            </motion.div>

            <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
              Get New Prompts Weekly
            </h2>

            <p className="max-w-xl text-base leading-7 text-slate-600">
              Subscribe to our newsletter and receive 5+ new premium prompts directly to your inbox every week. No spam, ever.
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-full sm:max-w-md sm:flex-row"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              disabled={status === 'loading'}
              className="w-full rounded-md border border-slate-300 bg-white px-5 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-[#2271b1] focus:outline-none disabled:opacity-50"
            />

            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#2271b1] px-6 py-3 font-bold text-white transition hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {status === 'loading' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                />
              ) : (
                <FiArrowRight className="w-5 h-5" />
              )}
              {status === 'idle' && 'Subscribe'}
              {status === 'loading' && 'Sending...'}
              {status === 'success' && 'Subscribed!'}
            </motion.button>
          </motion.form>

          {/* Message */}
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-semibold ${
                status === 'error' ? 'text-red-600' : 'text-emerald-700'
              }`}
            >
              {message}
            </motion.p>
          )}

          {/* Social Proof */}
          <div className="border-t border-slate-200 pt-5">
            <p className="text-sm text-slate-500">
              Join 50,000+ creators getting inspired weekly
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
