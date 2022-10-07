<template>
  <v-row justify="space-around">
    <v-icon
      icon="mdi-bell-ring-outline"
    />
    <v-icon
      icon="mdi-help-circle-outline"
    />
    <v-icon
      icon="mdi-cog-outline"
    />
    <v-img :src="require('/src/assets/svg/profile.svg')" />
  </v-row>
</template>
<script>
export default {
  name: 'AccountSection',
};
</script>

<style scoped>

</style>
