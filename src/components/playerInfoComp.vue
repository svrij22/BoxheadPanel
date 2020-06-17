<template>
    <div class="infocomp bootstrap-wrapper">
        <div class="playercontainer">
            <h3>Search for player on name or id</h3>
            <input v-model="searchQuery">
            <table>
                <thead>
                    <tr>
                        <th v-for="(value, key) in gridColumns" v-bind:key="key">
                            {{gridFormatted[key]}}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <template v-for="(entry, key) in items" >
                    <tr v-bind:key="key">
                        <td v-for="(value, key) in gridColumns" v-bind:key="key">
                            {{entry[value]}}
                        </td>
                        <td>
                            <input type="button" value="View" @click="(toggled === key) ? toggled = -1 : toggled = key">
                            <input type="button" value="Delete" @click="removePlayer(entry.clientid)" v-if="entry.hasAccount">
                        </td>
                    </tr>
                    <tr v-bind:key="key" v-if="toggled === key">
                        <td colspan="5">
                            <table>
                                <tbody>
                                <tr v-bind:key="key" v-for="(value, key) in entry" >
                                    <td>
                                        {{key}}
                                    </td>
                                    <td>
                                        {{value}}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
        <p class="output" v-if="$store.state.debugger">{{JSON.stringify(serverData, null, "\t")}}</p>
    </div>
</template>

<script>
    import _ from 'lodash';
    import axios from 'axios';

    export default {
        props: ['serverData'],
        name: "playerInfoComp",
        data: function(){
            return {
                searchQuery: "",
                items: [],
                toggled: -1,
                gridColumns: ["username", "clientid", "lastplayed", "hasAccount"],
                gridFormatted: ["Username", "Client ID", "Last Played", "Registered"]
            }
        },
        methods:{
            removePlayer(ID){
                //Headers
                axios.delete(`${this.$store.state.serverAddress}/rest/player/${ID}`,{
                    headers: this.$store.getters.getHeader
                }).then((response) =>{

                    console.log("test")
                    //Set the server data
                    this.serverData.data = response.data;
                    _.remove(this.items,{
                        clientid: ID
                    });

                })

            },
            doSearch: _.debounce(function(){
                let query = this.searchQuery;
                this.toggleData(-1, "");

                //Dont do anything on empty filter
                if (query === ""){
                    console.log("empty");
                    this.items = _.take(this.serverData.data, 10);
                }

                //Do filter
                this.items = _.filter(this.serverData.data, function(o) {
                    if (o.username.includes(query) || o.clientid.toString().includes(query)){
                        return true;
                    }
                });

                //Only 10 items max
                this.items = _.take(this.items, 50);

                //Mutate data
                _.each(this.items, (item)=>{
                    Object.assign(item, item.clientdata, {clientdata: null});
                })
            }, 450),
            toggleData(index, value){
                this.toggled = index;
                this.toggletext = value;
            }
        },
        watch: {
            searchQuery(){
                this.doSearch();
            },
            serverData: function () {
                this.items = _.take(this.serverData.data, 50);
            }
        },
        mounted(){
            //Set path
            this.$emit('emitpath', "player", "");
        },
        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
        },
    }
</script>

<style scoped lang="scss">

    .playercontainer{
        width: 100%;
    }

    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 2px solid #b94242;
        border-radius: 3px;
        background-color: #fff;
        width: 100%;
        margin-top: 20px;
    }

    th {
        background-color: #b94242;
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
        text-align: left;
    }

    th,
    td {
        padding: 5px 10px;
    }

    //Als het een button is moet hij zich kunnen verspreiden
    td input[type="button"]{
        margin: 0;
        padding: 5px 10px 5px 10px;
        flex-grow: 1;
        border-radius: 5px;
    }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }
</style>