<script setup lang="ts">
interface Movie {
  movieId: number | string;
  title: string;
  overview?: string;
  releaseDate?: string;
  runtime?: number | string;
  vibe_tags?: string[];
  genz_tags?: string[];
}

defineProps<{
  movie: Movie;
}>();
</script>

<template>
  <NuxtLink 
    :to="`/movie/${movie.movieId}`"
    class="group block relative"
  >
    <div class="aspect-[2/3] bg-[var(--color-surface-glass)] rounded-[50px] mb-8 overflow-hidden relative border-2 border-[var(--color-border-subtle)] group-hover:border-[var(--color-accent)] transition-all duration-500 shadow-2xl group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] group-hover:-translate-y-4">
      
      <!-- Dynamic Color Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-20"></div>

      <!-- Poster Overlay -->
      <div class="absolute inset-0 p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black via-black/60 to-transparent z-30">
        <div class="flex flex-wrap gap-2 mb-6">
          <span v-for="tag in movie.vibe_tags?.slice(0, 2)" :key="tag" class="text-[10px] font-[1000] uppercase tracking-widest bg-[var(--color-accent)] text-[var(--color-text-dark)] px-3 py-1.5 rounded-lg shadow-xl">#{{ tag }}</span>
        </div>
        <p class="text-sm font-black leading-tight text-white line-clamp-4 italic drop-shadow-lg">{{ movie.overview }}</p>
      </div>

      <!-- Poster Placeholder -->
      <div class="h-full w-full flex items-center justify-center text-[var(--color-text-main)] opacity-10 font-[1000] text-[12rem] absolute inset-0 z-10 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 group-hover:opacity-20">
        {{ movie.title[0] }}
      </div>
      
      <!-- Glassy Shine -->
      <div class="absolute inset-0 bg-gradient-to-tr from-[var(--color-text-main)] opacity-10 via-transparent to-transparent pointer-events-none z-10"></div>
    </div>

    <div class="px-4">
      <h3 class="font-[1000] text-4xl md:text-5xl leading-[0.8] mb-4 tracking-tighter italic text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors duration-300 line-clamp-2">
        {{ movie.title }}
      </h3>
      <div class="flex items-center gap-4">
        <span v-if="movie.releaseDate" class="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-main)] px-3 py-1 bg-[var(--color-surface-pill)] border border-[var(--color-border-subtle)] rounded-full">
          {{ movie.releaseDate.split('-')[0] }}
        </span>
        <span v-if="movie.runtime" class="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
          {{ movie.runtime }}m
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
