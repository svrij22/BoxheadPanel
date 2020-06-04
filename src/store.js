/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: false,
        username: "",
        role: "",
        version: 1,
        serverAddress: "localhost"
    },
    mutations: {
        setLog(state, data) {state.loggedIn = data},
        setName(state, data) {state.username = data},
        setRole(state, data) {state.role = data},
        initialiseStore(state) {
            // Check if the store exists
            if(localStorage.getItem('store')) {
                let store = JSON.parse(localStorage.getItem('store'));

                // Check the version stored against current. If different, don't
                // load the cached version
                if(store.version === state.version) {
                    this.replaceState(
                        Object.assign(state, store)
                    );
                } else {
                    state.version = store.version;
                }
            }
        },
        removeStore(state){
            state = {
                loggedIn: false,
                username: "",
                role: "",
                version: 1
            };
            localStorage.removeItem('store');
        },
        saveStore(state){
            localStorage.setItem('store', JSON.stringify(state));
        }
    }
});