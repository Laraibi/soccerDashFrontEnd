<template>
<div class="container">
    <table class="table table-bordered">
        <thead>
            <tr>
                <td>#</td>
                <td>Username</td>
                <td>Totoal Pronos</td>
                <td>Réussis</td>
                <td>Perdus</td>
                <td>Programmés</td>
                
            </tr>
        </thead>
    </table>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["allUserPronos"]),
  },
  created() {
    this.$store.dispatch("");
  },
};
</script>

<style>
</style>