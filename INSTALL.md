# MiniBeam extension v0.7.0

## Install URL (use exact link)

```
https://github.com/manfieldchow/mini3#v0.7.0
```

## GitHub release tag (required)

1. https://github.com/manfieldchow/mini3/releases
2. Create release tag **`v0.7.0`**
3. Publish

## Files on GitHub (only these)

- `main.ts`
- `pxt.json` (version 0.7.0)
- `README.md`
- Do NOT upload `minibeampixel.ts` or old `main.ts` copies

## Reload MakeCode

1. Remove extension
2. Ctrl+Shift+R
3. New project
4. Add `https://github.com/manfieldchow/mini3#v0.7.0`
5. Accept **neopixel** dependency
6. Toolbox category: **minibeam**

## Blocks (no strip variable needed)

```
connect MiniBeam on pin P0
fill matrix red
```

or

```
connect MiniBeam on pin P0
set pixel x 0 y 0 to red
send to LEDs
```

## v0.6.0 broke blocks — why

Version 0.6.0 used `%strip` variables like the NeoPixel extension. That broke the block compiler. **v0.7.0** uses simple blocks again (they worked before) plus simulator hints via `parts="neopixel"`.

## Simulator

After **connect MiniBeam on pin P0**, the simulator may show a 6x7 LED grid (like NeoPixel). If not visible, download to real hardware — it still works.
