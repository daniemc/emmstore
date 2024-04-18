<template>
    <button class="btn"
    :class="{
        'btn-primary': variant === 'primary',
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
    text: {
        type: String,
    },
})

const buttonHasTextProp = computed(() => props.text && props.text.trim() !== '')
</script>

<style lang="scss" scoped>

</style>