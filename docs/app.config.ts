import packageJson from '../package.json'

export default defineAppConfig({
  docus: {
    title: packageJson.name,
    description: packageJson.description,
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
    },
    footer: {
      credits: {
        text: 'Made with ❤️ by Outloud',
        href: 'https://outloud.co',
        icon: '',
      },
    },
  },
})
