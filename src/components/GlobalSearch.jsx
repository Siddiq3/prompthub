"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { FaClock, FaTimes, FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";

const RECENT_KEY = "pph_recent_searches";

function splitHighlight(text = "", q = "") {
  if (!q) return [text];
  const lower = text.toLowerCase();
  const ql = q.toLowerCase();
  const idx = lower.indexOf(ql);
  if (idx === -1) return [text];
  return [text.slice(0, idx), text.slice(idx, idx + q.length), text.slice(idx + q.length)];
}

export default function GlobalSearch({ isOpen = false, prompts = [], onClose }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ prompts: [], categories: [], tags: [] });
  const [activeIndex, setActiveIndex] = useState({ section: "prompts", index: 0 });
  const [recent, setRecent] = useState([]);
  const [debouncing, setDebouncing] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setRecent(() => {
      try {
        const raw = localStorage.getItem(RECENT_KEY);
        return raw ? JSON.parse(raw).slice(0, 5) : [];
      } catch (e) {
        return [];
      }
    });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard navigation, focus trap, scroll active into view, announce selection
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveActive(1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        moveActive(-1);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        handleEnter();
      }
      // Focus trap
      if (e.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll('.pph-search-modal input, .pph-search-modal button'));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, activeIndex, query, onClose]);

  // Scroll active result into view
  useEffect(() => {
    const id = getActiveId();
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    // Announce selection
    if (liveRegionRef.current) {
      let msg = '';
      if (!query) {
        if (activeIndex.section === 'recent' && recent[activeIndex.index]) {
          msg = `Recent: ${recent[activeIndex.index]}`;
        }
      } else {
        if (activeIndex.section === 'prompts' && results.prompts[activeIndex.index]) {
          msg = `Prompt: ${results.prompts[activeIndex.index].title}`;
        } else if (activeIndex.section === 'categories' && results.categories[activeIndex.index]) {
          msg = `Category: ${results.categories[activeIndex.index].name}`;
        } else if (activeIndex.section === 'tags' && results.tags[activeIndex.index]) {
          msg = `Tag: ${results.tags[activeIndex.index].name}`;
        }
      }
      if (msg) liveRegionRef.current.textContent = msg;
    }
  }, [activeIndex, query, results, recent]);

  const categoriesMap = useMemo(() => {
    const map = new Map();
    for (const p of prompts) {
      const cat = p.category || "Uncategorized";
      map.set(cat, (map.get(cat) || 0) + 1);
    }
    return map;
  }, [prompts]);

  const allTags = useMemo(() => {
    const map = new Map();
    for (const p of prompts) {
      for (const t of (p.displayTags || p.tags || [])) {
        map.set(t, (map.get(t) || 0) + 1);
      }
    }
    return map;
  }, [prompts]);

  useEffect(() => {
    if (debouncing) return;
    setDebouncing(true);
    const id = setTimeout(() => {
      const q = String(query || "").trim();
      if (!q) {
        setResults({ prompts: [], categories: [], tags: [] });
        setActiveIndex({ section: "recent", index: 0 });
        setDebouncing(false);
        return;
      }


      // Weighted keys: title > displayTags > tags > category > modelLabel
      const promptFuse = new Fuse(prompts || [], {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "displayTags", weight: 0.2 },
          { name: "tags", weight: 0.15 },
          { name: "category", weight: 0.1 },
          { name: "modelLabel", weight: 0.05 }
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 2
      });

      const categoryList = [...categoriesMap.entries()].map(([k, v]) => ({ name: k, count: v }));
      const categoryFuse = new Fuse(categoryList, { keys: [{ name: "name", weight: 1 }], threshold: 0.33, ignoreLocation: true, minMatchCharLength: 2 });

      const tagList = [...allTags.entries()].map(([k, v]) => ({ name: k, count: v }));
      const tagFuse = new Fuse(tagList, { keys: [{ name: "name", weight: 1 }], threshold: 0.33, ignoreLocation: true, minMatchCharLength: 2 });

      const matchedPrompts = promptFuse.search(q, { limit: 6 }).map((r) => r.item);
      const matchedCategories = categoryFuse.search(q, { limit: 6 }).map((r) => r.item);
      const matchedTags = tagFuse.search(q, { limit: 12 }).map((r) => r.item);

      setResults({ prompts: matchedPrompts, categories: matchedCategories, tags: matchedTags });
      setActiveIndex({ section: matchedPrompts.length ? "prompts" : matchedCategories.length ? "categories" : matchedTags.length ? "tags" : "none", index: 0 });
      setDebouncing(false);
    }, 200);

    return () => clearTimeout(id);
  }, [query, prompts, categoriesMap, allTags]);

  const moveActive = (dir = 1) => {
    const sections = ["prompts", "categories", "tags"];
    let s = activeIndex.section;
    let i = activeIndex.index;

    // If currently on recent and query empty, cycle recent
    if (!query) {
      const rlen = recent.length;
      if (rlen === 0) return;
      i = (i + dir + rlen) % rlen;
      setActiveIndex({ section: "recent", index: i });
      return;
    }

    // Move within current section
    const currentLen = results[s]?.length || 0;
    if (currentLen > 0) {
      const ni = i + dir;
      if (ni >= 0 && ni < currentLen) {
        setActiveIndex({ section: s, index: ni });
        return;
      }
    }

    // move to next/prev section
    let si = sections.indexOf(s);
    let attempts = 0;
    while (attempts < 3) {
      si = (si + (dir > 0 ? 1 : -1) + sections.length) % sections.length;
      const sec = sections[si];
      const len = results[sec]?.length || 0;
      if (len > 0) {
        setActiveIndex({ section: sec, index: dir > 0 ? 0 : len - 1 });
        return;
      }
      attempts++;
    }
  };

  const saveRecent = (q) => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const dedup = [q, ...arr.filter((a) => a !== q)].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(dedup));
      setRecent(dedup);
    } catch (e) {
      // ignore
    }
  };

  const removeRecent = (item) => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const next = arr.filter((a) => a !== item);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      setRecent(next);
    } catch (e) {}
  };

  const handleEnter = () => {
    if (!query && recent.length > 0) {
      const q = recent[activeIndex.index] || recent[0];
      if (q) {
        saveRecent(q);
        onClose();
        router.push(`/prompts?q=${encodeURIComponent(q)}`);
      }
      return;
    }

    const { section, index } = activeIndex;
    if (!section || section === "none") return;

    if (section === "prompts") {
      const item = results.prompts[index];
      if (item) {
        saveRecent(query);
        onClose();
        router.push(item.url || `/prompt/${item.slug}`);
      }
    } else if (section === "categories") {
      const item = results.categories[index];
      if (item) {
        saveRecent(query);
        onClose();
        router.push(`/category/${encodeURIComponent(item.name.toLowerCase())}`);
      }
    } else if (section === "tags") {
      const item = results.tags[index];
      if (item) {
        saveRecent(query);
        onClose();
        router.push(`/prompts?tag=${encodeURIComponent(item.name)}`);
      }
    } else if (section === "recent") {
      const q = recent[index];
      if (q) {
        saveRecent(q);
        onClose();
        router.push(`/prompts?q=${encodeURIComponent(q)}`);
      }
    }
  };

  const openItem = (type, item) => {
    if (type === "prompt") {
      saveRecent(query);
      onClose();
      router.push(item.url || `/prompt/${item.slug}`);
    }
    if (type === "category") {
      saveRecent(query);
      onClose();
      router.push(`/category/${encodeURIComponent(item.name.toLowerCase())}`);
    }
    if (type === "tag") {
      saveRecent(query);
      onClose();
      router.push(`/prompts?tag=${encodeURIComponent(item.name)}`);
    }
  };


  // ARIA: activeDescendant, role, live region
  const liveRegionRef = useRef(null);
  useEffect(() => {
    if (!liveRegionRef.current) return;
    let msg = '';
    if (!query) {
      msg = recent.length ? `${recent.length} recent searches` : 'No recent searches';
    } else {
      const total = results.prompts.length + results.categories.length + results.tags.length;
      msg = total === 0 ? `No results for ${query}` : `${results.prompts.length} prompts, ${results.categories.length} categories, ${results.tags.length} tags`;
    }
    liveRegionRef.current.textContent = msg;
  }, [query, results, recent]);

  const getActiveId = () => {
    if (!query) return activeIndex.section === 'recent' ? `recent-item-${activeIndex.index}` : undefined;
    if (activeIndex.section === 'prompts') return `prompt-item-${activeIndex.index}`;
    if (activeIndex.section === 'categories') return `category-item-${activeIndex.index}`;
    if (activeIndex.section === 'tags') return `tag-item-${activeIndex.index}`;
    return undefined;
  };

  const content = (
    <div className="fixed inset-0 z-50 pph-search-modal" role="dialog" aria-modal="true" aria-label="Global search">
      <div className="absolute inset-0 bg-black" style={{ opacity: 0.8 }} onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[600px] rounded-[16px] border border-white/10 bg-[#131729]" style={{ maxHeight: '70vh' }} onClick={(e) => e.stopPropagation()}>
          <div className="p-4">
            <div className="relative">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search prompts, categories, tags…"
                className="w-full h-[52px] rounded-md border border-transparent bg-transparent px-4 text-white placeholder:text-slate-400 text-lg outline-none focus:ring-2 focus:ring-violet-500"
                autoFocus
                role="searchbox"
                aria-autocomplete="list"
                aria-activedescendant={getActiveId()}
                aria-controls="search-results-list"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-white/90 focus:ring-2 focus:ring-violet-500"
                aria-label="Close search"
              >
                <FaTimes />
              </button>
            </div>

            <div className="sr-only" aria-live="polite" aria-atomic="true" ref={liveRegionRef}></div>

            <div className="mt-3 max-h-[58vh] overflow-auto" ref={listRef}>
              {(!query || query.trim() === "") ? (
                <div>
                  <p className="text-sm font-semibold uppercase text-slate-400 mb-3">Recent</p>
                  <ul className="space-y-2" id="search-results-list" role="listbox">
                    {recent.length === 0 ? (
                      <li className="text-sm text-slate-500">No recent searches</li>
                    ) : recent.map((r, idx) => (
                      <li key={r} id={`recent-item-${idx}`} role="option" aria-selected={activeIndex.section === 'recent' && activeIndex.index === idx} className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 hover:bg-white/5 ${activeIndex.section === 'recent' && activeIndex.index === idx ? 'ring-1 ring-violet-500/60' : ''}`}> 
                        <button type="button" className="inline-flex items-center gap-3 text-sm text-slate-200 focus:ring-2 focus:ring-violet-500" onClick={() => { setQuery(r); setTimeout(() => handleEnter(), 60); }}>
                          <FaClock className="w-4 h-4 text-slate-400" />
                          <span className="truncate">{r}</span>
                        </button>
                        <button type="button" className="text-slate-400 focus:ring-2 focus:ring-violet-500" onClick={() => removeRecent(r)} aria-label={`Remove ${r}`}>
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Prompts section */}
                  <div>
                    <p className="text-sm font-semibold uppercase text-slate-400 mb-3">Prompts</p>
                    {results.prompts.length === 0 ? (
                      <div className="text-sm text-slate-500">No results for '{query}'</div>
                    ) : (
                      <ul className="space-y-2" id="search-results-list" role="listbox">
                        {results.prompts.map((p, idx) => {
                          const parts = splitHighlight(p.title, query);
                          const active = activeIndex.section === 'prompts' && activeIndex.index === idx;
                          return (
                            <li key={p.id} id={`prompt-item-${idx}`} role="option" aria-selected={active} className={`flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/5 ${active ? 'ring-2 ring-violet-500/60 bg-white/5' : ''}`}>
                              <img src={p.previewImage || p.image} alt="" className="h-10 w-10 rounded-md object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                  {parts.length === 1 ? parts[0] : (<><span>{parts[0]}</span><span className="text-violet-400 font-semibold">{parts[1]}</span><span>{parts[2]}</span></>)}
                                </div>
                                <div className="text-xs text-slate-400 truncate">{p.modelLabel} · {p.category}</div>
                              </div>
                              <button type="button" className="text-slate-400 focus:ring-2 focus:ring-violet-500" onClick={() => openItem('prompt', p)}>Open</button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* Categories section */}
                  <div>
                    <p className="text-sm font-semibold uppercase text-slate-400 mb-3">Categories</p>
                    {results.categories.length === 0 ? null : (
                      <ul className="space-y-2" role="listbox">
                        {results.categories.map((c, idx) => {
                          const active = activeIndex.section === 'categories' && activeIndex.index === idx;
                          const parts = splitHighlight(c.name, query);
                          return (
                            <li key={c.name} id={`category-item-${idx}`} role="option" aria-selected={active} className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 hover:bg-white/5 ${active ? 'ring-2 ring-violet-500/60 bg-white/5' : ''}`}>
                              <div className="flex items-center gap-3">
                                <div className="text-lg">📁</div>
                                <div>
                                  <div className="text-sm text-white">{parts.length === 1 ? parts[0] : (<><span>{parts[0]}</span><span className="text-violet-400 font-semibold">{parts[1]}</span><span>{parts[2]}</span></>)}</div>
                                  <div className="text-xs text-slate-400">{c.count} prompts</div>
                                </div>
                              </div>
                              <button type="button" className="text-slate-400 focus:ring-2 focus:ring-violet-500" onClick={() => openItem('category', c)}>Open</button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* Tags section */}
                  <div>
                    <p className="text-sm font-semibold uppercase text-slate-400 mb-3">Tags</p>
                    {results.tags.length === 0 ? null : (
                      <div className="flex flex-wrap gap-2" role="listbox">
                        {results.tags.map((t, idx) => {
                          const active = activeIndex.section === 'tags' && activeIndex.index === idx;
                          return (
                            <button key={t.name} id={`tag-item-${idx}`} role="option" aria-selected={active} onClick={() => openItem('tag', t)} className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 ${active ? 'bg-violet-600 text-white ring-2 ring-violet-500' : 'bg-white/5 text-slate-100 hover:bg-white/10'}`}>
                              #{t.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button type="button" onClick={onClose} className="text-sm text-slate-400 focus:ring-2 focus:ring-violet-500">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return mounted && isOpen ? createPortal(content, document.body) : null;
}
