<template>
  <div class="row">
    <div class="col"><button class="btn btn-secondary" @click="refresh">refresh</button></div>
    <div class="col">
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
              <button
                v-if="!file.isImported"
                class="btn btn-info"
                @click="startImport(file.fileName)"
              >
                Import
              </button>
              <button v-else class="btn btn-secondary" disabled>
                Imported
              </button>
            </td>
            <td>
              {{ file.user != null ? file.user.name : file.user }}
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
    test() {
      console.log(this.importedJsonFiles.slice(-1)[0].fileName);
    },
    startImport(fileName) {
      this.$store.dispatch("startImport", fileName).then((response) => {
        console.log(response);
        this.$notify(
          `FileName : ${this.importedJsonFiles.slice(-1)[0].fileName} imported`
        );
      });
    },
    refresh(){
      this.$store.dispatch('getAvailableFiles')
    }
  },
  created() {
    this.$store.dispatch("getAvailableFiles");
  },
  // watch:{
  //   importedJsonFiles(){
  //     console.log("importedJsonFiles was changed")
  //   }
  // },
  computed: {
    ...mapGetters(["jsonFiles", "importedJsonFiles"]),
  },
};
</script>