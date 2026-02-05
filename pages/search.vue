<script setup lang="ts">
const query = ref('')
const loading = ref(false)
const results = ref([])
const errorMsg = ref('')

const handleSearch = async () => {
  if (!query.value.trim()) return
  
  loading.value = true
  errorMsg.value = ''
  results.value = []
  
  try {
    const { data } = await useFetch('/api/recommendations', {
      method: 'POST',
      body: { mood: query.value }
    })
    
    results.value = data.value?.recommendations || []
    if (results.value.length === 0) {
      errorMsg.value = "Couldn't find anything matching that vibe. Try something else?"
    }
  } catch (e) {
    errorMsg.value = "Claude is having a moment. Try again later."
    console.error(e)
  } finally {
    loading.value = false
  }
}

const suggestions = [
  "movies for when i'm feeling main character energy",
  "cozy movies for a rainy night with tea",
  "chaotic energy high stakes thrillers",
  "brain rot comedies to turn off my mind",
  "melancholy indies that make me contemplate life"
]

const useSuggestion = (s: string) => {
  query.value = s
  handleSearch()
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-12">
    <div class="text-center mb-20 relative text-[var(--color-text-main)]">
      <h1 class="text-7xl md:text-9xl font-[1000] mb-6 tracking-tighter italic leading-none overflow-visible" :style="{ filter: 'drop-shadow(' + 'var(--shadow-discovery)' + ')' }">
        vibe <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-discovery-via)] to-[var(--color-accent)] px-4">discovery</span>
      </h1>
      <div class="flex items-center justify-center gap-4">
        <div class="h-[1px] w-12 bg-[var(--color-text-main)] opacity-30"></div>
        <p class="text-[var(--color-text-muted)] font-black uppercase tracking-[0.4em] text-[9px] whitespace-nowrap">
          input ur text below for matching
        </p>
        <div class="h-[1px] w-12 bg-[var(--color-text-main)] opacity-30"></div>
      </div>
    </div>
    
    <div class="relative mb-16 group">
      <input 
        v-model="query"
        @keyup.enter="handleSearch"
        type="text" 
        placeholder="Show me cozy movies for a rainy night..."
        class="w-full bg-black/60 backdrop-blur-xl border-2 border-white/20 rounded-3xl px-8 py-8 text-xl md:text-2xl focus:outline-none focus:border-white focus:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all placeholder:text-white/30 text-white font-medium"
      />
      <button 
        @click="handleSearch"
        :disabled="loading"
        class="absolute right-4 top-4 bottom-4 bg-white text-black px-8 rounded-2xl font-[1000] uppercase tracking-widest text-sm hover:scale-[1.05] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-2xl"
      >
        <span v-if="loading" class="animate-spin inline-block mr-2 text-black">🌀</span>
        {{ loading ? 'WAIT' : 'Search' }}
      </button>
    </div>

    <div v-if="!loading && results.length === 0" class="mb-12">
      <p class="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6 text-center italic">or try these frequency arcs:</p>
      <div class="flex flex-wrap justify-center gap-3">
        <button 
          v-for="s in suggestions" 
          :key="s"
          @click="useSuggestion(s)"
          class="text-[10px] font-black uppercase tracking-widest px-5 py-3 bg-white/10 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all active:scale-90 shadow-lg"
        >
          "{{ s }}"
        </button>
      </div>
    </div>

    <div v-if="loading" class="space-y-6">
      <div v-for="i in 3" :key="i" class="h-40 bg-white/10 rounded-3xl animate-pulse border border-white/20"></div>
    </div>

    <div v-if="errorMsg" class="text-center p-10 bg-red-500/20 border-2 border-red-500/40 text-red-200 rounded-[32px] font-black uppercase tracking-widest text-sm italic">
      💀 {{ errorMsg }}
    </div>

    <transition-group name="pop" tag="div" v-if="results.length > 0" class="space-y-8">
      <SearchRecommendationCard 
        v-for="movie in results" 
        :key="movie.movieId" 
        :movie="movie" 
      />
    </transition-group>
  </div>
</template>

<style scoped>
.pop-enter-active, .pop-leave-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.9) translateX(-50px);
}
</style>
