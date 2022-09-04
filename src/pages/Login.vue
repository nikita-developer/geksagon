<template>
    <div class="login">
        <div class="login__body">
            <h1 class="login__title">Авторизация</h1>
            <form class="form">
                <input class="form__field" v-model="auth.username" type="text" placeholder="Логин">
                <input class="form__field" v-model="auth.password" type="text" placeholder="Пароль">
                <button class="form__btn" @click.prevent="GET_AUTH(auth)" type="submit">Войти</button>
                <div class="form__footer">
                    <router-link to="/Register">Зарегистрироваться</router-link>
                </div>
                <p>{{redirect}}</p>
            </form>
        </div>
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

<style lang="scss">
    .login {
        display: flex;
        flex-grow: 1;
        background-color: #038f90;

        &__body {
            margin: auto;
            padding: 30px;
            background-color: #cec101;
            min-width: 280px;
        }

        &__title {
            text-align: center;
            margin-bottom: 15px;
        }
    }
</style>