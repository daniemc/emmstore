<template>
    <table class="w-full border-collapse ">
        <thead>
            <tr>
                <th 
                v-for="(header, index) in headers"
                :key="`header-${index}-${header}`"
                class="border border-gray-300 p-2"
                > 
                    {{ fields[header].text }} 
                </th>
                <th v-if="showActionsHeader" class="border border-gray-300 p-2">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="(item, index) in data"
            :key="`row-${index}-${header}`"
            class="even:bg-gray-200 cursor-pointer hover:bg-gray-300"
            >
                <td 
                    v-for="(header, index) in headers"
                    class="border border-gray-300 p-2"
                >
                    <Text v-if="fields[header].type === 'object'">
                        {{ item[header][fields[header].ObjectKey] }}
                    </Text>
                    <Text v-else>
                        {{ item[header] }}
                    </Text>
                </td>
                <td class="border border-gray-300 p-2">
                    <div 
                    v-if="showActionsHeader"
                    class="flex justify-center items-center gap-2"
                    >
                        
                        <div
                        v-for="(action, actionIndex) in extraActions"
                        class="tooltip"
                        :data-tip="action.text"
                        @click="onExtraAction(action.action, item)"
                        >
                        <i
                        :class="action.icon"
                        >
                        </i>
                        </div>
                        <i 
                        v-if="allowEdit"
                        class="bx bx-pencil text-info"
                        @click="$emit('onEdit', item)"
                        ></i>
                        <i 
                        v-if="allowDelete"
                        class="bx bx-trash text-error"
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
    extraActions: {
        type: Array,
        default: () => ([]),
    }
})

const headers = computed(() => {
    return Object.keys(props.fields)
})

const hasExtraActions = computed(() => props.extraActions && props.extraActions.length > 0)
const showActionsHeader = computed(() => props.allowEdit || props.allowDelete || hasExtraActions)

function onExtraAction(action, item) {
    if (action.type === 'navigation') {
        let [ url, param ] = action.url.split(':')
        if (param) {
            url = `${url}${item[param]}`
        }
        navigateTo(url)
    }
}

</script>

<style lang="scss" scoped>

</style>