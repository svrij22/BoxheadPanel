<template>
    <div class="sidenav">
        <div>
            <div class="logo">
                <img src="../assets/logo.png"/>
            </div>
            <b>{{serverAddress}}</b>
            <div class="menu">
                <router-link to="/play">Play</router-link>
                <div v-if="isAuth">
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
        </div>
        <div class="footer" v-if="isAuth">
            <div class="username">
                <font-awesome-icon icon="user" /> {{username}}
            </div>
            <button @click="emitClick" class="box-button"> Logout </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['serverAddress', "username","isAuth"],
        name: "SideBarComp",
        methods: {
            emitClick(){
                console.log ("test");
                this.$emit('emitlogout')
            }
        }
    }
</script>

<style scoped>

    .logo img{
        max-width: 170px;
    }

    .menu{
        padding-top: 45px;
    }

    .sidenav {
        min-width: 240px;
        z-index: 1;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        padding-bottom: 16px;
        justify-content: space-between;
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

    .sidenav b{
        color: white;
    }

    .footer{

    }

    button{
        width: 100%;
        margin: 0;
    }

    .username{
        color: white;
        text-align: left;
        font-size: 20px;
        padding: 6px 8px 6px 16px;
    }

    .main {
        margin-left: 160px; /* Same as the width of the sidenav */
        font-size: 28px; /* Increased text to enable scrolling */
        padding: 0px 10px;
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
</style>