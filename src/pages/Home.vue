<template>
    <div>
        <h1>Главная</h1>
        <form action="">
            <h2>Сократить ссылку</h2>
            <input type="text" v-model="dataLink.link">
            <button @click.prevent="GET_LINK(dataLink)">Отправить</button>
        </form>
        <div class="list">
            <form class="list-show">
                <input class="input" type="number" v-model="list.offset">
                <input class="input" type="number" v-model="list.limit">
                <button @click.prevent="GET_SHOW_LINKS(list), show = true">Показать список ссылок</button>
            </form>
            <table class="table" v-if="show">
                <tr v-for="item in LINKS" :key="item.id">
                    <td><a :href="item.minlink">{{ item.minlink }}</a></td>
                    <td><a :href="item.target ">{{ item.target }}</a></td>
                    <td><a :href="item.counter ">{{ item.counter }}</a></td>
                </tr>
            </table>
        </div>
        <button @click="exit" class="exit">Выйти</button>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        data() {
            return {
                show: false,
                dataLink: {
                    link: null,
                },
                list: {
                    offset: 0,
                    limit: 10,
                }
            }
        },
        methods: {
            ...mapActions(['GET_LINK']),
            ...mapActions(['GET_SHOW_LINKS']),
            ...mapMutations(['EXIT']),
            exit() {
                this.EXIT()
                this.$router.push('/login')
            }
        },
        computed: {
            ...mapGetters(['LINKS']),
        },
    }
</script>

<style lang="scss" scoped>

</style>