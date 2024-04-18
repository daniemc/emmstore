<template>
    <table class="w-full border-collapse ">
        <thead>
            <tr>
                <th 
                v-for="(header, index) in headers"
                :key="`header-${index}-${header}`"
                class="border border-strokeGrey p-2"
                > 
                    {{ fields[header].text }} 
                </th>
                <th v-if="showActionsHeader" class="border border-strokeGrey p-2">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="(item, index) in data"
            :key="`row-${index}-${header}`"
            class="even:bg-strokeGrey cursor-pointer hover:bg-gray-300"
            >
                <td 
                    v-for="(header, index) in headers"
                    class="border border-strokeGrey p-2"
                >
                    {{ item[header] }}
                </td>
                <td>
                    <div 
                    v-if="showActionsHeader"
                    class="flex justify-center gap-4"
                    >
                        <i 
                        v-if="allowEdit"
                        class="bx bx-pencil text-default"
                        @click="$emit('onEdit', item)"
                        ></i>
                        <i 
                        v-if="allowDelete"
                        class="bx bx-trash text-red"
                        @click="$emit('onDelete', item)"
                        ></i>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const props = defineProps({
    fields: {
        type: Object,
        default: () => ({})
    },
    data: {
        type: Array,
        default: () => ([])
    },
    allowEdit: {
        type: Boolean,
        default: false,
    },
    allowDelete: {
        type: Boolean,
        default: false,
    },
})

const headers = computed(() => {
    return Object.keys(props.fields)
})

const showActionsHeader = computed(() => props.allowEdit || props.allowDelete)

</script>

<style lang="scss" scoped>

</style>