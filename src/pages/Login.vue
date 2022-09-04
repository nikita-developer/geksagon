<template>
    <div>
        <h1>Авторизация</h1>
        <form>
            <input v-model="auth.username" type="text" placeholder="Логин">
            <input v-model="auth.password" type="text" placeholder="Пароль">
            <button @click.prevent="GET_AUTH(auth)" type="submit">Войти</button>
            <p>
                <router-link to="/Register">Хотите зарегаться?</router-link>
            </p>
            <p>{{redirect}}</p>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                auth: {
                    username: null,
                    password: null,
                }
            }
        },
        methods: {
            ...mapActions(['GET_AUTH']),
        },
        computed: {
            redirect() {
                if(this.$store.state.auth) {
                    this.$router.push('/')
                }
                return
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>