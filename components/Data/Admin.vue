<template>
    <div class="flex flex-col">
        <div class="flex justify-end my-2">
            <Button 
            v-if="allowCreate"
            variant="primary"
            :text="`Nuevo ${name.singular}`"
            @click="openModal"
            />
        </div>
        <DataTable 
        :fields="fields"
        :data="dataToShow"
        :allowEdit="allowEdit"
        :allowDelete="allowDelete"
        @onEdit="openEditModal"
        @onDelete="openDeleteConfirmation"
        />
        <Modal
        :show="showFormModal"
        :title="formModalTitle"
        @onClose="closeFormModal"
        :showModalActions="false"
        >
            <DataForm
            v-if="showFormModal"
            :name="name" 
            :fields="fields"
            :editing="editingItem"
            :data="itemToEdit"
            @onCancel="closeFormModal"
            @onSave="save"
            @onUpdate="save"
            :key="`${name.singular}-form-modal-${showFormModal}`"
            />
        </Modal>
        <Modal
        :show="showDeleteValidationModal"
        title="ELIMINAR"
        @onClose="showDeleteValidationModal = false"
        @onCancel="showDeleteValidationModal = false"
        @onOk="onDelete"
        okButtonVariant="error"
        cancelButtonVariant="primary"
        >
        <div class="flex">
            <Text>
                ¿Esta seguro que desea eliminar <b>{{ name.singular }}</b> <i>{{ itemToDelete?.name }}</i> ?
            </Text>
        </div>
        </Modal>
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
    data: {
        type: Array,
        default: () => ([])
    },
    allowCreate: {
        type: Boolean,
        default: false,
    },
    allowEdit: {
        type: Boolean,
        default: false,
    },
    allowDelete: {
        type: Boolean,
        default: false,
    },
    autoCrud: {
        type: Boolean,
        default: false,
    },
    crud: {
        type: Object,
        default: () => ({
            c: '',
            r: '',
            u: '',
            d: '',
        })
    }
})

const emit = defineEmits(['onSave', 'onUpdate', 'onDelete'])

const showDeleteValidationModal = ref(false)
const showFormModal = ref(false)
const itemToDelete = ref(null)
const itemToEdit = ref(null)
const editingItem = ref(false)

const fetchedData = ref([])

const formModalTitle = computed(() => 
    editingItem.value ? `Editar ${props.name.singular}`: `Crear Nuevo ${props.name.singular}`
)

const dataToShow = computed(() => {
    if (!props.autoCrud) return props.data
    return fetchedData.value
})

function openModal() {
    showFormModal.value = true
}

function openEditModal(item) {
    itemToEdit.value = item
    editingItem.value = true
    showFormModal.value = true
}

function closeFormModal() {
    editingItem.value = false
    itemToEdit.value = null
    showFormModal.value = false
}

function save(formData) {
    if (editingItem.value) {
        if (props.autoCrud) {
            onUpdate({ newData: formData, oldData: itemToEdit.value })
            return
        }
        emit('onUpdate', { newData: formData, oldData: itemToEdit.value })
        closeFormModal()
        return
    }
    if (props.autoCrud) {
        onSave(formData)
        return
    }
    emit('onSave', formData)
    closeFormModal()
}

async function onSave(formData) {
    const apiUrl = props.crud.c
    const payload = {
        ...formData,
    }
    const { hasError, data } = await useApi(
        'POST',
        apiUrl,
        payload,
    )
    if (!hasError) {
        closeFormModal()
        getData()
    }
}

async function onUpdate({ newData, oldData }) {
    const apiUrl = props.crud.u
    const itemId = oldData.id
    const payload = {
        ...oldData,
        ...newData,
    }
    const { hasError, data } = await useApi(
        'PUT',
        `${apiUrl}/${itemId}`,
        payload,
    )
    if (!hasError) {
        closeFormModal()
        getData()
    }
}

async function onDelete() {
    if (props.autoCrud) {
        const apiUrl = props.crud.d
        const idToDelete = itemToDelete.value.id
        const { hasError } = await useApi(
            'DELETE',
            `${apiUrl}/${idToDelete}`,
        )
        if (!hasError) {
            showDeleteValidationModal.value = false
            getData()
        }
        return
    }
    emit('onDelete', itemToDelete.value)
    showDeleteValidationModal.value = false
}

function openDeleteConfirmation(item) {
    itemToDelete.value = item
    showDeleteValidationModal.value = true
}

async function getData() {
    const apiUrl = props.crud.r
    const { hasError, data } = await useApi(
        'GET',
        apiUrl,
    )
    if (!hasError) {
        fetchedData.value = data.data
    }
}

onMounted(() => {
    if (props.autoCrud) getData()
})

</script>

<style lang="scss" scoped>

</style>