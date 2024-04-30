<template>
    <div class="flex flex-col gap-4">
        <div
            v-for="(header, index) in headers"
            :key="`form-control-${name.singular}-${header}`"
            class="flex flex-col gap-1"
        >
            <Text v-if="editing && fields[header].type !== 'boolean'">{{ fields[header].text }}</Text>
            <InputText 
            v-if="fields[header].type === 'string'"
            :id="header"
            :name="header"
            :placeholder="`${fields[header].text}`"
            v-model="formData[header]"
            />
            <InputPassword
            v-if="fields[header].type === 'password'"
            :id="header"
            :name="header"
            :placeholder="`${fields[header].text}`"
            v-model="formData[header]"
            />
            <div class="flex" v-if="fields[header].type === 'boolean'">
                <InputCheck 
                :id="header"
                :name="header"
                :placeholder="`${fields[header].text}`"
                v-model="formData[header]"
                />
            </div>
            <InputSelect 
            v-if="fields[header].type === 'model'"
            :placeholder="`${fields[header].text}`"
            v-model="formData[header]"
            :options="lists[header]"
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
const lists = ref({})

async function fetchDataModel(fieldKey, model) {
    const { hasError, data } = await useApi(
        'GET',
        model.listURL
    )
    if (!hasError) {
        lists.value[fieldKey] = data.data.map((_) => ({
            value: _[model.value],
            text: _[model.text],
        }))
    }
}

function setData() {
    formData.value = {}
    const newFormData = {}
    Object.keys(props.fields)
        .forEach((key) => {
            if (props.editing) {
                newFormData[key] = props.data[key]
            } else {
                if (props.fields[key].type === 'string') {
                    newFormData[key] = ''
                }
                if (props.fields[key].type === 'boolean') {
                    newFormData[key] = true
                }
                if (props.fields[key].type === 'number') {
                    newFormData[key] = 0
                }
                if (props.fields[key].type === 'model') {
                    const model = props.fields[key].model
                    if (model.type === 'string') {
                        newFormData[key] = ''
                    }
                    if (model.type === 'number') {
                        newFormData[key] = 0
                    }
                    if (model.dataOrigin === 'fetch') {
                        fetchDataModel(key, model)
                    }
                }
            }
        })
    formData.value = newFormData
}

onMounted(() => {
    setData()
})

</script>

<style lang="scss" scoped>

</style>