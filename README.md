## Contribution guidelines
- use `nvm` to ensure that we use the same version of `NodeJS`
  - install the correct version of `NodeJS` by running `nvm install`
  - make the installed version the default version by running `nvm alias default <version>`
- use the local installation of `lerna`
  - run `lerna` commands throguh `npx`, e.g. `npx lerna bootstrap`
- use `lerna publish` to publish new versions of the packages
- use the [semver](https://semver.org/) guidelines to help you choose version numbers
- if you end up updating the versions of packages that you don't want to update, only update the patch version or the prerelease version
