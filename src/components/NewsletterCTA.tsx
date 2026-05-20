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
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 sm:p-16"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-white/90 text-sm font-bold uppercase tracking-wider"
            >
              <FiMail className="w-5 h-5" />
              Newsletter
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Get New Prompts Weekly
            </h2>

            <p className="text-lg text-white/80 max-w-xl">
              Subscribe to our newsletter and receive 5+ new premium prompts directly to your inbox every week. No spam, ever.
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex gap-3 max-w-md"
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
              className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition disabled:opacity-50"
            />

            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-white text-blue-600 font-bold flex items-center gap-2 hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
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
                status === 'error' ? 'text-red-200' : 'text-green-200'
              }`}
            >
              {message}
            </motion.p>
          )}

          {/* Social Proof */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-sm text-white/70">
              💌 Join 50,000+ creators getting inspired weekly
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
