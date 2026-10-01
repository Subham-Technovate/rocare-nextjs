# Public assets

This folder holds all static assets (images, icons, fonts, etc.) for the project.

## Usage

Files placed here are served from the site root. For example:

- `public/logo-ro.png` is available at `/logo-ro.png`
- `public/images/hero.jpg` is available at `/images/hero.jpg`

### In plain HTML / JSX

```jsx
<img src="/logo-ro.png" alt="RO Care Odisha" />
```

### With next/image

```jsx
import Image from 'next/image';

<Image src="/logo-ro.png" alt="RO Care Odisha" width={120} height={40} />
```

> Note: Do **not** import from `public` via a relative path — always reference it
> with an absolute path starting at `/`.

## Suggested structure

```
public/
├── logo-ro.png
└── images/        (create as needed)
    ├── hero.jpg
    └── ...
```
