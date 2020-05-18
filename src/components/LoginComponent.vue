<template>
    <div class="box-container">

        <div class="video-background">
            <div class="video-foreground">
                <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>

        <div class="form">
            <b>Login please</b>
            <br>
            <hr>
            <label><b>Username</b></label>
            <input v-model="username" type="text" placeholder="Enter Username" required>
            <label><b>Password</b></label>
            <input v-model="passw" type="password" placeholder="Enter Password" required>
            <button class="box-button" @click="auth" type="submit">Login</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent",
        data: function(){
            return{
                username: "",
                passw: ""
            }
        },
        methods: {
            auth(){
                this.$emit('emitauth', this.passw, this.username, "");
            }
        },
        mounted(){
            this.$emit('emitpath', "login", "");
        }
    }
</script>

<style scoped>
    @import '../assets/ytback.css';

    .box-container{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    button {
        margin: 8px 0;
        width: 100%;
    }
</style>