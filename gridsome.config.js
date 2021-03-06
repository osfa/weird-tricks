// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "680 Weird Tricks",
  titleTemplate: "%s", // %s - <siteName> is default
  plugins: [
    {
      use: "@gridsome/source-contentful",
      options: {
        space: process.env.CTF_SPACE_ID, // required
        accessToken: process.env.CTF_ACCESS_TOKEN, // required
        host: "cdn.contentful.com",
        environment: "staging",
        typeName: "Contentful",
      },
    },
  ],
  templates: {
    ContentfulNode: "/nodes/:title",
  },
  chainWebpack(config, { isServer }) {
    if (isServer) {
      config.externals([/^(vue|vue-router|vue-meta)$/]);
    }
  },
  port: 8000,
};
