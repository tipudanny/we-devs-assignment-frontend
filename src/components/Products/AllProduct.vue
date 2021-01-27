<template>
    <div>
        <h4 class="title is-4">All Products</h4>
        <section>
            <div class="table-container">
                <table class="table is-bordered is-fullwidth has-text-centered">
                <thead>
                    <tr class="">
                        <th>#Sl</th>
                        <th>Titile</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>test</td>
                        <td>test description</td>
                        <td>photo</td>
                        <td>
                            <div class="buttons is-inline-flex">
                                <button class="button is-warning is-small">Edit</button>
                                <button class="button is-danger is-small">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </section>
        <section class="mt-3">
            <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous">Previous</a>
                <a class="pagination-next">Next page</a>
                <ul class="pagination-list">
                    <li><a class="pagination-link is-current">1</a></li>
                    <li><a class="pagination-link">2</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" >3</a></li>
                </ul>
            </nav>
        </section>
    </div>
</template>

<script>
export default {
    name: 'AllProduct',
    data() {
        return {

        }
    }
}
</script>

