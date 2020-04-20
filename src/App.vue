<template>
    <div id="app">
        <side-bar-comp :server-address="serverAddress"/>
        <router-view :server-address="serverAddress" id="view"></router-view>
    </div>
</template>

<script>
    import SideBarComp from "@/components/SideBarComp";

    export default {
        name: 'App',
        components: {
            SideBarComp
        },
        data: function () {
            return {
                serverAddress: "136.144.191.118"
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
