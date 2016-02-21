# Positron Bar

## Getting started

Set stuff up:

```bash
npm install
```

Run as follows:

```
./node_modules/.bin/electron .
```

## Bspwm

You need the following to make the bar stick:

```bash
# ~/.config/bspwm/bspwmrc
bspc rule -a positron-bar floating=on border=off sticky=true
```
