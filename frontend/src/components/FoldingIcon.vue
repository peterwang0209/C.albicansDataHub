<template>
    <div class="absolute top-1/2 transform -translate-y-1/2 ml-12">
        <svg
          v-if="isPanelOpen"
          @click="isPanelOpen = !isPanelOpen"
          width="40"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0 L0 10 L10 20"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M20 0 L10 10 L20 20"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M30 0 L20 10 L30 20"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
        </svg>

        <!-- For >>> (when isPanelOpen is false) -->
        <svg
          v-else
          @click="isPanelOpen = !isPanelOpen"
          width="40"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 L10 10 L0 20"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M10 0 L20 10 L10 20"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M20 0 L30 10 L20 20"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
</template>