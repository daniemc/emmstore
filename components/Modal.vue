<template>
    <div 
        tabindex="-1" 
        aria-hidden="true" 
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full "
        :class="{
            'hidden': !showModal
        }"
    >
            <!-- Modal content -->
            <div 
                class="relative top-20 mx-auto bg-white custom-shadow rounded-3xl border hide-scroll"
                :class="{
                    'w-full': size === 'full',
                    'w-3/4': size === 'large',
                    'w-2/4': size === 'medium',
                    'w-96': size === 'small',
                    'p-4': !noPadding ,
                    'h-auto': showModalActions && size !== 'small' && !hFull,
                    'h-full overflow-y-auto': hFull,
                }"
            >
                <Button 
                    v-if="showCloseButton"
                    variant="ghost"
                    class="absolute right-2 top-2"
                    square
                    @click="$emit('onClose')"
                >
                    <i class="bx bx-x"></i>
                </Button>
                <!-- Modal header -->
                <div class="flex flex-col">
                    <Text v-if="hasTitle" variant="title">{{ title }}</Text>
                    <slot name="header"></slot>
                </div>
                <!-- Modal body -->
                <div class="" :class="{
                    'mt-4': !noBodyMargin,
                    'hide-scroll overflow-y-auto h-full': showModalActions
                }">
                    <slot></slot>
                    <div v-if="showModalActions">
                        <br><br><br>
                    </div>
                </div>
                
                <!-- Modal footer -->
                <div v-if="showModalActions" class="absolute bottom-0 bg-white custom-width pr-4 pb-4 rounded-br-3xl">
                    <div
                        class="flex items-center mt-4 "
                        :class="{
                            'justify-between': !hideCancelBtn,
                            'justify-end': hideCancelBtn,
                        }"
                    >
                        <Button
                            v-if="!hideCancelBtn"
                            bold
                            :variant="cancelButtonVariant"
                            :text="cancelText"
                            rounded
                            shadowed
                            @click="$emit('onCancel')"
                            :disabled="btnCancelDisabled"
                         />
                        <Button
                            bold
                            :variant="okButtonVariant"
                            :text="okText"
                            rounded
                            shadowed
                            @click="$emit('onOk')"
                            :disabled="btnOkDisabled"
                        />
                        
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        show: {
            type: Boolean,
            default: false
        },
        showModalActions: {
            type: Boolean,
            default: true
        },
        showCloseButton: {
            type: Boolean,
            default: true
        },
        hideCancelBtn: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'small'
        },
        title: {
            type: String,
            default: ''
        },
        okText: {
            type: String,
            default: 'Si'
        },
        cancelText: {
            type: String,
            default: 'Cancelar'
        },
        btnOkDisabled: {
            type: Boolean,
            default: false,
        },
        btnCancelDisabled: {
            type: Boolean,
            default: false,
        },
        noPadding: {
            type: Boolean,
            default: false,
        },
        noBodyMargin: {
            type: Boolean,
            default: false,
        },
        okButtonVariant: {
            type: String,
            default: 'primary'
        },
        cancelButtonVariant: {
            type: String,
            default: 'secondary'
        },
        hFull: {
            type: Boolean,
            default: false,
        }
    })

    const showModal = ref(props.show)

    watch(props, (newValue) => {
        showModal.value = newValue.show
    })

    const hasTitle = computed(() => {
        return props.title && props.title.trim() !== ''
    })
</script>

<style lang="scss" scoped>
.custom-width {
    width: -webkit-fill-available;
}

.hide-scroll::-webkit-scrollbar {
  display: none;
  overflow-y: auto;
}

</style>