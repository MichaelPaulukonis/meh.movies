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
      <h1 class="text-5xl md:text-7xl font-[1000] mb-6 tracking-tighter leading-[0.9]">
        what's the <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">vibe</span> today?
      </h1>
      <p class="text-white/80 mb-10 max-w-xl text-lg font-medium italic">
        👉 pick a mood and let claude 3.5 pick your next movie so you don't have to think. thinking is mid.
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
          <div v-if="selectedMood === m.label" class="absolute inset-0 bg-gradient-to-tr from-yellow-400/30 to-transparent pointer-events-none"></div>
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
              curated <span class="text-yellow-400">serves</span>
            </h2>
            <div class="px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg transform -rotate-2">
              {{ selectedMood }} vibe detected
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NuxtLink v-for="movie in recommendations" :key="movie.movieId" :to="`/movie/${movie.movieId}`" 
              class="bg-white/10 p-8 rounded-[32px] border border-white/20 hover:border-white/60 hover:bg-white hover:text-black transition-all group relative">
              <div class="relative z-10">
                <h3 class="font-[1000] text-3xl mb-3 tracking-tighter group-hover:scale-[1.02] transition-transform">{{ movie.title }}</h3>
                <p class="text-white/80 group-hover:text-black/90 text-base mb-8 leading-tight font-medium italic">"{{ movie.reasoning }}"</p>
                <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                  View Deets <span>→</span>
                </div>
              </div>
            </NuxtLink>
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
        <NuxtLink 
          v-for="movie in movies" 
          :key="movie.movieId" 
          :to="`/movie/${movie.movieId}`"
          class="group block relative"
        >
          <div class="aspect-[2/3] bg-white/10 rounded-[50px] mb-8 overflow-hidden relative border-2 border-white/20 group-hover:border-white/60 transition-all duration-500 shadow-2xl group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] group-hover:-translate-y-4">
            
            <!-- Dynamic Color Overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-20"></div>

            <!-- Poster Overlay -->
            <div class="absolute inset-0 p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black via-black/60 to-transparent z-30">
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tag in movie.vibe_tags?.slice(0, 2)" :key="tag" class="text-[10px] font-[1000] uppercase tracking-widest bg-yellow-400 text-black px-3 py-1.5 rounded-lg shadow-xl">#{{ tag }}</span>
              </div>
              <p class="text-sm font-black leading-tight text-white line-clamp-4 italic drop-shadow-lg">{{ movie.overview }}</p>
            </div>

            <!-- Poster Placeholder -->
            <div class="h-full w-full flex items-center justify-center text-white/10 font-[1000] text-[12rem] absolute inset-0 z-10 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 group-hover:text-white/20">
              {{ movie.title[0] }}
            </div>
            
            <!-- Glassy Shine -->
            <div class="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none z-10"></div>
          </div>

          <div class="px-4 text-white">
            <h3 class="font-[1000] text-4xl md:text-5xl leading-[0.8] mb-4 tracking-tighter italic group-hover:text-yellow-400 transition-colors duration-300">{{ movie.title }}</h3>
            <div class="flex items-center gap-4">
              <span class="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 px-3 py-1 bg-white/10 border border-white/20 rounded-full">
                {{ movie.releaseDate?.split('-')[0] }}
              </span>
              <span class="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                {{ movie.runtime }}m
              </span>
            </div>
          </div>
        </NuxtLink>
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