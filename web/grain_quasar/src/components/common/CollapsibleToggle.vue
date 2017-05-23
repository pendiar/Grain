<template>
    <div class="q-collapsible">
        <div class="item item-link non-selectable item-collapsible" @click="toggle">
            <div class="item-content has-secondary">
                <div>{{label}}</div>
            </div>
            <label class="item-secondary" @click.stop>
                <q-toggle v-model="checked"></q-toggle>
            </label>
        </div>
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
        props: ['label', 'value'],
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
