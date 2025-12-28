import packageJson from '../../package.json'

export default defineAppConfig({
  github: {
    url: packageJson.repository.url,
  },
})
