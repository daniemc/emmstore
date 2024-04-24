<template>
    <button class="btn"
    :class="{
        'btn-primary': variant === 'primary' || primary,
        'btn-secondary': variant === 'secondary' || secondary,
        'btn-accent': variant === 'accent' || accent,
    }"
    >
    <Text v-if="buttonHasTextProp">{{ text }}</Text>
    <slot v-else />
    
    </button>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    },
    primary: {
        type: Boolean,
        default: false
    },
    secondary: {
        type: Boolean,
        default: false
    },
    accent: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
    },
})

const buttonHasTextProp = computed(() => props.text && props.text.trim() !== '')
</script>

<style lang="scss" scoped>

</style>