<template>
    <aside class="menu">
        <b-menu>
            <b-menu-list label="Menu">
                <b-menu-item icon="settings" :active="isActive" expanded>
                    <template #label="props">
                        Product Manage
                        <b-icon
                            class="is-pulled-right" :icon="props.expanded ? 'angle-up' : 'angle-down'">
                        </b-icon>
                    </template>
                    <router-link to="/product/create-product">
                        <div class="is-flex">
                            <b-icon
                                class=" mt-2 mr-3"
                                pack="fas"
                                icon="cart-arrow-down"
                                size="is-small"
                                type="is-primary">
                            </b-icon>
                            <b-menu-item icon="cart-arrow-down" label="All Product"></b-menu-item>
                        </div>
                    </router-link>

                    <b-menu-item icon="account" label="Add Product"></b-menu-item>
                </b-menu-item>
            </b-menu-list>
        </b-menu>
    </aside>

</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            isActive: true
        }
    },
}
</script>
<style scoped>

</style>