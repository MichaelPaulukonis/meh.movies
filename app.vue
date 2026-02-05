<script setup lang="ts">
const isDark = ref(true) // Default to true for the "Digital Maximalism" vibe

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  if (isDark.value) document.documentElement.classList.add('dark')
})
</script>

<template>
  <div :class="{ 'dark': isDark }">
    <!-- Vibrant Background Wrapper with Ambient Glows -->
    <div class="min-h-screen bg-[var(--bg-main)] font-sans transition-colors duration-[800ms] selection:bg-[var(--color-accent)] selection:text-[var(--color-text-dark)] overflow-hidden relative">
      
      <!-- Ambient Decorative Blobs -->
      <div class="absolute top-[-10%] -left-20 w-[500px] h-[500px] bg-[var(--blob-1)] blur-[120px] rounded-full animate-pulse"></div>
      <div class="absolute bottom-[10%] -right-20 w-[400px] h-[400px] bg-[var(--blob-2)] blur-[100px] rounded-full animate-bounce" style="animation-duration: 10s"></div>
      <div class="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-[var(--blob-3)] blur-[80px] rounded-full"></div>

      <!-- Sticky Header -->
      <header class="border-b border-white/20 p-6 sticky top-0 bg-black/40 backdrop-blur-2xl z-50">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <NuxtLink to="/" class="group flex items-center gap-3">
            <span class="text-4xl md:text-5xl font-[1000] tracking-[calc(-0.05em)] text-[var(--color-text-main)] drop-shadow-[0_0_20px_var(--color-accent-glow)] group-hover:scale-110 transition-transform italic">
              meh.movies
            </span>
            <div class="hidden md:flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-text-muted)]">premium brain rot</span>
              <span class="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-accent)]">certified fresh 💅</span>
            </div>
          </NuxtLink>
          
          <div class="flex items-center gap-6">
            <NuxtLink to="/search" class="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-main)] px-6 py-3 bg-[var(--color-surface-pill)] rounded-full border border-[var(--color-border-subtle)] hover:bg-white hover:text-black transition-all shadow-xl">
              Discovery 🔍
            </NuxtLink>
            <button @click="toggleDark" class="w-14 h-14 flex items-center justify-center rounded-3xl bg-[var(--color-surface-pill)] hover:bg-white hover:text-black border border-[var(--color-border-subtle)] transition-all active:scale-50 shadow-2xl text-2xl" aria-label="Toggle vibe">
              <span v-if="isDark">🧪</span>
              <span v-else>🔮</span>
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-6xl mx-auto p-4 py-12 relative z-10">
        <!-- Glassy Content Container - Tinted by Vibe -->
        <div class="bg-[var(--color-surface-base)] backdrop-blur-3xl rounded-[60px] border-2 border-[var(--color-border-subtle)] shadow-[0_40px_100px_-12px_rgba(0,0,0,0.8)] p-6 md:p-12 text-[var(--color-text-main)] min-h-[80vh] relative overflow-hidden">
          <!-- Interior decorative line -->
          <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border-bold)] to-transparent opacity-50"></div>
          <NuxtPage />
        </div>
      </main>

      <footer class="mt-10 pb-20 text-center relative z-10">
        <div class="inline-flex flex-col items-center gap-2">
          <div class="flex items-center gap-2 px-10 py-5 bg-[var(--color-surface-base)] backdrop-blur-2xl rounded-[32px] border-2 border-[var(--color-border-subtle)] text-[var(--color-text-main)] font-[1000] text-[10px] uppercase tracking-[0.5em] shadow-2xl">
            <span>© 2026 meh.movies</span>
            <span class="w-3 h-3 bg-[var(--color-accent)] rounded-full animate-ping shadow-[0_0_15px_var(--color-accent-glow)]"></span>
            <span>strictly for the vibes. no cap.</span>
          </div>
          <p class="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.4em] mt-6">built different with nuxt 3 & claude 3.5</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Vibe A: Sunset Maximalism (LIGHT / High Energy) */
  --bg-main: linear-gradient(135deg, #fdf4ff 0%, #fbcfe8 50%, #ffedd5 100%);
  --accent-gradient: linear-gradient(90deg, #db2777 0%, #ea580c 100%);
  --color-accent: #db2777;
  --color-accent-glow: rgba(219, 39, 119, 0.3);
  
  /* Semantic Surfaces (Bright Glass) */
  --color-surface-base: rgba(255, 255, 255, 0.85);
  --color-surface-glass: rgba(255, 255, 255, 0.4);
  --color-surface-pill: rgba(0, 0, 0, 0.05);
  --color-border-subtle: rgba(0, 0, 0, 0.1);
  --color-border-bold: rgba(219, 39, 119, 0.4);
  
  /* Text Tints (Dark for Light Mode) */
  --color-text-main: #1e1b4b;
  --color-text-muted: #4b5563;
  --color-text-dark: #ffffff;
  --color-discovery-via: #f97316; /* Orange center for light mode gradient */
  --shadow-discovery: 0 0 20px rgba(219, 39, 119, 0.2);

  /* Ambient Blobs (Punchy Pastel) */
  --blob-1: rgba(219, 39, 119, 0.2);
  --blob-2: rgba(245, 158, 11, 0.2);
  --blob-3: rgba(168, 85, 247, 0.2);
}

.dark {
  /* Vibe B: Acid Cyber (DARK / Neon) */
  --bg-main: linear-gradient(135deg, #020617 0%, #064e3b 50%, #1e1b4b 100%);
  --accent-gradient: linear-gradient(90deg, #4ade80 0%, #22d3ee 100%);
  --color-accent: #4ade80;
  --color-accent-glow: rgba(74, 222, 128, 0.6);
  
  /* Semantic Surfaces (Deep Teal Tint) */
  --color-surface-base: rgba(2, 6, 23, 0.85);
  --color-surface-glass: rgba(6, 182, 212, 0.1);
  --color-surface-pill: rgba(255, 255, 255, 0.05);
  --color-border-subtle: rgba(255, 255, 255, 0.1);
  --color-border-bold: rgba(74, 222, 128, 0.5);
  
  /* Text Tints (Bright for Dark Mode) */
  --color-text-main: #f0fdfa;
  --color-text-muted: #94a3b8;
  --color-text-dark: #022c22;
  --color-discovery-via: #ffffff; /* White center for dark mode gradient */
  --shadow-discovery: 0 0 40px rgba(255, 255, 255, 0.4);

  /* Ambient Blobs (Neon) */
  --blob-1: rgba(34, 197, 94, 0.4);
  --blob-2: rgba(6, 182, 212, 0.3);
  --blob-3: rgba(168, 85, 247, 0.2);
}

/* Base resets */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #f8fafc;
  color: var(--color-text-main);
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-bold) transparent;
}

.dark body {
  background-color: #000;
}

/* Transitions - smooth but impactful */
* {
  transition: background-color 0.6s ease, 
              border-color 0.6s ease, 
              color 0.3s ease,
              transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--accent-gradient);
  border-radius: 20px;
  border: 3px solid transparent;
  background-clip: padding-box;
}

h1, h2, h3 { letter-spacing: -0.04em; }
</style>
