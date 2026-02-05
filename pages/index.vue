<script setup lang="ts">
const { data: movies, pending } = await useFetch('/api/movies', {
  query: { limit: 12 }
})

const moods = [
  { emoji: '🫠', label: 'absolute brain rot' },
  { emoji: '✨', label: 'main character energy' },
  { emoji: '💀', label: 'dead inside but stylish' },
  { emoji: '🍄', label: 'cottagecore vibes only' },
  { emoji: '😤', label: 'academic weapon' },
  { emoji: '🥺', label: 'need a hug' }
]

const selectedMood = ref('')
const recommendations = ref([])
const loadingRecs = ref(false)

const findMovieByMood = async (mood: string) => {
  selectedMood.value = mood
  loadingRecs.value = true
  try {
    const { data } = await useFetch('/api/recommendations', {
      method: 'POST',
      body: { mood }
    })
    recommendations.value = data.value?.recommendations || []
  } catch (e) {
    console.error(e)
  } finally {
    loadingRecs.value = false
  }
}
</script>

<template>
  <div>
    <section class="mb-12">
      <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tight">what's the vibe today?</h1>
      <p class="text-zinc-500 mb-8 max-w-xl">pick a mood and let claude 3.5 pick your next movie so you don't have to think. thinking is mid.</p>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <button 
          v-for="m in moods" 
          :key="m.label"
          @click="findMovieByMood(m.label)"
          class="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all text-center group"
          :class="{ 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100': selectedMood === m.label }"
        >
          <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ m.emoji }}</span>
          <span class="text-xs font-bold leading-tight">{{ m.label }}</span>
        </button>
      </div>
    </section>

    <!-- Recommendations Section -->
    <section v-if="selectedMood || loadingRecs" class="mb-16 p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-700">
      <div v-if="loadingRecs" class="flex flex-col items-center py-10">
        <div class="animate-bounce text-4xl mb-4">🔮</div>
        <p class="animate-pulse">consulting the oracle... (claude is thinking fr)</p>
      </div>
      
      <div v-else-if="recommendations.length > 0">
        <h2 class="text-2xl font-black mb-6 flex items-center gap-2">
          <span>curated for your "{{ selectedMood }}" vibe</span>
          <span class="text-sm font-normal text-zinc-500">(100% no cap)</span>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="movie in recommendations" :key="movie.movieId" class="bg-white dark:bg-zinc-950 p-4 rounded-2xl shadow-sm">
            <h3 class="font-bold text-lg mb-1">{{ movie.title }}</h3>
            <p class="text-sm text-zinc-500 mb-4 italic">"{{ movie.reasoning }}"</p>
            <NuxtLink :to="`/movie/${movie.movieId}`" class="text-xs font-black uppercase tracking-widest hover:underline">View Deets →</NuxtLink>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-10 text-zinc-500">
        no recommendations yet. have you enriched your data? 🤨
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-black mb-8 tracking-tight">recent scrolls</h2>
      
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-3xl animate-pulse"></div>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="movie in movies" 
          :key="movie.movieId" 
          :to="`/movie/${movie.movieId}`"
          class="group block"
        >
          <div class="aspect-[2/3] bg-zinc-100 dark:bg-zinc-900 rounded-3xl mb-4 overflow-hidden relative">
            <div class="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-zinc-900/80 to-transparent text-white">
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="tag in movie.vibe_tags?.slice(0, 2)" :key="tag" class="text-[10px] bg-white/20 backdrop-blur px-2 py-0.5 rounded-full">#{{ tag }}</span>
              </div>
              <p class="text-xs line-clamp-2">{{ movie.overview }}</p>
            </div>
            <!-- Poster Placeholder -->
            <div class="h-full w-full flex items-center justify-center text-zinc-300 dark:text-zinc-700 font-black text-2xl group-hover:scale-105 transition-transform">
              {{ movie.title[0] }}
            </div>
          </div>
          <h3 class="font-black text-xl group-hover:underline decoration-4">{{ movie.title }}</h3>
          <p class="text-sm text-zinc-500">{{ movie.releaseDate?.split('-')[0] }} • {{ movie.runtime }}m</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
