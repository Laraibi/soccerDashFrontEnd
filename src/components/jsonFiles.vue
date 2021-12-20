<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>File</th>
            <th>Import</th>
            <th>Imported By</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file, index) in jsonFiles" :key="index">
            <td>{{ file.fileName }}</td>
            <td>
              <button v-if="!file.isImported" class="btn btn-info" @click="startImport(file.fileName)">
                Import
              </button>
              <button v-else class="btn btn-secondary" disabled>
                Imported
              </button>
            </td>
            <td>
              {{file.user != null ? file.user.name : file.user}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "jsonFiles",
  methods: {
    startImport(fileName) {
      this.$store.dispatch("startImport", fileName);
    },
  },
  created() {
    this.$store.dispatch("getAvailableFiles");
  },
  computed: {
    ...mapGetters(["jsonFiles"]),
  },
};
</script>