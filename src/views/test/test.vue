<template>
    <div class="wrap">
        {{text}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: "231321"
        }
    },
    onLoad() {
        console.log(1111)
    }
}
</script>

<style lang="less" scoped>
.wrap{
    background: #ccc;
}
</style>

