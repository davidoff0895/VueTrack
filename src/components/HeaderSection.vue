<template>
  <v-container
    fluid
  >
    <v-row class="align-center">
      <v-col md="9">
        <MainMenu />
      </v-col>
      <v-col md="3">
        <AccountSection />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainMenu from '@/components/MainMenu';
import AccountSection from '@/components/account/AccountSection';
export default {
  name: 'HeaderSection',
  components: { AccountSection, MainMenu },
};
</script>
