# Gilbert Webfont

This work is licensed under
a [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) License

This is the `Gilbert` font from https://www.typewithpride.com/ converted to a COLRv0 webfont that should work in all
major browsers.

see here for more details: https://github.com/googlefonts/nanoemoji/issues/435

## Files

Always use the .woff2 variants of files as they are compressed and much smaller

| Filename                          | Size  | Size (woff2) | Format        | Works in                                       | Description                                                                    |
|-----------------------------------|-------|--------------|---------------|------------------------------------------------|--------------------------------------------------------------------------------|
| `Gilbert-Color Bold Preview5.otf` | 626kb | 96kb         | OT-SVG        | Firefox only                                   | The original Font from [www.typewithpride.com](https://www.typewithpride.com/) |
| `Gilbert-Color.ttf`               | 542kb | 76kb         | OT-SVG        | Firefox only                                   | The same as above, but converted to TTF (needed for next steps)                |
| `Gilbert-Color_SVG+COLRv1.ttf`    | 597kb | 99kb         | OT-SVG+COLRv1 | [Chrome](https://caniuse.com/colr-v1)          |                                                                                |
| `Gilbert-Color_COLRv1.ttf`        | 119kb | 39kb         | COLRv1        | [Chrome](https://caniuse.com/colr-v1)          |                                                                                |
| `Gilbert-Color_SVG+COLRv0.ttf`    | 587kb | 94kb         | OT-SVG+COLRv0 | [all major browsers](https://caniuse.com/colr) |                                                                                |
| `Gilbert-Color_COLRv0.ttf`        | 109kb | 33kb         | COLRv0        | [all major browsers](https://caniuse.com/colr) |                                                                                |

### Conversions

#### OTF -> TTF

[otf2ttf.py](https://github.com/fonttools/fonttools/blob/main/Snippets/otf2ttf.py)

```bash
python otf2ttf.py `Gilbert-Color Bold Preview5.otf` -o `Gilbert-Color.ttf`
```

#### OT-SVG -> COLRv1

using [nanoemoji](https://github.com/googlefonts/nanoemoji)

```bash

maximum_color Gilbert-Color.ttf --output_file Gilbert-Color_SVG+COLRv1.ttf
ttx -x SVG Gilbert-Color_SVG+COLRv1.ttf
ttx Gilbert-Color_SVG+COLRv1.ttx
mv Gilbert-Color_SVG+COLRv1#1.ttf Gilbert-Color_COLRv1.ttf

```

#### OT-SVG -> COLRv0

same as COLRv1, but with [otsvg-to-colrv0](https://github.com/googlefonts/nanoemoji/compare/otsvg-to-colrv0?expand=1)
branch
