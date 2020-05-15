<template>
    <div class="container">

        <div class="video-background">
            <div class="video-foreground">
                <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>

        <div class="form">
            <b>{{regMsg}}</b>
            <br>
            <hr>
            <label><b>Username</b></label>
            <input v-model="username" type="text" placeholder="Enter Username" required>
            <label><b>Password</b></label>
            <input v-model="passw" type="password" placeholder="Enter Password" required>
            <label><b>Register key</b></label>
            <input v-model="regkey" type="text" placeholder="Enter Register key" required>
            <button @click="auth" type="submit">Register</button>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['serverData'],
        name: "LoginComponent",
        data: function(){
            return{
                username: "",
                passw: "",
                regkey: "",
                regMsg: "Register Please"
            }
        },
        watch:{
            serverData: function(val){
                console.log(val);
                if (this.serverData === 404) this.regMsg = "Can't find player";
                if (this.serverData === 409) this.regMsg = "Username taken";
                if (this.serverData === 401) this.regMsg = "Register Key already taken";
                if (this.serverData === 428) this.regMsg = "Fill in username and a (better) password";
                this.serverData = "";
            }
        },
        methods: {
            auth(){
                this.$emit('emitpath', "register", "");
                this.$emit('emitauth', this.passw, this.username, this.regkey);
            }
        }
    }
</script>

<style scoped>
    @import '../assets/ytback.css';

    .container{
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