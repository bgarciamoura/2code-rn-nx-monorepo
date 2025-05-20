# 2Code NX Monorepo

## Libs Configuration

- [Husky](https://github.com/typicode/husky)
- [Lint-Staged](https://github.com/lint-staged/lint-staged)
- [Storybook](https://storybook.js.org/)

### Husky

Install Husky and Lint-Staged with the following command:

```bash
npm install -D husky lint-staged -W
```

After install the lib, run the command bellow to initialize Husky on your monorepo:

```bash
npx husky init
```

This command will create the `.husky/` directory with a pre-commit hook and make some changes on `package.json` including a script prepare:

```bash
"scripts": {
  "prepare": "husky"
}
```

Then you're ready to edit your pre-commit to include yours commands to run on every commit;

As suggestion, use the following commands:

```bash
npx nx affected:lint --fix --parallel
npx nx format:write
```

The last thing you'll have to do is integrate lint-staged including in your package.json the following code:

```bash
 "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "nx affected:lint --fix --parallel",
      "nx format:write",
      "git add"
    ]
  }
```

### Storybook

Install Storybook using the following command. This will install Storybook plugin to the NX Workspace and the storybook library for use. 

```bash
npm install -D @nx/storybook -W 
npx nx add @nx/storybook
```

After run the commands, you'll have to create the UI library to use Storybook. You just need to run this if you already doesn't have created an ui lib previously.

```bash
npx nx g @nx/expo:lib libs/your-lib-name
```
