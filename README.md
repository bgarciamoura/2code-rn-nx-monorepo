# 2Code NX Monorepo

## Libs Configuration

- (Husky)[https://github.com/typicode/husky]

### Husky
Install Husky and Lint-Stagged with the following command: 

```bash
npm install -D husky lint-stagged -W
```

After install the lib, run the command bellow to initialize Husky on your monorepo: 

```bash
npx husky init
```

This command will create the ```.husky/``` directory with a pre-commit hook and make some changes on ```package.json``` including a script prepare:

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

The last thing you'll have to do is integrate lint-stagged including in your package.json the following code:

```bash
 "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "nx affected:lint --fix --parallel",
      "nx format:write",
      "git add"
    ]
  }
```
