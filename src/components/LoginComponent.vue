<template>
    <div class="container">
        <div class="form">
            <b>Login please</b>
            <br>
            <hr>
            <label><b>Username</b></label>
            <input v-model="username" type="text" placeholder="Enter Username" required>
            <label><b>Password</b></label>
            <input v-model="passw" type="password" placeholder="Enter Password" required>
            <button @click="auth" type="submit">Login</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent",
        data: function(){
            return{
                username: "",
                passw: "",
                authkey: ""
            }
        },
        methods: {
            auth(){
                this.authkey = "auth" + new Buffer(this.username + ":" + this.passw).toString("base64");
                this.$emit('emitauth', this.authkey, this.username)
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
        background-color: #af211c;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    button:hover {
        opacity: 0.8;
    }
</style>