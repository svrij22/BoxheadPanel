<template>
    <div class="box-container">

        <div class="video-background">
            <div class="video-foreground">
                <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ"
                        frameborder="0" allowfullscreen></iframe>
            </div>
        </div>

        <div class="form">
            <b>Login please</b>
            <br>
            <hr>
            <label><b>Username</b></label>
            <input v-model="username" type="text" placeholder="Enter Username" required>
            <label><b>Password</b></label>
            <input v-model="password" type="password" placeholder="Enter Password" required>
            <button class="box-button" @click="auth" type="submit">Login</button>
        </div>

        <div id="note">
            <b>{{servernote}}</b>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import querystring from 'query-string';

    export default {
        name: "LoginComponent",
        data: function () {
            return {
                username: "",
                password: "",
                servernote: ""
            }
        },
        methods: {
            auth() {
                //Do a request
                console.log("Login attempt");
                this.servernote = "";

                axios.post(`${this.$store.state.serverAddress}/authentication/`, querystring.stringify({
                    username: this.username,
                    password: this.password
                }))
                    .then((response) => {

                        //If trying to login or register move to info
                        let path = this.$route.path;
                        if (path === '/login' || path === "/register") {
                            if (response.data.JWT) {
                                window.sessionStorage.setItem("JWT", response.data.JWT);
                                this.$store.commit('setLog', true);
                                this.$store.commit('setName', this.username);
                                this.$store.commit('setRole', response.data.role);
                                this.$store.commit('saveStore');
                                this.$router.push("/info");
                            }
                        }
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);

                        //Register error
                        let status = "Error";
                        if (error?.response?.status) status = error?.response?.status;

                        this.serverData = status;
                        this.servernote = status + " - " + error.toString() + " - We're sorry :(";
                    })
            }
        },
        mounted() {
            this.$emit('emitpath', "login", "");
        }
    }
</script>

<style scoped>
    @import '../assets/ytback.css';

    .box-container {
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