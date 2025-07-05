<template>
  <div class="relative flex w-full flex-col items-center justify-center overflow-hidden gap-y-4 py-4">
    <Marquee pause-on-hover class="[--duration:10s] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <TechCard
        v-for="tech in SKILLS_ROW_1"
        :key="tech.name"
        :name="tech.name"
        :icon="tech.icon"
      />
    </Marquee>
    <Marquee reverse pause-on-hover class="[--duration:20s] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <TechCard
        v-for="tech in SKILLS_ROW_2"
        :key="tech.name"
        :name="tech.name"
        :icon="tech.icon"
      />
    </Marquee>
    <Marquee pause-on-hover class="[--duration:30s] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <TechCard
        v-for="tech in SKILLS_ROW_3"
        :key="tech.name"
        :name="tech.name"
        :icon="tech.icon"
      />
    </Marquee>
  </div>
</template>

<script setup lang="ts">
import { Marquee } from "@/components/ui/marquee";
import { SKILLS_ROW_1, SKILLS_ROW_2, SKILLS_ROW_3 } from "@/consts";
import TechCard from "@/components/TechCard.vue";
</script>