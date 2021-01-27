<template>
    <div>
        <div class="title m-6 has-text-centered is-success">Please Login</div>
        <div class="columns">
            <div class="column"></div>
            <div class="column  is-half">

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Email</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input is-rounded" type="email" placeholder="tipu@gmail.com">
                            </p>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Password</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input is-rounded" type="password" placeholder="********">
                            </p>
                        </div>
                    </div>
                </div>


                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <div class="file has-name is-fullwidth is-right">
                                <button class="button is-success is-rounded is-medium">Login</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
export default {
name: "Login"
}
</script>

<style scoped>

</style>