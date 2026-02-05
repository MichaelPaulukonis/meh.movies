<script setup lang="ts">
const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <div :class="{ 'dark': isDark }">
    <div class="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      <header class="border-b border-zinc-200 dark:border-zinc-800 p-4 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur z-50">
        <div class="max-w-5xl mx-auto flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
            meh.movies <span class="text-sm font-normal text-zinc-500 ml-2">it's whatever tbh 🙄</span>
          </NuxtLink>
          
          <div class="flex items-center gap-6">
            <NuxtLink to="/search" class="text-sm font-medium hover:underline decoration-2 underline-offset-4">Discovery</NuxtLink>
            <button @click="toggleDark" class="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors" aria-label="Toggle dark mode">
              <span v-if="isDark">☀️</span>
              <span v-else>🌙</span>
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-5xl mx-auto p-4 py-8">
        <NuxtPage />
      </main>

      <footer class="mt-20 border-t border-zinc-200 dark:border-zinc-800 p-8 text-center text-zinc-500 text-sm">
        <p>© 2026 meh.movies — strictly for the vibes. no cap.</p>
      </footer>
    </div>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-zinc-950: #09090b;
}

body {
  margin: 0;
  padding: 0;
}
</style>
