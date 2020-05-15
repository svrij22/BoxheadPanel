<template>
    <div class="infocomp">
        <div class="playercontainer">
            <h3>Search for player on name or id</h3>
            <input v-model="searchQuery">
            <div class="playerInfo" v-for="(user, index) in items" v-bind:key="index">
                <div class="wavecon">
                    <font-awesome-icon icon="user" /> {{user.username}}<br>
                </div>
                <br>
                <div class="dispData">
                    <div class="smallInfo" v-for="(i, name, value) in user" v-bind:key="value">
                        <b>{{name}}</b><br>{{i}}

                    </div>
                </div>
            </div>
        </div>
        <p class="output">{{JSON.stringify(serverData, null, "\t")}}</p>
    </div>
</template>

<script>
    import _ from 'lodash';

    export default {
        props: ['serverData'],
        name: "playerInfoComp",
        data: function(){
            return {
                searchQuery: "",
                items: []
            }
        },
        methods:{
            doSearch(){
                let query = this.searchQuery;
                console.log(query);
                if (query == ""){
                    console.log("empty");
                    this.items = _.take(this.serverData.data, 10);
                }
                this.items = _.filter(this.serverData.data, function(o) {
                    if (o.username.includes(query) || o.clientid.toString().includes(query)){
                        return true;
                    }
                });
            }
        },
        watch: {
            searchQuery: function(val){
                console.log (val);
                this.doSearch();
            },
            serverData: function () {
                this.items = _.take(this.serverData.data, 10);
            }
        },
        mounted(){
            //Set path
            this.$emit('emitpath', "player", "");
        }
    }
</script>

<style scoped>
    .playercontainer{
        overflow: hidden;
        overflow-y: scroll;
        width: 100%;
        height: 200%;
    }

    .wavecon{
        top: 0;
        border-radius: 4px;
        position: absolute;
        background: #4d4d4d;
        width: 125px;
        height: 30px;
        color: #e9e9e9;
    }

    .playerInfo{
        width: 100%;
        border-radius: 8px;
        margin: 3px;
        position: relative;
    }
    .smallInfo{
        background: #e9e9e9;
        border-radius: 4px;
        padding: 8px;
        margin: 6px;
        flex-grow: 1;
        max-width: 300px;
        max-height: 200px;
        overflow: hidden;
        overflow-y: auto;
        overflow-scrolling: auto;
    }

    .dispData{
        display: flex;
    }

    button{
        margin: 4px;
    }
</style>