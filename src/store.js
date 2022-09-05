import { createStore } from 'vuex'

export default createStore({
    state: {
        auth: false,
        username: '',
        access_token: '',
        token_type: '',
        links: [],
        users: []
    },
    actions: {
        GET_AUTH(context, payload) {
            let request = fetch(`http://79.143.31.216/login`, {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=&username=${payload.username}&password=${payload.password}&scope=&client_id=&client_secret=`
            });
            request.then(response => {
                return response.json();
            })
            .then((data) => {
                if(data.access_token) {
                    data.username = payload.username
                    data.password = payload.password
                    context.commit('SET_AUTH', data)
                }
            })
        },

        GET_REGISTER(context, payload) {
            let request = fetch(`http://79.143.31.216/register?username=${payload.username}&password=${payload.password}`, {
                headers: {
                    'accept': 'application/json',
                },
                method: "POST",
            });
            request.then(response => {
                return response.json();
            })
            .then((data) => {
                if(data.username == payload.username) {
                    data.username = payload.username
                    data.password = payload.password
                    context.commit('SET_REGISTER', data)
                }
            })
        },

        GET_LINK(context, payload) {
            if(payload.link) {
                let request = fetch(`http://79.143.31.216/squeeze?link=${payload.link}`, {
                    method: "POST",
                    headers: {
                        'Authorization': `${this.state.token_type} ${this.state.access_token}`,
                        'accept': 'application/json',
                    },
                });
                request.then(response => {
                    return response.json();
                })
                .then((data) => {
                    data.minlink = 'http://79.143.31.216/s/'+data.short
                    if(data.short) return context.commit('SET_LINK', data)
                })
            }
        },

        GET_SHOW_LINKS(context, payload) {
            let request = fetch(`http://79.143.31.216/statistics?offset=${payload.offset}&limit=${payload.limit}`, {
                method: "GET",
                headers: {
                    'accept': 'application/json',
                    'Authorization': `${this.state.token_type} ${this.state.access_token}`,
                },
            });
            request.then(response => {
                return response.json();
            })
            .then((data) => {
                context.commit('SET_SHOW_LINKS', data)
            })
        }
    },
    mutations: {
        SET_AUTH(state, payload) {
            state.username = payload.username
            state.access_token = payload.access_token
            state.token_type = payload.token_type

            if(state.users.length) {
                for(let i = 0; i < state.users.length; i++) {
                    if(state.users[i].username == payload.username) {
                        state.users[i].access_token = payload.access_token
                        state.links = state.users[i].links
                        state.auth = true
                        return
                    }
                }
            }

            state.users.push({
                id: new Date() + Math.random(),
                username: payload.username,
                password: payload.password,
                access_token: payload.access_token,
                token_type: payload.token_type,
                links: [],
            })
            state.auth = true
            return
        },

        SET_REGISTER(state, payload) {
            state.users.push({
                id: new Date() + Math.random(),
                username: payload.username,
                password: payload.password,
                links: [],
            })
            return
        },

        SET_LINK(state, payload) {
            for(let i = 0; i <= state.users.length; i++) {
                if(state.users[i].username == state.username) {
                    state.users[i].links.push(payload)
                    state.links = state.users[i].links
                    return
                }
            }
        },

        SET_SHOW_LINKS(state, payload) {
            payload.forEach(element => {
                element.minlink = 'http://79.143.31.216/s/'+element.short
            })
            for(let i = 0; i < state.users.length; i++) {
                if(state.users[i].username == state.username) {
                    state.users[i].links = payload
                    state.links = payload
                }
            }
        },

        EXIT(state, payload) {
            state.auth = false
            state.username = ""
            state.access_token = ""
            state.links = []
        },
    },
    getters: {
        LINKS(state) {
            return state.links;
        },
    }
})