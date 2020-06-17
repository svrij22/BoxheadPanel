<template>
    <div class="box-container">

        <div class="video-background">
            <div class="video-foreground">
                <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ"
                        frameborder="0" allowfullscreen></iframe>
            </div>
        </div>

        <div class="form">
            <b>{{regMsg}}</b>
            <br>
            <hr>
            <label><b>Username</b></label>
            <input v-model="username" type="text" placeholder="Enter Username" required>
            <label><b>Password</b></label>
            <input v-model="password" type="password" placeholder="Enter Password" required>
            <label><b>Register key</b></label>
            <input v-model="regkey" type="text" placeholder="Enter Register key" required>
            <button class="box-button" @click="auth" type="submit">Register</button>
        </div>

        <div id="note">
            <b>{{servernote}}</b>
        </div>
    </div>
</template>

<script>

    import axios from "axios";
    import querystring from "query-string";

    export default {
        name: "LoginComponent",
        data: function () {
            return {
                username: "",
                password: "",
                regkey: "",
                regMsg: "Register Please",
                servernote: ""
            }
        },
        methods: {
            auth: function () {
                //Do a request
                console.log("Register attempt");
                this.servernote = "";

                axios.post(`${this.$store.state.serverAddress}/authentication/register`, querystring.stringify({
                    username: this.username,
                    password: this.password,
                    regkey: this.regkey
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

                        //Check status
                        this.servernote = "An error occurred"
                        if (error?.response?.data) {
                            this.servernote = error?.response?.data;
                            this.regMsg = error?.response?.data;
                        }
                        this.servernote += " - " + error.toString() + " - We're sorry :(";
                    })
            }
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