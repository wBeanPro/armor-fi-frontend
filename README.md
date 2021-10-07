# Armor frontend

Based on create-react-app and implies Vercel using.
So, you need to login to the Vercel CLI to continue.

## Run and Deploy

### Local dev

```bash
$ vercel login # logs in to your Vercel account
$ vercel env pull # pulls your ENV variables to .env file
$ vercel dev # runs the project locally
# or npm run start if no logged in to Vercel
```

### Build

```bash
$ npm run build
```

### How to deploy to `armor.fi` domain:

Commit to the `master` branch (your should be a part of ArmorFi Team on Vercel).


### How to deploy to `dev.armor.fi` domain:

Commit to the `dev` branch (your should be a part of ArmorFi Team on Vercel).


## Deploy to IPFS

> Please make sure you've installed https://github.com/ipfs-shipyard/ipfs-deploy

```bash
$ vercel env pull # pulls your ENV variables to .env file
```

Then please set ENV variable PUBLIC_URL a value with desired IPFS website address \
e.g. PUBLIC_URL=https://ipfs.armor.fi

```bash
$ npm run deploy:ipfs
```

