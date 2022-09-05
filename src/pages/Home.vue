<template>
    <div class="home">
        <div class="home__body">
            <h1 class="home__title">Geksagon</h1>
            <form class="form">
                <h3 class="form__title">Введите ссылку которую хотите сократить</h3>
                <input class="form__field" type="text" v-model="dataLink.link">
                <button class="form__btn" @click.prevent="GET_LINK(dataLink), dataLink.link = null">Сократить</button>
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
                    <button class="form__btn" @click.prevent="GET_SHOW_LINKS(list), show = !show">{{show ? 'Скрыть и обновить список': 'Показать и обновить список ссылок'}}</button>
                </form>
                <div class="home__table" v-if="show">
                    <form class="form form--table">
                        <div class="form__group">
                            <label class="form__label">
                                <p class="form__label-info">Поиск</p>
                                <input @keyup="search(LINKS, filterSearch)" v-model="filterSearch" type="text" class="form__field">
                            </label>
                            <label class="form__label">
                                <p class="form__label-info">Фильтр по количеству переходов</p>
                                <select @change="filterCounter(this.all, counterFilterText)" v-model="counterFilterText" class="form__field">
                                    <option selected disabled></option>
                                    <option value="По возрастанию">По возрастанию</option>
                                    <option value="По убыванию">По убыванию</option>
                                </select>
                            </label>
                        </div>
                    </form>
                    <div class="table">
                        <div class="table__row">
                            <div class="table__th">Сокращенная ссылка</div>
                            <div class="table__th">Оригинал</div>
                            <div class="table__th">Количество переходов (нажать на кнопку "Скрыть и обновить список")</div>
                        </div>
                        <div class="table__row" v-for="item in all" :key="item.id">
                            <div class="table__col"><a target="_blank" :href="item.minlink">{{ item.minlink }}</a> <button @click="copy(item.minlink)" class="table__btn table__btn--copy">Копировать</button></div>
                            <div class="table__col"><a target="_blank" :href="item.target ">{{ item.target }}</a></div>
                            <div class="table__col table__col--counter"><span>{{ item.counter }}</span> <button @click="GET_UPDATE_LINK(item.short)" class="table__btn">Обновить</button></div>
                        </div>
                    </div>
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
                counterFilterText: '',
                filterSearch: '',
                all: [],
                show: false,
                dataLink: {
                    link: null,
                },
                list: {
                    offset: 0,
                    limit: 0,
                }
            }
        },
        methods: {
            ...mapActions(['GET_LINK']),
            ...mapActions(['GET_SHOW_LINKS']),
            ...mapActions(['GET_UPDATE_LINK']),
            ...mapMutations(['EXIT']),
            ...mapMutations(['SET_FILTERSEARCH']),
            exit() {
                this.EXIT()
                this.$router.push('/login')
            },
            search(arr, text) {
                let myArray = []
                arr.filter(element => {
                    for (let key in element) {
                        if (String(element[key]).toUpperCase().indexOf(text.toUpperCase()) !== -1) return myArray.push(element)
                    }
                })
                return this.all = myArray
            },
            filterCounter(arr, param) {
                if (param == 'По возрастанию') {
                    arr.sort((a, b) => a.counter - b.counter).reverse()
                } else if (param == 'По убыванию') {
                    arr.sort((a, b) => a.counter - b.counter)
                }
            },
            copy(link) {
                navigator.clipboard.writeText(link);
            }
        },
        computed: {
            ...mapGetters(['LINKS']),
        },

        watch: {
            '$store.state.links': function () { this.search(this.$store.state.links, this.filterSearch) }
        }
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
        width: 100%;

        &__form {
            padding: 15px;
            border: 1px solid #fff;
        }

        &__body {
            flex-grow: 1;
            width: 100%;
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
        background-color: #fff;

        &__row {
            display: flex;
        }

        &__th {
            background-color: #028e8f;
            color: #fff;
            padding: 10px;
            font-family: sans-serif;
            font-size: 12px;
            width: 33.333%;
            min-width: 200px;
        }

        &__col {
            position: relative;
            min-width: 130px;
            padding: 10px;
            border: 1px solid rgb(204, 204, 204);
            font-size: 12px;
            font-family: sans-serif;
            width: 33.333%;
            overflow-wrap: break-word;

            &:hover {
                .table__btn--copy {
                    opacity: 1;
                }
            }

            &--counter {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        &__btn {
            padding: 5px;
            font-size: 12px;
            background-color: #4b1e79;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;

            &--copy {
                opacity: 0;
                position: absolute;
                top: -1px;
                right: -1px;
                border: 0;
                background-color: #028e8f;
                border-radius: 0;
                font-size: 10px;
                transition: 0.3s;
            }

            &:hover {
                background-color: #6221a3;
            }

            &:active {
                transform: scale(.98);
            }
        }
    }

    @media (max-width: 768px) {
        .table {
            display: table;

            &__btn--copy {
                opacity: 1;
                top: auto;
                bottom: -1px;
            }
        }

        .home__table {
            overflow: auto;
        }
    }
</style>