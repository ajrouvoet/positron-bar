# Positron Bar

## Getting started

Set stuff up:

```bash
npm install
npm run build
```

Run as follows:

```
npm run start
```

## Bspwm

You need the following to make the bar stick:

```bash
# ~/.config/bspwm/bspwmrc
bspc rule -a positron-bar floating=on border=off sticky=true
```
