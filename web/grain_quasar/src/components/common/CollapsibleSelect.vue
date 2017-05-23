<template>
    <div class="q-collapsible">
        <label class="item item-link non-selectable item-collapsible">
            <div class="item-content has-secondary">
                <input type="checkbox" v-model="checked" :value="val" >
                <div>{{label}}</div>
            </div>
            <i class="item-secondary" @click.stop="toggle">keyboard_arrow_down</i>
        </label>
        <transition name="toggleSlide">
            <div v-show="show">
                <div class="q-collapsible-sub-item">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: ['label', 'value', 'val'],
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
