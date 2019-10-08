module.exports = {
  siteMetadata: {
    title: 'ラリルレロ',
    description: '一日一万回、感謝の「がんばるぞい」',
    author: 'nabeliwo',
    siteUrl: 'https://blog.nabeliwo.com',
    image: 'https://blog.nabeliwo.com/images/logo.png',
    social: {
      twitter: {
        name: 'nabeliwo',
        url: 'https://twitter.com/nabeliwo',
      },
      instagram: {
        name: 'nabeliwo',
        url: 'https://www.instagram.com/nabeliwo',
      },
      github: {
        name: 'nabeliwo',
        url: 'https://github.com/nabeliwo',
      },
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: '@raae/gatsby-remark-oembed',
            options: {
              usePrefix: true,
              providers: {
                include: ['Instagram'],
                settings: {
                  Instagram: {
                    hidecaption: true,
                    maxwidth: 500,
                  },
                },
              },
            },
          },
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 560,
              height: 315,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: 'hoge',
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-emoji',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { fields: [frontmatter___date], order: DESC },
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        description
                        date
                      }
                      fields { slug }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "nabeliwo blog's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ラリルレロ',
        short_name: 'ラリルレロ',
        start_url: '/?utm_source=homescreen',
        background_color: '#fff',
        theme_color: '#20bffc',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-twitter',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
  ],
}
