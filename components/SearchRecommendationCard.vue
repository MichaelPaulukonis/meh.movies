<script setup lang="ts">
interface RecommendedMovie {
  movieId: number | string;
  title: string;
  reasoning: string;
  releaseDate?: string;
  genres?: string;
}

defineProps<{
  movie: RecommendedMovie;
}>();
</script>

<template>
  <NuxtLink 
    :to="`/movie/${movie.movieId}`"
    class="flex flex-col md:flex-row md:items-center gap-10 p-10 bg-black/60 backdrop-blur-xl rounded-[40px] border-2 border-white/20 hover:border-white hover:bg-white hover:text-black transition-all group relative overflow-hidden shadow-2xl"
  >
    <div class="w-full md:w-32 aspect-[2/3] bg-white/10 rounded-3xl flex-shrink-0 flex items-center justify-center font-[1000] text-6xl text-white/20 border border-white/10 group-hover:scale-110 group-hover:text-black/10 transition-transform duration-500">
      {{ movie.title[0] }}
    </div>
    <div class="relative z-10 flex-1">
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-if="movie.releaseDate" class="text-[9px] font-black uppercase tracking-widest bg-[var(--color-accent)] text-black px-2 py-1 rounded-sm shadow-lg">
          {{ movie.releaseDate.split('-')[0] }}
        </span>
        <span v-if="movie.genres" class="text-[9px] font-black uppercase tracking-widest border border-white/30 group-hover:border-black/30 px-2 py-1 rounded-sm text-white group-hover:text-black transition-colors">
          {{ movie.genres }}
        </span>
      </div>
      <h2 class="text-4xl md:text-5xl font-[1000] group-hover:text-black mb-4 tracking-tighter leading-none italic text-white">{{ movie.title }}</h2>
      <p class="text-white/80 group-hover:text-black/80 text-lg italic leading-tight font-medium">"{{ movie.reasoning }}"</p>
    </div>
    
    <!-- Hover indicator -->
    <div class="hidden md:flex items-center justify-center w-16 h-12 rounded-2xl bg-white/10 group-hover:bg-black/10 transition-colors">
      <span class="text-2xl group-hover:translate-x-2 transition-transform text-white group-hover:text-black">→</span>
    </div>
  </NuxtLink>
</template>
