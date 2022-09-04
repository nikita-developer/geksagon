<template>
    <div>
        <h1>Регистрация</h1>
        <form>
            <input v-model="register.username" type="text" placeholder="Логин">
            <input v-model="register.password" type="text" placeholder="Пароль">
            <button @click.prevent="GET_REGISTER(register)" type="submit">Зарегаться</button>
            <p>
                <router-link to="/Login">Уже есть аккаунт?</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            register: {
                username: null,
                password: null,
            }
        }
    },
    methods: {
        ...mapActions(['GET_REGISTER']),
    }
}
</script>

<style lang="scss" scoped>

</style>