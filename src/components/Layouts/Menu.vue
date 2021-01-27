<template>
    <aside class="menu">
        <b-menu>
            <b-menu-list label="Menu">
                <b-menu-item icon="sliders-h" :active="isActive" expanded>
                    <template #label="props">
                        Product Manage
                        <b-icon
                            class="is-pulled-right" :icon="props.expanded ? 'angle-up' : 'angle-down'">
                        </b-icon>
                    </template>
                        <b-menu-item icon="plus" label="All Product" tag="router-link" to="/product/all-product">
                        </b-menu-item>
                        <b-menu-item icon="plus" label="Add Product" tag="router-link" to="/product/create-product">
                        </b-menu-item>
                </b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
                <b-menu-item label="Logout"></b-menu-item>
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