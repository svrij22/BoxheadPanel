<template>
    <div class="mail-container">
        <div class="mailbox">
            <div class="mail" v-for="(mail, index) in serverData.data" v-bind:key="index" @click="messageSet = index">
                <div class="title">
                    <font-awesome-icon class="icon" icon="envelope" />
                    <b>{{mail.title}}</b>
                </div>
                <div>
                    <b>Sender: {{mail.sender}}</b>
                </div>
            </div>
            <button class="box-button">New message</button>
        </div>
        <div class="textbox" v-if="serverData.data[messageSet]">
            <b>Title:</b> {{serverData.data[messageSet].title}}<br>
            <div v-if="serverData.data[messageSet].sender">
                <b>Sender:</b> {{serverData.data[messageSet].sender.username}}<br>
            </div>
            <b>Recipient:</b> {{serverData.data[messageSet].recipient.username}}<br>
            <br>
            {{serverData.data[messageSet].body}}
        </div>
    </div>
</template>

<script>
    export default {
        props: ['serverData'],
        name: "MailComponent",
        data: function(){
            return {
                messageSet: -1
            }
        },
        mounted() {
            //Set path
            this.$emit('emitpath', "game/messages", "")
        }
    }
</script>

<style scoped>

    .mail-container{
        width: 100%;
        display: flex;
        flex-direction: row;
    }


    .textbox{
        text-align: left;
        height: 100%;
        width: 100%;
        border: 3px solid #dddddd;
        border-radius: 8px;
        padding: 16px;
        margin-left: 9px;
        font-size: 25px;
    }

    @media only screen and (max-width: 800px) {
        .mail-container {
            flex-direction: column;
        }

        .textbox{
            margin-left: 0px;
            margin-top: 8px;
        }
    }

    .mailbox{
        height: 100%;
        width: 100%;
        max-width: 500px;

        border: 3px solid #dddddd;
        border-radius: 8px;
        padding: 8px;

        display: flex;
        flex-direction: column;
    }


    .mail{
        height: 100px;
        text-align: left;
        margin: 2px;
    }

    .title{
        display: flex;
        justify-content: space-between;
        padding: 9px;
        border-radius: 8px;
        background: #e1e1e1;
        align-items: center;
    }

    .icon{
        font-size: 30px;
    }

    .box-button{
        margin: 0px;
        margin-top: auto;
        width: 100%;
        flex-grow: 0;
    }
</style>