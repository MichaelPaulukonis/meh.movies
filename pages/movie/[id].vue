<script setup lang="ts">
const route = useRoute()
const { data: movie, error } = await useFetch(`/api/movies/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Movie vanished 💨' })
}
</script>

<template>
  <div v-if="movie" class="max-w-4xl mx-auto">
    <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-bold mb-10 hover:underline">
      ← back to the feed
    </NuxtLink>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
      <div class="md:col-span-1">
        <div class="aspect-[2/3] bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] flex items-center justify-center text-6xl font-black text-zinc-300 dark:text-zinc-700 shadow-2xl">
          {{ movie.title[0] }}
        </div>
      </div>
      
      <div class="md:col-span-2">
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="genre in movie.genres?.split(',')" :key="genre" class="text-[10px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full">
            {{ genre }}
          </span>
        </div>
        <h1 class="text-5xl font-black mb-4 tracking-tight leading-none">{{ movie.title }}</h1>
        <p class="text-xl text-zinc-500 mb-8 leading-relaxed">{{ movie.overview }}</p>
        
        <div class="grid grid-cols-2 gap-8 py-8 border-y border-zinc-100 dark:border-zinc-800">
          <div>
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Release</span>
            <span class="font-bold">{{ movie.releasedate }}</span>
          </div>
          <div>
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Runtime</span>
            <span class="font-bold">{{ movie.runtime }} mins</span>
          </div>
          <div>
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Status</span>
            <span class="font-bold">{{ movie.status }}</span>
          </div>
          <div>
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Language</span>
            <span class="font-bold uppercase">{{ movie.language }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Enriched Data Section -->
    <section class="bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] p-8 md:p-12 mb-20">
      <div class="flex items-center gap-4 mb-12">
        <h2 class="text-3xl font-black tracking-tight">the "extra" stuff ✨</h2>
        <span class="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-sm rotate-3">ENRICHED BY AI</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 class="font-black text-lg mb-4 flex items-center gap-2">
            <span>vibes check</span>
            <span class="text-sm font-normal text-zinc-400">#moods</span>
          </h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="tag in movie.vibe_tags" :key="tag" class="px-4 py-2 bg-white dark:bg-zinc-950 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 text-sm font-medium">
              {{ tag }}
            </span>
            <span v-if="!movie.vibe_tags?.length" class="text-zinc-400 italic">No vibes found. Major L.</span>
          </div>
        </div>

        <div>
          <h3 class="font-black text-lg mb-4 flex items-center gap-2">
            <span>gen-z approved</span>
            <span class="text-sm font-normal text-zinc-400">#slang</span>
          </h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="tag in movie.genz_tags" :key="tag" class="px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-2xl text-sm font-bold">
              #{{ tag }}
            </span>
          </div>
        </div>

        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <div class="text-center">
            <div class="text-4xl font-black mb-1">{{ movie.genre_blend_score || '??' }}%</div>
            <div class="text-[10px] font-bold text-zinc-400 uppercase">Genre Blend Score</div>
          </div>
          <div class="md:col-span-2">
            <h4 class="font-bold mb-2 text-sm uppercase tracking-wider text-zinc-500">watch with who?</h4>
            <p class="font-medium text-lg">{{ movie.watch_with_who || "Anyone who isn't mid." }}</p>
          </div>
        </div>

        <div class="md:col-span-2">
          <h3 class="font-black text-lg mb-4">recommendation chain 🔗</h3>
          <div class="space-y-4">
            <div v-for="(rec, index) in movie.recommendation_chain" :key="rec" class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black text-xs">{{ index + 1 }}</div>
              <div class="flex-1 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-default">
                {{ rec }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Thematic Keywords -->
    <section class="mb-20 text-center">
      <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">thematic keywords</h3>
      <div class="flex flex-wrap justify-center gap-x-8 gap-y-4">
        <span v-for="kw in movie.thematic_keywords" :key="kw" class="text-2xl font-black opacity-30 hover:opacity-100 transition-opacity cursor-default">
          {{ kw }}
        </span>
      </div>
    </section>
  </div>
</template>
