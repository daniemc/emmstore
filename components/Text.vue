<template>
    <span
    :class="{
        'font-bold': bold,
    }"
    >
        <slot />
    </span>
</template>

<script setup>
const props = defineProps({
    bold: {
        type: Boolean,
        default: false,
    }
})
</script>

<style lang="scss" scoped>

</style>