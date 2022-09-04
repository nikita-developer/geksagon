<template>
	<div class="geksagon">
		<header class="header">
			<!-- <nav>
				<router-link v-if="$store.state.auth" to="/">Главная</router-link>
				<router-link v-if="!$store.state.auth" to="/Login">Войти</router-link>
				<router-link v-if="!$store.state.auth" to="/Register">Зарегаться</router-link>
			</nav> -->
		</header>
		<div class="geksagon__body">
			<router-view></router-view>
		</div>
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

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.geksagon {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-width: 100vw;

		&__body {
			display: flex;
			flex-grow: 1;
		}
	}

	.form {
		display: flex;
		flex-direction: column;

		&__title {
			color: #fff;
			margin-bottom: 20px;
			font-size: 20px;
		}

		&__field {
			padding: 10px 10px;
			border: 1px solid gray;
			margin-bottom: 15px;
			font-size: 18px;
			width: 100%;

			&:focus {
				outline: 0;
			}
		}

		&__btn {
			padding: 10px 15px;
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

		&__label {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		&__group {
			display: flex;
			justify-content: space-between;

			& .form__label {
				width: calc(50% - 7.5px);
			}
		}

		&__label-info {
			color: #fff;
			margin-bottom: 5px;
		}

		&__footer {
			text-align: center;

			& a {
				color: #000;
			}
		}
	}
</style>