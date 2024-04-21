<template>
    <label class="label flex gap-2">
        <Text>
            {{ placeholder }}
        </Text>
        <input 
        type="checkbox" 
        class="checkbox" 
        :name="name" 
        :id="id"
        :checked="modelValue"
        @input="input"
        />
    </label>
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
const emit = defineEmits(['update:modelValue', 'change'])
function input(event) {
    const value = event.target.checked
    emit('update:modelValue', value)
    emit('change', value)
}
</script>

<style lang="scss" scoped>

</style>