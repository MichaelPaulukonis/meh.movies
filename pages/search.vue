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
    <h1 class="text-5xl font-black mb-12 tracking-tight text-center">vibe discovery 🔍</h1>
    
    <div class="relative mb-12">
      <input 
        v-model="query"
        @keyup.enter="handleSearch"
        type="text" 
        placeholder="Show me cozy movies for a rainy night..."
        class="w-full bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl px-8 py-6 text-xl focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-all placeholder:text-zinc-400"
      />
      <button 
        @click="handleSearch"
        :disabled="loading"
        class="absolute right-4 top-4 bottom-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
      >
        {{ loading ? '...' : 'Search' }}
      </button>
    </div>

    <div v-if="!loading && results.length === 0" class="mb-12">
      <p class="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 text-center">or try these:</p>
      <div class="flex flex-wrap justify-center gap-2">
        <button 
          v-for="s in suggestions" 
          :key="s"
          @click="useSuggestion(s)"
          class="text-xs font-bold px-4 py-2 bg-zinc-50 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all"
        >
          "{{ s }}"
        </button>
      </div>
    </div>

    <div v-if="loading" class="space-y-6">
      <div v-for="i in 3" :key="i" class="h-32 bg-zinc-100 dark:bg-zinc-900 rounded-3xl animate-pulse"></div>
    </div>

    <div v-if="errorMsg" class="text-center p-8 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-3xl font-bold">
      {{ errorMsg }}
    </div>

    <div v-if="results.length > 0" class="space-y-6">
      <NuxtLink 
        v-for="movie in results" 
        :key="movie.movieId" 
        :to="`/movie/${movie.movieId}`"
        class="flex items-center gap-6 p-6 bg-white dark:bg-zinc-950 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all group shadow-sm"
      >
        <div class="w-20 h-28 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-2xl text-zinc-300 dark:text-zinc-700">
          {{ movie.title[0] }}
        </div>
        <div>
          <h2 class="text-2xl font-black group-hover:underline decoration-4 underline-offset-4 mb-2">{{ movie.title }}</h2>
          <p class="text-sm text-zinc-500 italic mb-1">"{{ movie.reasoning }}"</p>
          <div class="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {{ movie.releasedate?.split('-')[0] }} • {{ movie.genres }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
