<template>
    <div class="flex flex-col gap-4">
        <div
            v-for="(header, index) in headers"
            :key="`form-control-${name.singular}-${header}`"
            class="flex"
        >
            <InputText 
            v-if="fields[header].type === 'string'"
            :placeholder="`${fields[header].text}`"
            v-model="formData[header]"
            />
            <InputCheck 
            v-if="fields[header].type === 'boolean'"
            :placeholder="`${fields[header].text}`"
            v-model="formData[header]"
            />
        </div>
        <Divider />
        <div class="grid grid-cols-2 gap-2">
            <Button
            variant="transparent"
            text="CANCELAR"
            @click="$emit('onCancel')"
            />
            <Button
            v-if="!editing"
            variant="primary"
            text="GUARDAR"
            @click="$emit('onSave', formData)"
            />
            <Button
            v-else
            variant="primary"
            text="ACTUALIZAR"
            @click="$emit('onUpdate', formData)"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: {
        type: Object,
        default: () => ({
            singular: 'Item',
            plural: 'Items',
        })
    },
    fields: {
        type: Object,
        default: () => ({})
    },
    editing: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
        default: () => ({})
    }
})

const headers = computed(() => props.editing 
    ? editionHeaders.value
    : creationHeaders.value
)

const creationHeaders = computed(() => {
    return Object.keys(props.fields)
        .filter((header) => props.fields[header].create)
})

const editionHeaders = computed(() => {
    return Object.keys(props.fields)
        .filter((header) => props.fields[header].editable)
})

const formData = ref({})

function setData() {
    formData.value = {}
    if (props.editing) {
        const newFormData = {}
        Object.keys(props.fields)
            .forEach((key) => newFormData[key] = props.data[key])
        formData.value = newFormData
    }
}

onMounted(() => {
    setData()
})

</script>

<style lang="scss" scoped>

</style>