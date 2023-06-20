# IES Web

## Get Started

### Clone source code

```bash
git clone git@github.com:iamncdai/ies-web.git
cd ies-web

yarn install
```

### Config environment variables

Create a file `.env.local`

```bash
API_URL=http://booking.draweditor.com
GOOGLE_MAPS_API_KEY=
```

### Run development

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

### Run production

```bash
yarn build
yarn start
```

Open http://localhost:3000 with your browser to see the result.

## Libs
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
