<template>
    <div class="mail-container">
        <div class="mailbox">
            <div class="mail" v-for="(mail, index) in serverData.data" v-bind:key="index" @click="messageSet = index">
                <div class="title">
                    <font-awesome-icon class="icon" icon="envelope" />
                    <b>{{mail.title}}</b>
                </div>
                <div>
                    <b v-if="mail.sender">Sender:{{mail.sender}}</b>
                    <b v-else> Admin message</b>
                </div>
            </div>
            <button class="box-button" @click="sendMail = !sendMail">New message</button>
        </div>
        <div class="textboxes">
            <div class="textbox" v-if="serverData.data[messageSet]">
                <b>Title</b> {{serverData.data[messageSet].title}}<br>
                <div v-if="serverData.data[messageSet].sender">
                    <b>Sender</b> {{serverData.data[messageSet].sender.username}}<br>
                </div>
                <b>Recipient</b> {{serverData.data[messageSet].recipient.username}}<br>
                <hr>
                {{serverData.data[messageSet].body}}
            </div>
            <hr v-if="serverData.data[messageSet] && sendMail">
            <div class="textbox" v-if="sendMail">
                <div style="display: flex; flex-direction: column">
                    <div>
                        <div style="min-width: 90px">Title</div>
                        <input style="padding: 8px; width: -webkit-fill-available" value="new message"/>
                    </div>
                    <div>
                        <div style="min-width: 90px">To </div>
                        <input style="padding: 8px; width: -webkit-fill-available" value="new message"/>
                    </div>
                </div>
                <textarea class="textarea"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['serverData'],
        name: "MailComponent",
        data: function(){
            return {
                messageSet: -1,
                sendMail: false
            }
        },
        mounted() {
            //Set path
            this.$emit('emitpath', "notification", "")
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
        font-size: 20px;
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

    textarea{
        display: inline-block;
        border: 1px solid #ccc;
        margin-top: 25px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
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

    .textboxes{
        width: 100%;
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