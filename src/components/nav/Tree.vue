<template>
  <v-treeview
    :open="initiallyOpen"
    :items="items"
    activatable
    item-key="name"
    open-on-click
    :active.sync="active"
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">
        {{ open ? "mdi-folder-open" : "mdi-folder" }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
  </v-treeview>
</template>
<script>
export default {
  data: () => ({
    initiallyOpen: ["public", "static"],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      test: "mdi-approximately-equal",
    },
    // tree: [],
    active: [],
    items: [
      {
        name: "public",
        children: [
          {
            name: "static",
            children: [
              {
                name: "logo.png",
                file: "test",
                to: "/blog",
              },
            ],
          },
          {
            name: "favicon.ico",
            file: "png",
            to: "/blog",
          },
          {
            name: "index.html",
            file: "html",
            to: "/blog",
          },
        ],
      },
      {
        name: ".gitignore",
        file: "txt",
        to: "/blog",
      },
    ],
  }),
  watch: {
    active(arr) {
      console.log(arr);
      if (arr.length) {
        this.onClick(arr[0]);
      }
    },
  },
  methods: {
    onClick(item) {
      console.log("click", item);
    },
  },
};
</script>
