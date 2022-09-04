<template>
	<div>
		<header>
			<nav>
				<router-link v-if="$store.state.auth" to="/">Главная</router-link>
				<router-link v-if="!$store.state.auth" to="/Login">Войти</router-link>
				<router-link v-if="!$store.state.auth" to="/Register">Зарегаться</router-link>
			</nav>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>