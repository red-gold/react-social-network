# Contributing

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of the React Social Network community. Here are a few guidelines that will help you along the way.

## Asking Questions

For how-to questions and other non-issues, please use [Gitter](https://gitter.im/react-social-network/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) chat instead of Github issues.

## Opening an Issue

If you think you have found a bug, or have a new feature idea, please start by making sure it hasn't already been [reported or fixed](https://github.com/Qolzam/react-social-network/issues?utf8=%E2%9C%93&q=is:open+is:closed). You can search through existing issues and PRs to see if someone has reported one similar to yours.

Next, create a new issue that briefly explains the problem, and provides a bit of background as to the circumstances that triggered it, and steps to reproduce it.

For code issues please include:
* React Social Network version
* React version
* Browser version
* A code example or link to a repo, gist or running site.

For visual or layout problems, images or animated gifs can help explain your issue.
It's even better with a live reproduction test case. Have a look at the [`ISSUE_TEMPLATE.md`](https://github.com/Qolzam/react-social-network/blob/master/.github/ISSUE_TEMPLATE.md) file for a live playground example.

### Issue Guidelines

Please Use a succinct description. "doesn't work" doesn't help others find similar issues.

Please don't group multiple topics into one issue, but instead each should be its own issue.

And please don't just '+1' an issue. It spams the maintainers and doesn't help move the issue forward.

## Submitting a Pull Request

React Social Network is a community project, so pull requests are always welcome, but before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, don't bundle more than one feature or bug fix per pull request. It's always best to create two smaller PRs than one big one.

As with issues, please begin the title with [LayerName].

When adding new features or modifying existing code, please attempt to include tests to confirm the new behaviour. You can read more about our test setup [here](https://qolzam.gitbooks.io/react-social-network/layers/tests.html).

### Branch Structure

All stable releases are tagged ([view tags](https://github.com/Qolzam/react-social-network/tags)). At any given time, `master` represents the latest development version of the library.

#### `master` is unsafe

We will do our best to keep `master` in good shape, with tests passing at all times. But in order to move fast, we will make API changes that your application might not be compatible with.

## Getting started

Please create a new branch from an up to date master on your fork. (Note, urgent hotfixes should be branched off the latest stable release rather than master)

1. Fork the [react-social-network](https://github.com/Qolzam/react-social-network) repository on Github
2. Clone your fork to your local machine `git clone --depth 1 git@github.com:<yourname>/react-social-network.git`
3. Create a branch `git checkout -b my-topic-branch`
4. Make your changes, lint, then push to github with `git push --set-upstream origin my-topic-branch`.
5. Visit github and make your pull request.

If you have an existing local repository, please update it before you start, to minimize the chance of merge conflicts.
```js
git remote add upstream git@github.com:Qolzam/react-social-network.git
git checkout master
git pull upstream master
git checkout -b my-topic-branch
```

### Testing & documentation site

The documentation site is built with [GitBook](https://www.gitbook.com/book/qolzam/react-social-network/details), so you just need to edit `*.md` files. You can easily edit whole documentation files form `docs` folder.

Test coverage is limited at present, but where possible, please add tests for any changes you make. Tests can be run with `npm test`.

### Coding style

Please follow the coding style of the current code base. React Social Network uses eslint, so if possible, enable linting in your editor to get realtime feedback.

Finally, when you submit a pull request, linting is run again by Continuous Integration testing, but hopefully by then your code is already clean!

## License

By contributing your code to the qolzam/react-social-network GitHub repository, you agree to license your contribution under the MIT license.
