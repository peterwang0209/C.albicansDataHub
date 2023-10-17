<template>
    <div class="relative w-60 mt-10 left-0 h-60 bg-white opacity-80 border-2 m-2 shadow-2xl rounded-xl flex flex-col items-center">
        <!-- Add the description prop here -->
        <div class="mt-10 font-serif font-semibold text-l">{{ description }}</div>
        <!-- Add the value prop here -->
        <div class="mt-10 font-serif font-semibold text-6xl">{{ value }}</div>
    </div>
</template>

<script>
export default {
    props:{
        description: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            default: ""
        }
    }
}
</script>
