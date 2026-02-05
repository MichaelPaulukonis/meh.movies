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
    <section class="mb-16">
      <h1 class="text-5xl md:text-7xl font-[1000] mb-6 tracking-tighter leading-[0.9] text-[var(--color-text-main)]">
        what's the <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-discovery-via)] to-[var(--color-accent)] px-2" :style="{ filter: 'drop-shadow(' + 'var(--shadow-discovery)' + ')' }">vibe</span> today?
      </h1>
      <p class="text-[var(--color-text-muted)] mb-10 max-w-xl text-lg font-medium italic">
        👉 pick a mood and let the AI choose your next movie so you don't have to think. thinking is mid.
      </p>
      
      <div class="flex flex-wrap gap-4">
        <button 
          v-for="m in moods" 
          :key="m.label"
          @click="findMovieByMood(m.label)"
          class="flex items-center gap-3 px-8 py-4 rounded-3xl border-2 transition-all active:scale-95 group relative overflow-hidden"
          :class="selectedMood === m.label 
            ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.6)]' 
            : 'bg-black/40 text-white border-white/30 hover:border-white/60 hover:bg-white/10'"
        >
          <span class="text-3xl group-hover:rotate-12 transition-transform">{{ m.emoji }}</span>
          <span class="text-sm font-[1000] uppercase tracking-[0.1em]">{{ m.label }}</span>
          
          <!-- Selected indicator glow -->
          <div v-if="selectedMood === m.label" class="absolute inset-0 bg-[var(--color-accent)] opacity-20 pointer-events-none"></div>
        </button>
      </div>
    </section>

    <!-- Recommendations Section -->
    <transition name="pop">
      <section v-if="selectedMood || loadingRecs" class="mb-24 p-10 rounded-[40px] bg-black/60 backdrop-blur-xl border-2 border-white/20 relative overflow-hidden shadow-2xl">
        <!-- Floating Glow -->
        <div class="absolute -top-20 -right-20 w-80 h-80 bg-blue-500 opacity-20 blur-[100px] rounded-full animate-pulse"></div>
        
        <div v-if="loadingRecs" class="flex flex-col items-center py-16">
          <div class="text-6xl mb-8 animate-spin-slow text-white">🌀</div>
          <p class="text-2xl font-[1000] uppercase tracking-[0.4em] text-white italic">oracle is cooking...</p>
        </div>
        
        <div v-else-if="recommendations.length > 0">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 class="text-4xl md:text-5xl font-[1000] tracking-tighter leading-none italic text-white">
              curated <span class="text-[var(--color-accent)]">serves</span>
            </h2>
            <div class="px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg transform -rotate-2 shadow-[0_0_20px_var(--color-accent-glow)]">
              {{ selectedMood }} vibe detected
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RecommendationCard 
              v-for="movie in recommendations" 
              :key="movie.movieId" 
              :movie="movie" 
            />
          </div>
        </div>
        
        <div v-else class="text-center py-12 text-white/60 font-bold italic uppercase tracking-widest">
          no recommendations yet. have you enriched your data? 🤨
        </div>
      </section>
    </transition>

    <section>
      <div class="flex items-center gap-6 mb-12">
        <h2 class="text-2xl font-black uppercase tracking-[0.2em] whitespace-nowrap text-white/90">recent scrolls</h2>
        <div class="h-[2px] w-full bg-white/20 rounded-full"></div>
      </div>
      
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="aspect-[2/3] bg-white/5 rounded-[50px] animate-pulse border border-white/10"></div>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
        <MovieCard 
          v-for="movie in movies" 
          :key="movie.movieId" 
          :movie="movie" 
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.pop-enter-active, .pop-leave-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(40px);
}

.animate-spin-slow {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>