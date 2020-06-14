<template>
    <div class="infocomp bootstrap-wrapper">
        <div class="playercontainer">
            <h3>Search for player on name or id</h3>
            <input v-model="searchQuery">
            <div class="playerInfo" v-for="(user, index) in items" v-bind:key="index">
                <div class="wavecon">
                    <font-awesome-icon icon="user" /> {{user.username}}<br>
                </div>
                <br>
                <div class="dispData">
                    <div @click="toggleData(index, value)" class="smallInfo" v-for="(value, name, i) in (Object.assign(user, user.clientdata))" v-bind:key="i">
                        <b>{{name}}</b><br>{{value}}
                    </div>
                </div>
                <div class="toggleInfo output" v-if="toggled == index">
                    {{JSON.stringify(toggletext, null, "\t")}}
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
                items: [],
                toggled: -1,
                toggletext: ""
            }
        },
        methods:{
            doSearch(){
                let query = this.searchQuery;
                this.toggleData(-1, "");
                console.log(query);
                if (query === ""){
                    console.log("empty");
                    this.items = _.take(this.serverData.data, 10);
                }
                this.items = _.filter(this.serverData.data, function(o) {
                    if (o.username.includes(query) || o.clientid.toString().includes(query)){
                        return true;
                    }
                });
            },
            toggleData(index, value){
                this.toggled = index;
                this.toggletext = value;
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

<style scoped lang="scss">

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

    .toggleInfo{
        background: #f8f8f8;
        border-radius: 4px;
        padding: 8px;
        margin: 10px;
        width: 100%;
    }
    .smallInfo{
        background: #e9e9e9;
        border-radius: 8px;

        padding: 8px;
        margin: 6px;

        flex-grow: 1;
        max-width: 300px;
        max-height: 120px;
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