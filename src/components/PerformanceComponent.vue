<template>
    <div>
        {{performanceitems}}
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "PerformanceComponent",
        data: function () {
            return {
                performanceitems: []
            }
        },
        mounted() {
            axios.get(`http://${this.$store.state.serverAddress}/rest/log/performance`,{
                headers: this.$store.getters.getHeader
            }).then((response) =>{
                this.performanceitems = response.data;
            })
        }
    }
</script>

<style scoped>

</style>