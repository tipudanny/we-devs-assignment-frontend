<template>
    <div class="container">
        <Navbar />
        <div class="columns is-mobile">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from "@/components/Layouts/Menu";
import Navbar from "@/components/Layouts/Navbar";

export default {
    name: 'Layout',
    components: {
        Menu,Navbar
    }
}
</script>

<style>

</style>