<template>
    <div class="flex flex-col gap-2 w-full max-w-xs">
        <Text>{{ placeholder }}</Text>
        <select 
        class="select select-bordered w-full max-w-xs"
        @change="onChange"
        :value="modelValue"
        >
            <option 
                disabled 
                :selected="!placeholder || placeholder === '' || modelValue === null || modelValue === 0"
            >{{ placeholder }}</option>
            <option
            v-for="(option, index) in options"
            :value="option.value"
            :selected="option.value === modelValue"
            >
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    modelValue: {
        type: String,
        default: ''
    }, 
    options: {
        type: Array,
        default: () => ([])
    },
})

const emit = defineEmits(['change', 'update:modelValue'])    

function onChange($event) {
    const value = $event.target.value
    emit('change', value)
    emit('update:modelValue', value)
}

</script>

<style lang="scss" scoped>

</style>