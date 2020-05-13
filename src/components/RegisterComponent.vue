<template>
    <div class="container">
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
                authkey: "",
                regkey: "",
                regMsg: "Register Please"
            }
        },
        watch:{
            serverData: function(val){
                console.log(val);
                if (this.serverData === 409) this.regMsg = "Can't find player";
                if (this.serverData === 401) this.regMsg = "Access Denied";
            }
        },
        methods: {
            auth(){
                this.authkey = "auth" + new Buffer(this.username + ":" + this.passw).toString("base64");
                this.$emit('emitpath', "register");
                this.$emit('emitauth', this.authkey, this.username);
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .form{
        max-width: 500px;
        max-height: 500px;
        font-size: 23px;
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