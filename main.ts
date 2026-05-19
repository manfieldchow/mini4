enum MiniBeamColor {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

/**
 * Control a 6x7 WS2812B LED matrix (42 LEDs).
 */
//% weight=90 color=#E81C24 icon="\uf110"
namespace minibeam {
    let strip = null
    let pen = MiniBeamColor.Red
    let mapOrigin = 0
    let mapWire = 0

    function flipX(x: number): number {
        return 5 - x
    }

    function flipY(y: number): number {
        return 6 - y
    }

    function indexAt(x: number, y: number): number {
        x = x >> 0
        y = y >> 0
        if (x < 0 || x > 5 || y < 0 || y > 6) {
            return -1
        }
        let col = x
        let row = y
        if (mapOrigin == 1 || mapOrigin == 3) {
            col = flipX(col)
        }
        if (mapOrigin == 2 || mapOrigin == 3) {
            row = flipY(row)
        }
        if (mapWire == 1) {
            return row * 6 + col
        }
        if (mapWire == 0) {
            if (row % 2 == 1) {
                col = flipX(col)
            }
            return row * 6 + col
        }
        if (mapWire == 3) {
            return col * 7 + row
        }
        if (mapWire == 2) {
            if (col % 2 == 1) {
                row = flipY(row)
            }
            return col * 7 + row
        }
        return row * 6 + col
    }

    function ready(): boolean {
        return strip != null
    }

    /**
     * Connect the 6x7 matrix to a pin.
     * @param pin data pin, eg: P0
     */
    //% blockId="minibeam_connect" block="connect MiniBeam on pin %pin"
    //% pin.defl=DigitalPin.P0
    //% parts="neopixel"
    //% weight=100 blockGap=8
    export function connect(pin: DigitalPin) {
        strip = neopixel.create(pin, 42, NeoPixelMode.RGB)
        strip.setMatrixWidth(6)
        strip.setBrightness(128)
    }

    /**
     * Set pen colour.
     */
    //% blockId="minibeam_pen" block="set pen %value"
    //% weight=95 blockGap=8
    export function setPen(value: MiniBeamColor) {
        pen = value
    }

    /**
     * Set one pixel (correct for zigzag PCB wiring).
     */
    //% blockId="minibeam_pixel" block="set pixel x %x y %y to %value"
    //% parts="neopixel"
    //% x.min=0 x.max=5 y.min=0 y.max=6
    //% weight=90 blockGap=8
    export function setPixel(x: number, y: number, value: MiniBeamColor) {
        if (!ready()) {
            return
        }
        const i = indexAt(x, y)
        if (i < 0) {
            return
        }
        strip.setPixelColor(i, value)
    }

    /**
     * Set pixel with brightness 0-255.
     */
    //% blockId="minibeam_light" block="light pixel x %x y %y level %level"
    //% parts="neopixel"
    //% x.min=0 x.max=5 y.min=0 y.max=6
    //% level.min=0 level.max=255 level.defl=255
    //% weight=89 blockGap=8
    export function lightPixel(x: number, y: number, level: number) {
        if (!ready()) {
            return
        }
        const i = indexAt(x, y)
        if (i < 0) {
            return
        }
        if (level > 0) {
            const c = pen
            const r = Math.idiv(((c >> 16) & 0xff) * level, 255)
            const g = Math.idiv(((c >> 8) & 0xff) * level, 255)
            const b = Math.idiv((c & 0xff) * level, 255)
            strip.setPixelColor(i, neopixel.rgb(r, g, b))
        } else {
            strip.setPixelColor(i, 0)
        }
    }

    /**
     * Send colours to the LEDs.
     */
    //% blockId="minibeam_send" block="send to LEDs"
    //% parts="neopixel"
    //% weight=88 blockGap=8
    export function sendToLeds() {
        if (!ready()) {
            return
        }
        strip.show()
    }

    /**
     * Clear the LED buffer.
     */
    //% blockId="minibeam_wipe" block="wipe matrix"
    //% parts="neopixel"
    //% weight=87 blockGap=8
    export function wipeMatrix() {
        if (!ready()) {
            return
        }
        strip.clear()
    }

    /**
     * Fill the matrix and send.
     */
    //% blockId="minibeam_fill" block="fill matrix %value"
    //% parts="neopixel"
    //% weight=86 blockGap=8
    export function fillMatrix(value: MiniBeamColor) {
        if (!ready()) {
            return
        }
        strip.showColor(value)
    }

    /**
     * Set brightness 0-255.
     */
    //% blockId="minibeam_bright" block="set brightness %level"
    //% parts="neopixel"
    //% level.min=0 level.max=255 level.defl=128
    //% weight=85 blockGap=8
    export function setBrightness(level: number) {
        if (!ready()) {
            return
        }
        strip.setBrightness(level)
    }

    /**
     * Rainbow effect on the matrix.
     */
    //% blockId="minibeam_rainbow" block="show rainbow"
    //% parts="neopixel"
    //% weight=84 blockGap=8
    export function showRainbow() {
        if (!ready()) {
            return
        }
        strip.showRainbow(1, 360)
    }

    /**
     * Test wiring: light each LED in order.
     */
    //% blockId="minibeam_test" block="run wiring test"
    //% parts="neopixel"
    //% weight=80 blockGap=8
    export function runWiringTest() {
        if (!ready()) {
            return
        }
        let n = 0
        while (n < 42) {
            strip.clear()
            strip.setPixelColor(n, MiniBeamColor.Red)
            strip.show()
            basic.pause(80)
            n += 1
        }
        strip.clear()
        strip.show()
    }
}
