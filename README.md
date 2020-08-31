# NPM Bumper

![example workflow name][actions-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="">
    <img src="assets/img/npmbumper_logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <!-- <h3 align="center">NPM Bumper</h3> -->
</p>



## Table of Contents

- [About](#about)
- [Usage](#usage)
- [How it works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## About

Update your dependencies and devDependencies in `package.json` with a single click of a button.

## Usage

1. Install
2. Open a project with a `package.json` file
3. Click the bump dependencies icon in the status bar
4. ???
5. Profit

At the moment, the undo functionality is broken, however it is under active development. Until then, this extension will create a backup file named package.backup.json, just in case you don't like the output.

## How it works

  1. Scans package.json for dependencies
  2. Retrieves the latest versions from the npm registry
  3. Rewrites package.json with the updated versions

You can view the source code on [GitHub](https://github.com/PrunedNeuron/npmbumper).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch<br>
  `git checkout -b feat/AmazingFeature`
3. Commit your Changes<br>
  `git commit -m 'feat: Add some AmazingFeature'`
4. Push to the Branch<br>
  `git push origin feat/AmazingFeature`
5. <a href="https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request">Open a Pull Request</a>

Please follow the [conventional-commits](https://www.conventionalcommits.org/) specification while committing and creating pull requests.


## License

Distributed under the MIT License.
<br />
See <a href="LICENSE.md">`LICENSE`</a> for more information.


## Contact

Email - [am@ayushm.dev](mailto:am@ayushm.dev)<br/>
Dribbble - [dribbble.com/ayush](https://dribbble.com/ayush)<br/>
Website - [ayushm.dev](https://ayushm.dev)<br/>
Github - [PrunedNeuron](https://github.com/PrunedNeuron)

<!-- Links -->
[actions-url]: https://github.com/PrunedNeuron/npmbumper/workflows/.github/workflows/actions.yml/badge.svg