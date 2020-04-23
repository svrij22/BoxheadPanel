<template>
    <div id="app">
        <side-bar-comp
                :server-address="serverAddress"
                :isAuth="authorized"
                @emitlogout="doLogout"
                :username="username"
        />
        <router-view :server-data="serverData" @emitauth="setAuth" id="view"></router-view>
    </div>
</template>

<script>
    import SideBarComp from "@/components/SideBarComp";
    import axios from "axios";

    export default {
        name: 'App',
        components: {
            SideBarComp
        },
        data: function () {
            return {
                serverAddress: "136.144.191.118",
                serverData: "",
                auth: "",
                authorized: false,
                username: "",
            }
        },
        methods: {
            getServerData: function(){

                console.log("run");

                let headers = {
                    authkey: this.auth
                };

                let getFile = "";
                if (this.$route.path === "/login") getFile = "dataFile.json"
                if (this.$route.path === "/info") getFile = "dataFile.json"
                if (this.$route.path === "/games") getFile = "dataFile.json"
                if (this.$route.path === "/user") getFile = "userFile.json"

                axios.get(`http://${this.serverAddress}:8090/${getFile}`, {
                    headers: headers
                })
                    .then((response) => {
                        // handle success
                        this.serverData = response;
                        this.serverData.address = this.serverAddress;

                        //If got response and trying to log in
                        if (response.data && this.$route.path === '/login'){
                            this.authorized = true;
                            this.$router.push("/info");
                        }
                    })
                    .catch((error) => {
                        // handle error
                        console.log (error)

                        //If error and not logged in
                        if (!this.authorized && this.$route.path !== '/login'){
                            this.$router.push("/login");
                        }
                    })
                    .then(function () {
                        // always executed
                    });

            },
            setDataTimer(){
                this.getServerData();
            },
            setAuth(authkey, username){
                this.auth = authkey;
                this.username = username;
                this.getServerData();
                console.log (authkey)
            },
            doLogout(){
                console.log ("logging out")
                this.auth = "";
                this.username = "";
                this.authorized = false;
                this.$router.push("/login");
            }
        },
        mounted() {
            // eslint-disable-next-line no-unused-vars
            const dataTimer = setInterval(this.getServerData, 2000);

            //logged in?
            if (this.authorized && this.$route.path === '/'){
                this.$router.push("/info");
            }
        },
        watch:{
            // eslint-disable-next-line no-unused-vars
            $route (to, from){
                if (to !== '/login' && !this.authorized){
                    console.log("log in first");
                    this.$router.push("/login");
                }
            }
        }
    }
</script>

<style>
    @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Poppins Regular'), local('Poppins-Regular'), url('/assets/Poppins-Regular.ttf') format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
    }

    #app {
        font-family: 'Poppins', sans-serif;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        display: flex;
        flex-direction: row;

        width: 100%;
    }

    html {
        height: 100%;
    }

    body {
        overflow: hidden;
        margin: 0px; /*removes default style*/
        display: flex;
        box-sizing: border-box;
        height: 100%;
        font-family: "Lato", sans-serif;
    }

    #view {
        margin: 8px;
    }

</style>
