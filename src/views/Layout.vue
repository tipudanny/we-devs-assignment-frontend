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
        <Footer />
    </div>
</template>

<script>
import Menu from "@/components/Layouts/Menu";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/footer";

export default {
    name: 'Layout',
    components: {
        Footer,
        Menu,
        Navbar
    }
}
</script>

<style>

</style>