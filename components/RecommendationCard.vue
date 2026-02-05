<script setup lang="ts">
interface RecommendedMovie {
  movieId: number | string;
  title: string;
  reasoning: string;
}

defineProps<{
  movie: RecommendedMovie;
}>();
</script>

<template>
  <NuxtLink 
    :to="`/movie/${movie.movieId}`" 
    class="bg-white/10 p-8 rounded-[32px] border border-white/20 hover:border-white/60 hover:bg-white hover:text-black transition-all group relative"
  >
    <div class="relative z-10">
      <h3 class="font-[1000] text-3xl mb-3 tracking-tighter group-hover:scale-[1.02] transition-transform">{{ movie.title }}</h3>
      <p class="text-white/80 group-hover:text-black/90 text-base mb-8 leading-tight font-medium italic">"{{ movie.reasoning }}"</p>
      <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
        View Deets <span>→</span>
      </div>
    </div>
  </NuxtLink>
</template>
