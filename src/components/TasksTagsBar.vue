<template>
	<scrollBar direction="x" :activeIndex="activeIndex">
		<div
			class="scrollBarItem"
			v-for="(item, index) in options"
			:key="index"
			@click="changeNav(item, index)"
			:class="index === activeIndex ? 'active' : null"
		>
			<div>{{item.name}}</div>
		</div>
	</scrollBar>
</template>
<script>
	// 先导入再注册下
	export default {
		data() {
			return {
				activeIndex: 0,
				options: [
					{id: 1, name: '关注'},
					{id: 2, name: '推荐'},
					{id: 3, name: '本地'},
					{id: 4, name: '新闻'},
					{id: 5, name: '汽车'},
					{id: 6, name: '直播'},
					{id: 7, name: '游戏'},
					{id: 8, name: '小说'},
					{id: 9, name: '美女'}
				]
			}
		},
		methods: {
			changeNav(item, index) {
				this.activeIndex = index;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.scrollBarItem {
		padding: 8px;
    color:#4F4D4D;
    font-family: 'ali',sans-serif;
    font-size: 14px;
    display: flex;

    border-right: 1px solid #ccc;

	}
	.active {
		color: rgb(0, 0, 0);
    font-weight: 600;
	}
</style>
