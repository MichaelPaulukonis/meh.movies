<script setup lang="ts">
const route = useRoute()
const { data: movie, error } = await useFetch(`/api/movies/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Movie vanished 💨' })
}
</script>

<template>
  <div v-if="movie" class="max-w-5xl mx-auto">
    <NuxtLink to="/" class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-white/60 hover:text-white transition-colors group">
      <span class="group-hover:-translate-x-2 transition-transform">←</span> back to scrolls
    </NuxtLink>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
      <div class="md:col-span-4">
        <div class="aspect-[2/3] bg-black/60 backdrop-blur-xl rounded-[40px] border-2 border-white/20 flex items-center justify-center text-8xl font-[1000] text-white/10 shadow-2xl relative overflow-hidden group">
          {{ movie.title[0] }}
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
      
      <div class="md:col-span-8 flex flex-col justify-center">
        <div class="flex flex-wrap gap-2 mb-6">
          <span v-for="genre in movie.genres?.split(',')" :key="genre" class="text-[9px] font-[1000] uppercase tracking-[0.2em] bg-white text-black px-3 py-1.5 rounded-lg">
            {{ genre.trim() }}
          </span>
        </div>
        <h1 class="text-6xl md:text-8xl font-[1000] mb-6 tracking-tighter leading-[0.85] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] italic">
          {{ movie.title }}
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-10 leading-tight font-medium italic max-w-2xl">
          {{ movie.overview }}
        </p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-black/40 backdrop-blur rounded-[32px] border-2 border-white/20 shadow-xl">
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Released</span>
            <span class="font-black text-sm text-white">{{ movie.releaseDate }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Length</span>
            <span class="font-black text-sm text-white">{{ movie.runtime }}m</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Status</span>
            <span class="font-black text-sm text-white">{{ movie.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Enriched Data Section -->
    <section class="bg-black/60 backdrop-blur-2xl rounded-[60px] border-2 border-white/20 p-8 md:p-20 mb-24 relative overflow-hidden shadow-3xl">
      <!-- Decor Glow -->
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20 relative z-10">
        <h2 class="text-5xl md:text-7xl font-[1000] tracking-tighter leading-none italic text-white">
          the <span class="text-yellow-400">extra</span> stuff
        </h2>
        <div class="inline-block bg-white text-black text-[10px] font-[1000] px-6 py-3 rounded-2xl transform rotate-3 shadow-2xl tracking-[0.3em] uppercase">
          AI Enriched fr fr
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        <div>
          <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-10 flex items-center gap-4 italic">
            vibe check #moods
          </h3>
          <div class="flex flex-wrap gap-4">
            <span v-for="tag in movie.vibe_tags" :key="tag" class="px-8 py-4 bg-white/10 rounded-[2rem] border-2 border-white/20 text-base font-black italic text-white hover:border-white transition-all cursor-default shadow-lg">
              {{ tag }}
            </span>
            <span v-if="!movie.vibe_tags?.length" class="text-white/40 font-[1000] uppercase tracking-widest text-sm">No vibes found. Major L.</span>
          </div>
        </div>

        <div>
          <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-10 flex items-center gap-4 italic">
            gen-z approved #slang
          </h3>
          <div class="flex flex-wrap gap-4">
            <span v-for="tag in movie.genz_tags" :key="tag" class="px-8 py-4 bg-yellow-400 text-black rounded-[2rem] text-sm font-[1000] uppercase tracking-widest hover:scale-110 hover:rotate-2 transition-all cursor-default shadow-2xl">
              #{{ tag }}
            </span>
          </div>
        </div>

        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-12 p-12 bg-white/5 rounded-[50px] border-2 border-white/10 shadow-inner">
          <div class="text-center md:border-r border-white/20 flex flex-col justify-center py-6">
            <div class="text-8xl font-[1000] mb-2 text-white leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              {{ movie.genre_blend_score || '??' }}%
            </div>
            <div class="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Genre Blend Score</div>
          </div>
          <div class="md:col-span-2 flex flex-col justify-center px-4">
            <h4 class="font-black mb-4 text-[10px] uppercase tracking-[0.5em] text-yellow-400">watch with who?</h4>
            <p class="font-black text-3xl md:text-4xl italic leading-[0.9] text-white tracking-tighter">"{{ movie.watch_with_who || 'Anyone who isn\'t mid.' }}"</p>
          </div>
        </div>

        <div class="lg:col-span-2 pt-10">
          <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-12 flex items-center gap-4 italic">
            frequency arcs 🔗
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div v-for="(chain, cIndex) in movie.recommendation_chains" :key="cIndex" class="space-y-6">
              <h4 class="text-[10px] font-black uppercase tracking-widest text-black bg-white px-6 py-2 rounded-full w-max mx-auto md:mx-0 shadow-2xl">
                {{ cIndex === 0 ? 'Intensity' : cIndex === 1 ? 'Cross-Genre' : 'Wavelength' }}
              </h4>
              <div class="space-y-4">
                <div v-for="(rec, rIndex) in chain" :key="rec" class="p-6 rounded-[32px] border-2 border-white/10 text-sm font-black bg-white/10 text-white hover:bg-white hover:text-black transition-all text-center md:text-left hover:scale-[1.05] group/item shadow-lg">
                  <span class="opacity-40 group-hover/item:opacity-60 mr-2 text-[10px] font-black italic">{{ rIndex + 1 }}.</span> {{ rec }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Thematic Keywords -->
    <section class="mb-32 text-center relative py-20">
      <div class="absolute inset-0 bg-white/10 backdrop-blur-sm -rotate-1 rounded-[100px] border-2 border-white/5"></div>
      <h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-12 relative z-10">thematic keywords</h3>
      <div class="flex flex-wrap justify-center gap-x-12 gap-y-8 relative z-10 px-8">
        <span v-for="kw in movie.thematic_keywords" :key="kw" class="text-3xl md:text-5xl font-[1000] text-white opacity-20 hover:opacity-100 hover:scale-110 transition-all cursor-default select-none tracking-tighter italic">
          {{ kw }}
        </span>
      </div>
    </section>
  </div>
</template>
