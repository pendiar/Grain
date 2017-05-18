<template>
    <div class="q-collapsible">
        <label class="item item-link non-selectable item-collapsible">
            <div class="item-primary"><input type="checkbox" v-model="checked" :value="item.Number" ></div>
            <div class="item-content has-secondary">
                <div>{{item.Name || item.Number}}</div>
            </div>
            <i class="item-secondary" @click.stop.prevent="toggle" v-if="item.children.length">keyboard_arrow_down</i>
        </label>
        <transition name="toggleSlide">
            <div v-show="show">
                <div class="q-collapsible-sub-item">
                    <select-tree-item v-model="checked" v-for="childitem in item.children" :item="childitem"></select-tree-item>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'select-tree-item',
        props: ['item', 'value'],
        computed: {
            checked: {
                get: function () {
                    return this.value;
                },
                set: function (newValue) {
                    this.$emit('input', newValue);
                },
            }
        },
        data() {
            return {
                show: false,
            };
        },
        methods: {
            toggle() {
                this.show = !this.show;
            },
        },
    };
</script>

<style lang="less">
    .toggleSlide-enter-active, .toggleSlide-leave-active {
        transition: height .5s;
        overflow: hidden;
    }
    .toggleSlide-enter, .toggleSlide-leave-active {
        height: 0;
    }
</style>
