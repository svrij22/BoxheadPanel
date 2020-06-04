<template>
    <div class="box-container">

        <div class="video-background">
            <div class="video-foreground">
                <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>

        <div id="vidtop-content" class="playbox">
            <div class="gameform">
                <img src="@/assets/logo.png" class="logo" alt="Boxhead Logo">
                <h2>
                    Free to play
                </h2>
                <h3>
                    Boxhead is a multiplayer zombie shooter now available on the Play Store!
                </h3>
                <img src="@/assets/googlelink.png" class="button" alt="Google Play Link">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlayComponent"
    }
</script>

<style scoped>
    @import '../assets/ytback.css';

    .gameform{
        background: rgba(239, 234, 234, 0.9);
        padding: 26px;
        border-radius: 25px;
        margin-top: 50px;
        width: 100%;
        max-width: fit-content;
    }

    .logo{
        margin-top: 50px;
        padding: 10px;
        max-width: 400px;
        width: inherit;
    }

    .button{
        padding: 50px;
        max-width: 300px;
        width: inherit;
    }

    .box-container{
        width: 100%;
        margin: 0!important;
    }

    .playbox{
        background-image: url("../assets/blacktex.png");
        background-repeat: repeat-x;
        background-size: 500px;
        height: 100%;
        width: inherit;
        display: flex;
        flex-direction: column;
        align-content: space-around;
        align-items: center;
    }

</style>