<template>
    <div class="register">
        <div class="register__body">
            <h1 class="register__title">Регистрация</h1>
            <form class="form">
                <input class="form__field" v-model="register.username" type="text" placeholder="Логин">
                <input class="form__field" v-model="register.password" type="text" placeholder="Пароль">
                <button class="form__btn" @click.prevent="GET_REGISTER(register)" type="submit">Зарегистрироваться</button>
                <div class="form__footer">
                    <router-link to="/Login">Уже есть аккаунт?</router-link>
                </div>
                <p>{{succesRegister}}</p>
            </form>
        </div>
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
    },
    computed: {
        succesRegister() {
            this.$store.state.users.forEach(element => {
                if(element.username == this.register.username) {
                    this.$router.push('/Login')
                }
            });
            return
        }
    },
}
</script>

<style lang="scss" scoped>


    .register {
        display: flex;
        flex-grow: 1;
        background-color: #cec101;

        &__body {
            margin: auto;
            padding: 30px;
            background-color: #038f90;
            min-width: 280px;
        }

        &__title {
            text-align: center;
            margin-bottom: 15px;
        }
    }
</style>