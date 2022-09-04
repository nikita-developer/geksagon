<template>
    <div class="home">
        <div class="home__body">
            <h1 class="home__title">Geksagon</h1>
            <form class="form">
                <h3 class="form__title">Введите ссылку которую хотите сократить</h3>
                <input class="form__field" type="text" v-model="dataLink.link">
                <button class="form__btn" @click.prevent="GET_LINK(dataLink)">Отправить</button>
            </form>
            <div class="list">
                <form class="form home__form">
                    <h3 class="form__title">Список всех ссылок</h3>
                    <div class="form__group">
                        <label for="" class="form__label">
                            <p class="form__label-info">Я так и не понял что это за параметр &#128517;</p>
                            <input class="form__field" type="number" v-model="list.offset">
                        </label>
                        <label for="" class="form__label">
                            <p class="form__label-info">Количество отображаемых ссылок &#128512;</p>
                            <input class="form__field" type="number" v-model="list.limit">
                        </label>
                    </div>
                    <button class="form__btn" @click.prevent="GET_SHOW_LINKS(list), show = true">Показать список ссылок</button>
                </form>
                <div class="home__table">
                    <table class="table" v-if="show">
                        <tr>
                            <th>Сокращенная ссылка</th>
                            <th>Оригинал</th>
                            <th>Количество переходов (нажать на кнопку "Показать список ссылок" для обновления, нужно чуть подождать)</th>
                        </tr>
                        <tr v-for="item in LINKS" :key="item.id">
                            <td><a target="_blank" :href="item.minlink">{{ item.minlink }}</a></td>
                            <td><a target="_blank" :href="item.target ">{{ item.target }}</a></td>
                            <td>{{ item.counter }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="home__footer">
                <button @click="exit" class="home__btn">Хотите выйти? &#128546;</button>
            </div>
        </div>
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
    .home {
        display: flex;
        flex-grow: 1;
        background-color: #4b1e79;
        padding-right: 15px;
        padding-left: 15px;
        padding-top: 60px;
        padding-bottom: 60px;

        &__form {
            padding: 15px;
            border: 1px solid #fff;
        }

        &__table {
            overflow: auto;
        }

        &__body {
            flex-grow: 1;
        }

        &__title {
            color: #fff;
            text-align: center;
            margin-bottom: 30px;
        }

        &__footer {
            display: flex;
            justify-content: center;
            margin-top: 30px;
        }

        &__btn {
            padding: 10px 40px;
            background-color: #bd322f;
            color: #fff;
            font-weight: 700;
            font-size: 18px;
            border: 0;
            cursor: pointer;
            margin-bottom: 15px;
        
            &:hover {
                background-color: #a01513;
            }
        }
    }

    .table {
        width: 100%;
        background-color: #fff;

        th {
            background-color: #028e8f;
            color: #fff;
            padding: 10px;
            font-family: sans-serif;
            font-size: 12px;
        }

        td {
            padding: 10px; 
            border: 1px solid rgb(204, 204, 204);
            font-size: 12px;
            font-family: sans-serif;
        }
    }

    @media (max-width: 768px) {
        .home {
            &__table {
                max-width: calc(100vw - 30px);
            }
        }
    }
</style>