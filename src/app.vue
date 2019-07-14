<template>
    <div id="app">
        <router-link :to="{path: '/'}">home</router-link>
        <router-link :to="{path: '/test'}">test</router-link>
        <router-view/>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>