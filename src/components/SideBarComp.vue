<template>
    <div class="sidenav" v-bind:class="{ bindBottomNav: isBottom}" ref="nav">
            <div v-if="!isBottom">
                <div class="logo" v-if="!isBottom">
                    <img src="../assets/logo.png" alt="Boxhead logo navbar"/>
                </div>
                <b>{{this.$store.state.serverAddress}}</b>
            </div>
        {{mediaQueryActive}}
            <div class="side-content" v-if="isBottom || !mq">

                <div class="menu">
                    <router-link to="/play">Play</router-link>
                    <div v-if="this.$store.state.loggedIn">
                        <router-link to="/info">Server info</router-link>
                        <router-link to="/games">Game info</router-link>
                        <router-link to="/user">User info</router-link>
                        <router-link to="/debug">Debugger</router-link>
                        <router-link to="/ssh">SSH CLI</router-link>
                        <router-link to="/mail">Mail</router-link>
                    </div>
                    <div v-else>
                        <router-link to="/login">Login</router-link>
                        <router-link to="/register">Register</router-link>
                    </div>
                </div>

                <div v-if="this.$store.state.loggedIn">
                    <div class="username">
                        <font-awesome-icon icon="user"/>
                        {{this.$store.state.username}}
                    </div>
                    <button @click="logout" class="box-button"> Logout</button>
                </div>

            </div>
    </div>
</template>

<script>
    export default {
        name: "SideBarComp",
        props: ['isBottom'],
        data: function (){
            return{
                mq: false
            }
        },
        methods: {
            logout() {
                window.sessionStorage.setItem("JWT", "");
                this.$store.commit('removeStore');
                location.reload();
                this.$router.push("/login")
            }
        },
        mounted() {
            window.matchMedia('(max-width: 500px)').addListener( (e) => this.mq = e.matches);
        }
    }
</script>

<style scoped>

    .logo img {
        max-width: 170px;
    }

    .menu {
        padding-top: 45px;
    }

    .sidenav {
        min-width: 240px;
        z-index: 1;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 20px;
        padding-bottom: 16px;

        display: flex;
        flex-direction: column;
    }

    .bindBottomNav {
        margin-top: auto;
    }

    .sidenav a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        text-align: left;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    .sidenav b {
        color: white;
    }

    button {
        width: 100%;
        margin: 0;
    }

    .username {
        color: white;
        text-align: left;
        font-size: 20px;
        padding: 6px 8px 6px 16px;
    }

    .side-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 4;
    }

    @media only screen and (max-height: 500px) {
        .menu {
            padding-top: 15px!important;
        }

        .sidenav a {
            font-size: 18px!important;
        }
    }
</style>