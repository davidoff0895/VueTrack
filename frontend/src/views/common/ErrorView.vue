<template>
  <v-container
    fluid
    class="not-found"
  >
    <v-row
      justify="center"
      class="ma-16"
    >
      <v-col class="v-col-md-3">
        <v-img :src="require('@/assets/svg/404.svg')" />
      </v-col>
      <v-col class="v-col-md-3 d-flex not-found__text">
        <v-card color="background">
          <v-card-title class="text-h5">
            Oops..
          </v-card-title>
          <v-card-text>
            Something went wrong. We are already working on it :)
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.not-found {
  &__text {
    align-items: center;
  }
  .v-card--variant-elevated {
    box-shadow: none;
  }
}
</style>
