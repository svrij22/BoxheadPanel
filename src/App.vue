<template>
    <div id="app">
        <side-bar-comp
                :server-address="serverAddress"
                :isAuth="sessiontoken"
                @emitlogout="doLogout"
                :username="username"
        />
        <router-view :server-data="serverData" @emitauth="setAuth" @emitpath="setPath" id="view"></router-view>
        <div id="note">
            <b>{{servernote}}</b>
        </div>
    </div>
</template>

<script>
    import SideBarComp from "@/components/SideBarComp";
    import axios from "axios";
    import sha256 from 'crypto-js/sha256';
    import hmacSHA512 from 'crypto-js/hmac-sha512';
    import Base64 from 'crypto-js/enc-base64';
    import Utf8 from 'crypto-js/enc-utf8';

    export default {
        name: 'App',
        components: {
            SideBarComp
        },
        data: function () {
            return {
                serverAddress: "localhost",
                serverData: "",
                auth: "",
                getPath: "",
                pathsallowed: ["/login", "/register", "/play"],

                command: "",
                username: "",
                regkey: "",
                sessiontoken: window.sessionStorage.getItem("sessionToken"),
                servernote: ""
            }
        },
        methods: {
            getServerData: function(){
                console.log("Request");
                this.servernote = "";

                let headers = {
                    Authorization: this.generateAuth()
                };

                //axios.get(`http://${this.serverAddress}:8091/boxhead/restservices/game/${this.getPath}`, {
                axios.get(`http://${this.serverAddress}:8090/restservices/game/${this.getPath}`, {
                    headers: headers
                })
                    .then((response) => {
                        // handle success
                        this.serverData = response;
                        this.serverData.address = this.serverAddress;
                    })
                    .catch((error) => {
                        // handle error
                        console.log (error);

                        //Register error as response
                        this.serverData = error.response.status;
                        this.servernote = error.response.status + " - Sorry :(";

                        //If error and not logged in
                        this.checkPath(this.$route.path);
                    })
                .finally(() =>{
                    //set faux data
                    this.fauxData();
                })

            },
            setDataTimer(){
                this.getServerData();
            },
            tryLogin(){
                console.log("Login attempt");
                this.servernote = "";

                let headers = {
                    Authorization: this.generateAuth()
                };

                //axios.get(`http://${this.serverAddress}:8091/boxhead/restservices/game/${this.getPath}`, {
                axios.get(`http://${this.serverAddress}:8090/restservices/game/${this.getPath}`, {
                    headers: headers
                })
                    .then((response) => {

                        // handle success
                        this.sessiontoken = response.data;
                        window.sessionStorage.setItem("sessionToken", this.sessiontoken);

                        //If trying to login or register move to info
                        let path = this.$route.path;
                        if (path === '/login' || path === "/register") {
                            if (response.data) {
                                this.authorized = true;
                                this.$router.push("/info");
                            }
                        }
                    })
                    .catch((error) => {
                        // handle error
                        console.log (error);


                        //Register error
                        let status = "Error";
                        if (error?.response?.status) status = error?.response?.status;

                        this.serverData = status;
                        this.servernote = status + " - " + error.toString() + " - Sorry :(";
                    })
            },
            setAuth(passw, username, regkey){
                if (passw === undefined) return;

                const privateKey = "BOXHEAD";
                const hashDigest = sha256("authkey" + passw);
                this.auth = Base64.stringify(hmacSHA512(hashDigest, privateKey));

                this.username = username;
                this.regkey = regkey;

                this.tryLogin();
            },
            generateAuth() {
                // PW ? UN ? REGKEY ? SESSIONTOKEN
                return this.auth + "."
                    + Base64.stringify(Utf8.parse(this.username)) + "."
                    + Base64.stringify(Utf8.parse(this.regkey)) + "."
                    + Base64.stringify(Utf8.parse(window.sessionStorage.getItem("sessionToken")));
            },
            setPath(path, cmd){
                this.getPath = path;
                this.command = cmd;
                this.getServerData();
            },
            doLogout(){
                console.log ("logging out");
                this.auth = "";
                this.username = "";
                this.sessiontoken = "";
                window.sessionStorage.setItem("sessionToken", "");
                this.$router.push("/login");
            },
            fauxData(){

                //Only continue is found sockets
                if (!this.serverData.data.sockets) return;

                var remoteData = {
                    "remote": {
                        "address": "81.206.12.59",
                        "family": "IPv4",
                        "port": 51040,
                        "size": 9
                    },
                    "heartbeat": 5,
                    "group": 0,
                    "name": "test",
                    "ticks": 9,
                    "gameoverTicker": 2
                };

                var mapData = {
                    "identities": [
                        0
                    ],
                    "config": {
                        "dataset": "true",
                        "type": "config",
                        "id_names0": "noob",
                        "zombiestogo": (Math.floor(Math.random() * 15)),
                        "wave": 0,
                        "wavestate": "WAVEEND",
                        "maxzombies": (Math.floor(Math.random() * 15)),
                        "waveticker": 0,
                        "gameid": (Math.floor(Math.random() * 99999))
                    },
                    "zombies": {
                        "zombie48089": "913.42^921.63^0^48089^zombie^",
                        "type": "zombies"
                    }
                };

                let dataMap = this.serverData.data.gameMaps;
                dataMap.push(mapData);
                dataMap.push(mapData);
                dataMap.push(mapData);

                let dataMap2 = this.serverData.data.sockets;
                dataMap2.push(remoteData);
                dataMap2.push(remoteData);
                dataMap2.push(remoteData);
                console.log(remoteData);
            },
            checkPath(path){
                //Checks if logged in or trying to log in
                let eitherPath = this.pathsallowed.contains(path);
                console.log(eitherPath);
                if (!eitherPath && !this.sessiontoken){
                    console.log("log in first");
                    this.$router.push("/login");
                }
            }
        },
        mounted() {
            // eslint-disable-next-line no-unused-vars
            const dataTimer = setInterval(this.getServerData, 2000);

            //on mounted if logged in goto info
            if (this.authorized && this.$route.path === '/'){
                this.$router.push("/info");
            }
        },
        watch:{
            // eslint-disable-next-line no-unused-vars
            $route (to, from){
                //Still retry server data get
                this.checkPath(to.path);
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

    .infocomp{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        padding: 32px;
    }


    .output{
        overflow: hidden;
        overflow-y: auto;
        white-space: pre-wrap;
        text-align: left!important;
        height: 100%;
        margin: 8px;
        background: #f9e6e6;
        width: 100%;
    }

    .box-button{
        background-color: #af211c;
        color: white;
        padding: 15px;
        margin: 8px;
        border: none;
        cursor: pointer;
        flex-grow: 4;
    }

    button:hover {
        opacity: 0.8;
    }

    input{
        padding: 12px 20px;
        margin: 8px 0!important;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    #note {
        position: absolute;
        z-index: 101;
        top: 0;
        left: 0;
        right: 0;
        background: #fd8181;
        text-align: center;
        line-height: 3;
        overflow: hidden;
        -webkit-box-shadow: 0 0 10px black;
        -moz-box-shadow:    0 0 10px black;
        box-shadow:         0 0 10px black;

        animation:
                pulse
                1.5s
                ease-out
                infinite
                alternate
                running;
    }

    @keyframes pulse {
        0% {
            background-color: #ffff30;
            top: -50px;
        }
        50% {
            background-color: #ff564f;
            transform: scale(1.1, 1.1);
        }
        100% {
            background-color: #ff564f;
            top: 0px;
        }
    }

</style>
