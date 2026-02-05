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
    <div class="min-h-screen bg-[var(--bg-main)] font-sans transition-colors duration-300 selection:bg-yellow-400 selection:text-black overflow-hidden relative">
      
      <!-- Ambient Decorative Blobs -->
      <div class="absolute top-[-10%] -left-20 w-[500px] h-[500px] bg-purple-500/30 blur-[120px] rounded-full animate-pulse"></div>
      <div class="absolute bottom-[10%] -right-20 w-[400px] h-[400px] bg-yellow-500/20 blur-[100px] rounded-full animate-bounce" style="animation-duration: 10s"></div>
      <div class="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-blue-500/20 blur-[80px] rounded-full"></div>

      <!-- Sticky Header -->
      <header class="border-b border-white/30 p-6 sticky top-0 bg-black/40 backdrop-blur-2xl z-50">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <NuxtLink to="/" class="group flex items-center gap-3">
            <span class="text-4xl md:text-5xl font-[1000] tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform italic">
              meh.movies
            </span>
            <div class="hidden md:flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">premium brain rot</span>
              <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-300">certified fresh 💅</span>
            </div>
          </NuxtLink>
          
          <div class="flex items-center gap-6">
            <NuxtLink to="/search" class="text-xs font-black uppercase tracking-[0.2em] text-white px-4 py-2 bg-white/20 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all shadow-lg">
              Discovery 🔍
            </NuxtLink>
            <button @click="toggleDark" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 hover:bg-white hover:text-black border border-white/30 transition-all active:scale-75 shadow-xl" aria-label="Toggle dark mode">
              <span v-if="isDark">☀️</span>
              <span v-else>🌙</span>
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-6xl mx-auto p-4 py-12 relative z-10">
        <!-- Glassy Content Container - Darkened for better text contrast -->
        <div class="bg-black/40 backdrop-blur-3xl rounded-[48px] border-2 border-white/20 shadow-[0_40px_100px_-12px_rgba(0,0,0,0.7)] p-6 md:p-12 text-white min-h-[80vh] relative overflow-hidden">
          <!-- Interior decorative line -->
          <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <NuxtPage />
        </div>
      </main>

      <footer class="mt-10 pb-20 text-center relative z-10">
        <div class="inline-flex flex-col items-center gap-2">
          <div class="flex items-center gap-2 px-8 py-4 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/20 text-white font-[1000] text-[10px] uppercase tracking-[0.4em] shadow-2xl">
            <span>© 2026 meh.movies</span>
            <span class="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
            <span>strictly for the vibes. no cap.</span>
          </div>
          <p class="text-[10px] text-black/60 font-bold uppercase tracking-[0.3em] mt-4">built different with nuxt 3 & claude 3.5</p>
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
  /* Brand Gradients */
  --bg-main: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%);
  --accent-gradient: linear-gradient(90deg, #4ade80 0%, #3b82f6 100%);

  /* UI Surface Colors */
  --color-surface-card: #1a1618;
  --color-surface-input: #2a2426;
  --color-border: #3f3f46;

  /* Typography & Highlights */
  --color-text-bright: #ffffff;
  --color-text-dim: #a1a1aa;
  --neon-glow-blue: #93c5fd;
}

/* Base resets */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Custom Scrollbar because default is mid */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-surface-card);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #52525b;
}

/* Global Typography Adjustments */
h1, h2, h3 {
  letter-spacing: -0.02em;
}
</style>