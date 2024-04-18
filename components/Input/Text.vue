<template>
    <input 
    type="text" 
    class="input input-bordered w-full max-w-xs" 
    :name="name" 
    :placeholder="placeholder"
    :id="id"
    :value="modelValue"
    @input="(event) => emit('update:modelValue', event.target.value)"
    @keypress.enter="emit('enter')"
    />
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },  
    name: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
})

const emit = defineEmits(['update:modelValue', 'enter'])

</script>

<style lang="scss" scoped>

</style>