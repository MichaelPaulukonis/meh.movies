<script setup lang="ts">
const route = useRoute()
const { data: movie, error } = await useFetch(`/api/movies/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Movie vanished 💨' })
}
</script>

<template>
  <div v-if="movie" class="max-w-5xl mx-auto">
    <NuxtLink to="/" class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors group">
      <span class="group-hover:-translate-x-2 transition-transform">←</span> back to scrolls
    </NuxtLink>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
      <div class="md:col-span-4">
        <div class="aspect-[2/3] bg-[var(--color-surface-glass)] backdrop-blur-xl rounded-[40px] border-2 border-[var(--color-border-subtle)] flex items-center justify-center text-8xl font-[1000] text-white/10 shadow-2xl relative overflow-hidden group">
          {{ movie.title[0] }}
          <div class="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </div>
      </div>
      
      <div class="md:col-span-8 flex flex-col justify-center">
        <div class="flex flex-wrap gap-2 mb-6">
          <span v-for="genre in movie.genres?.split(',')" :key="genre" class="text-[9px] font-[1000] uppercase tracking-[0.2em] bg-[var(--color-text-main)] text-[var(--color-text-dark)] px-3 py-1.5 rounded-lg">
            {{ genre.trim() }}
          </span>
        </div>
        <h1 class="text-6xl md:text-8xl font-[1000] mb-6 tracking-tighter leading-[0.85] text-[var(--color-text-main)] drop-shadow-[0_0_30px_var(--color-accent-glow)] italic">
          {{ movie.title }}
        </h1>
        <p class="text-xl md:text-2xl text-[var(--color-text-muted)] mb-10 leading-tight font-medium italic max-w-2xl">
          {{ movie.overview }}
        </p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-[var(--color-surface-glass)] backdrop-blur rounded-[32px] border-2 border-[var(--color-border-subtle)] shadow-xl text-[var(--color-text-main)]">
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-black text-[var(--color-text-muted)] opacity-50 uppercase tracking-widest">Released</span>
            <span class="font-black text-sm">{{ movie.releaseDate }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-black text-[var(--color-text-muted)] opacity-50 uppercase tracking-widest">Length</span>
            <span class="font-black text-sm">{{ movie.runtime }}m</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-black text-[var(--color-text-muted)] opacity-50 uppercase tracking-widest">Status</span>
            <span class="font-black text-sm">{{ movie.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Enriched Data Section -->
    <section class="bg-[var(--color-surface-base)] backdrop-blur-2xl rounded-[60px] border-2 border-[var(--color-border-subtle)] p-8 md:p-20 mb-24 relative overflow-hidden shadow-3xl">
      <!-- Decor Glow -->
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-accent)] opacity-10 blur-[120px] rounded-full animate-pulse"></div>
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20 relative z-10">
        <h2 class="text-5xl md:text-7xl font-[1000] tracking-tighter leading-none italic text-[var(--color-text-main)]">
          the <span class="text-[var(--color-accent)]">extra</span> stuff
        </h2>
        <div class="inline-block bg-[var(--color-text-main)] text-[var(--color-text-dark)] text-[10px] font-[1000] px-6 py-3 rounded-2xl transform rotate-3 shadow-[0_0_30px_var(--color-accent-glow)] tracking-[0.3em] uppercase">
          AI Enriched fr fr
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        <div>
          <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] mb-10 flex items-center gap-4 italic">
            vibe check #moods
          </h3>
          <div class="flex flex-wrap gap-4">
            <span v-for="tag in movie.vibe_tags" :key="tag" class="px-8 py-4 bg-[var(--color-surface-pill)] rounded-[2rem] border-2 border-[var(--color-border-subtle)] text-base font-black italic text-[var(--color-text-main)] hover:border-[var(--color-accent)] transition-all cursor-default shadow-lg">
              {{ tag }}
            </span>
            <span v-if="!movie.vibe_tags?.length" class="text-[var(--color-text-muted)] font-[1000] uppercase tracking-widest text-sm">No vibes found. Major L.</span>
          </div>
        </div>

        <div>
          <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] mb-10 flex items-center gap-4 italic">
            gen-z approved #slang
          </h3>
          <div class="flex flex-wrap gap-4">
            <span v-for="tag in movie.genz_tags" :key="tag" class="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-dark)] rounded-[2rem] text-sm font-[1000] uppercase tracking-widest hover:scale-110 hover:rotate-2 transition-all cursor-default shadow-2xl">
              #{{ tag }}
            </span>
          </div>
        </div>

        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-12 p-12 bg-[var(--color-surface-glass)] rounded-[50px] border-2 border-[var(--color-border-subtle)] shadow-inner">
          <div class="text-center md:border-r border-[var(--color-border-subtle)] flex flex-col justify-center py-6">
            <div class="text-8xl font-[1000] mb-2 text-[var(--color-text-main)] leading-none drop-shadow-[0_0_30px_var(--color-accent-glow)]">
              {{ movie.genre_blend_score || '??' }}%
            </div>
            <div class="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-[0.4em]">Genre Blend Score</div>
          </div>
          <div class="md:col-span-2 flex flex-col justify-center px-4 text-[var(--color-text-main)]">
            <h4 class="font-black mb-4 text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)]">watch with who?</h4>
            <p class="font-black text-3xl md:text-4xl italic leading-[0.9] tracking-tighter">"{{ movie.watch_with_who || 'Anyone who isn\'t mid.' }}"</p>
          </div>
        </div>

        <div class="lg:col-span-2 pt-10">
          <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] mb-12 flex items-center gap-4 italic">
            frequency arcs 🔗
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div v-for="(chain, cIndex) in movie.recommendation_chains" :key="cIndex" class="space-y-6">
              <h4 class="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-dark)] bg-[var(--color-text-main)] px-6 py-2 rounded-full w-max mx-auto md:mx-0 shadow-2xl">
                {{ cIndex === 0 ? 'Intensity' : cIndex === 1 ? 'Cross-Genre' : 'Wavelength' }}
              </h4>
              <div class="space-y-4">
                <div v-for="(rec, rIndex) in chain" :key="rec" class="p-6 rounded-[32px] border-2 border-[var(--color-border-subtle)] text-sm font-black bg-[var(--color-surface-pill)] text-[var(--color-text-main)] hover:bg-[var(--color-text-main)] hover:text-[var(--color-text-dark)] transition-all text-center md:text-left hover:scale-[1.05] group/item shadow-lg">
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
      <div class="absolute inset-0 bg-[var(--color-surface-glass)] backdrop-blur-sm -rotate-1 rounded-[100px] border-2 border-[var(--color-border-subtle)]"></div>
      <h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text-muted)] mb-12 relative z-10">thematic keywords</h3>
      <div class="flex flex-wrap justify-center gap-x-12 gap-y-8 relative z-10 px-8">
        <span v-for="kw in movie.thematic_keywords" :key="kw" class="text-3xl md:text-5xl font-[1000] text-[var(--color-text-main)] opacity-20 hover:opacity-100 hover:scale-110 transition-all cursor-default select-none tracking-tighter italic">
          {{ kw }}
        </span>
      </div>
    </section>
  </div>
</template>