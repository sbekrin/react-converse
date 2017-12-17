const path = require('path');

module.exports = {
  title: '🤖💬',
  components: 'src/@(containers|hocs)/**/*.js',
  require: [path.resolve(__dirname, 'docs/setup')],
  highlightTheme: 'monokai',
  sections: [
    { name: 'Introduction', content: 'docs/introduction.md' },
    { name: 'Quick Start', content: 'docs/quick-start.md' },
    { name: 'API', content: 'docs/api.md' },
  ],
  theme: {
    sidebarWidth: 220,
    color: {
      link: 'blue',
      linkHover: 'darkblue',
      sidebarBackground: 'blue',
    },
  },
  styles: {
    StyleGuide: {
      root: {
        'text-rendering': 'optimizeLegibility',
        '-webkit-font-smoothing': 'antialiased',
      },
      content: {
        margin: 0,
        maxWidth: '820px',
      },
      logo: {
        border: 'none',
      },
    },
    Logo: {
      logo: {
        backgroundColor: '#fff',
        display: 'inline',
        padding: '5px 10px',
        borderRadius: 30,
        color: '#333',
        fontSize: 30,
      },
    },
    ComponentsList: {
      item: {
        '& a': {
          color: 'rgba(255, 255, 255, 0.9) !important',
          fontWeight: 500,
          '&:hover': {
            color: '#fff !important',
          },
        },
      },
      heading: {
        fontSize: '18px !important',
        fontWeight: '600 !important',
        color: '#fff !important',
      },
    },
    SectionHeading: {
      heading: {
        textDecoration: 'none',
        '&::after': {
          content: '"#"',
          display: 'none',
          marginLeft: 6,
          color: 'rgba(0, 0, 0, 0.3)',
          fontWeight: '600',
        },
        '&:hover': {
          textDecoration: 'none',
        },
        '&:hover::after': {
          display: 'inline-block',
        },
      },
    },
    TableOfContents: {
      search: {
        paddingTop: 10,
        paddingBottom: 10,
      },
      input: {
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '4px',
        padding: '6px 8px',
        lineHeight: '22px',
        color: '#fff',
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
        '&::-webkit-input-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '&:-moz-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '&::-moz-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '&:-ms-input-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.7)',
        },
        '&:focus': {
          borderColor: '#fff !important',
          '&::-webkit-input-placeholder': {
            color: 'rgba(255, 255, 255, 0.9)',
          },
          '&:-moz-placeholder': {
            color: 'rgba(255, 255, 255, 0.9)',
          },
          '&::-moz-placeholder': {
            color: 'rgba(255, 255, 255, 0.9)',
          },
          '&:-ms-input-placeholder': {
            color: 'rgba(255, 255, 255, 0.9)',
          },
        },
      },
    },
  },
};
