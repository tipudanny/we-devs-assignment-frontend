<template>
    <div>
        <div class="title mb-6 has-text-centered is-success">Add new product</div>
        <div class="columns">
            <div class="column"></div>
            <div class="column  is-half">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Title</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input is-rounded" type="text" placeholder="Product Title">
                            </p>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Description</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <textarea class="textarea is-small" placeholder="Small textarea"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Price</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input is-rounded" type="text" placeholder="Product Price">
                            </p>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Image</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="file has-name is-fullwidth">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="image">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label"> Choose a file…</span>
                                    </span>
                                    <span class="file-name">file name</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <div class="file has-name is-fullwidth is-right">
                                <button class="button is-success is-rounded is-medium">Submit</button>
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
    name: "AddProduct",
}
</script>

<style scoped>

</style>