<template>
    <div class="content">
        <button class="notif-btn"
                @click="doSwitch()"> {{isActive ?'': unreadAmount}}
                <font-awesome-icon :icon="isActive ? 'times' : 'envelope'"/>
        </button>
        <div class="notification-box" v-if="isActive">
            <h4><font-awesome-icon icon="envelope"/>Notifications</h4>
            <div id="box-view">
                <div class="notification-item" v-for="(i) in notifications" v-bind:key="i">
                    <div class="header">
                        <div class="titlebox"><font-awesome-icon icon="envelope"/><span v-bind:class="{title: true, isRead: i.read}">{{i.title}}</span><font-awesome-icon style="cursor: pointer" @click="deleteMsg(i)" icon="times"/></div>
                        <i>{{i.dateStr}}</i>
                    </div>
                    <p>{{i.body}}</p>
                </div>
            </div>
            <div class="new-note">
                <h5><font-awesome-icon icon="envelope"/>New</h5>
                <input v-model="msgTitle" placeholder="New notification"/>
                <textarea v-model="msgBody" placeholder="My notification body"/>
                <input class="box-button" type="button" value="POST" @click="postMsg">
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    // eslint-disable-next-line no-unused-vars
    import _ from "lodash";
    import * as querystring from "query-string";

    export default {
        name: "NotificationComponent",
        data: function () {
            return{
                notifications: [],
                isActive: false,
                unreadAmount: 0,
                msgTitle: "",
                msgBody: ""
            }
        },
        methods: {
            refreshMessages: _.throttle(function(){
                axios.get(`http://${this.$store.state.serverAddress}/rest/notification/`,{
                    headers: this.$store.getters.getHeader
                }).then((response) =>{
                    this.notifications = response.data;
                    this.sortItems();
                })
            }, 10000),
            sendRead: function(){
                axios.put(`http://${this.$store.state.serverAddress}/rest/notification/`,{
                    headers: this.$store.getters.getHeader
                }).then((response) =>{
                    this.notifications = response.data;
                    this.sortItems();
                })
            },
            deleteMsg: function (notification){
                axios.delete(`http://${this.$store.state.serverAddress}/rest/notification/${JSON.stringify(notification)}`,{
                    headers: this.$store.getters.getHeader
                }).then((response) =>{
                    this.notifications = response.data;
                    this.sortItems();
                })
            },
            postMsg(){
                axios.post(`http://${this.$store.state.serverAddress}/rest/notification/`, querystring.stringify({
                        title: this.msgTitle,
                        body: this.msgBody
                    }), {
                    headers: this.$store.getters.getHeader
                }).then((response) =>{
                    this.notifications = response.data;
                    this.sortItems();
                })
            },
            doSwitch(){
                this.isActive = !this.isActive
                if (!this.isActive) this.sendRead();
            },
            sortItems(){
                this.unreadAmount = 0;
                this.notifications.forEach((item) =>{
                    this.unreadAmount += !item.read;
                })
                this.notifications = _.orderBy(this.notifications, 'dateNum', 'desc')
            }
        },
        mounted() {
            this.refreshMessages();
        }
    }
</script>

<style scoped>

    .new-note{
        margin-top: auto;
    }

    .new-note textarea{
        height: 120px;
        resize: none;
        margin: auto;
        width: 100%;
        padding: 15px;
    }

    .new-note input{
        width: 100%;
        margin: 0;

    }

    .notif-btn{
        position: absolute;
        top: 18px;
        right: 15px;
        border: 2px solid gray;
        border-radius: 5px;
        min-width: 32px;
    }

    @media only screen and (max-width: 500px) {
        .notif-btn{
            min-width: 60px;
            height: 60px;
            font-size: 35px;
            z-index: 1;
        }

        .content{
            border-top: 50px solid #111;
        }
    }

    .notification-box{
        border-left: 1px solid #c6c6c6;
        min-width: 280px;

        background-color: #f6f6f6;
        padding-top: 20px;
        padding-bottom: 16px;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    #box-view{
        overflow-y: scroll;
    }

    .notification-box svg{
        margin-right: 10px;
    }

    .notification-box h4{
        padding-bottom: 20px;
        border-bottom: 8px solid #bdd4b5;
        padding-right: 20px;
    }

    .titlebox{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .notification-box span.title{
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
        font-weight: 700;
    }

    .isRead{
        color: gray;
    }

    hr{
        color: #2c3e50;
    }

    .notification-item .header{
        border-bottom: 1px solid rgba(128, 128, 128, 0.8);
    }

    .notification-item:nth-child(2n+1){
        background-color: #bdd4b5;
    }

    .notification-item i{
        color: gray;
    }

    .notification-item{
        padding: 10px;
        width: 100%;
        min-height: 100px;
        text-align: left;
    }
</style>