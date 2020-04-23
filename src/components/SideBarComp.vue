<template>
    <div class="sidenav">
        <div class="logo">
            <img src="../assets/logo.png"/>
        </div>
        <b>{{serverData.address}}</b>
        <div class="menu">
            <router-link to="/info">Server info</router-link>
            <router-link to="/games">Game info</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['serverData'],
        name: "SideBarComp"
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
        height: 100%;
        min-width: 240px;

        z-index: 1;

        background-color: #111;
        overflow-x: hidden;
        padding-top: 20px;
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