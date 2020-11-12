/**
 * A namespace
 * @namespace CSS
 */
const CSS = (function () {
    /**
     *  The default red value of new {@link Color|Colors}
     *  @memberof CSS#
     *  @constant
     *  @default
     */
    const RED = 28
    /**
     *  The default green value of new {@link Color|Colors}
     *  @memberof CSS#
     *  @constant
     *  @default
     */
    const GREEN = 89
    /**
     *  The default blue value of new {@link Color|Colors}
     *  @memberof CSS#
     *  @constant
     *  @default
     */
    const BLUE = 232
    /**
     *  The default opacity of new {@link Color|Colors}
     *  @memberof CSS#
     *  @constant
     *  @default
     */
    const ALPHA = 1.0

    /**
     * A class
     */
    class Color {
        /**
         * Initializes a new {@link Color}
         * @param {object} hue - The initial values of a new {@link Color}
         */
        constructor(hue) {
            /**
             * The values of this {@link Color}
             * @property {number} red - The red value of this {@link Color}
             * @property {number} green - The green value of this {@link Color}
             * @property {number} blue - The blue value of this {@link Color}
             * @property {number} alpha - The opacity of this {@link Color}
             */
            this.hue = {}

            /** @type {number} */
            this.hue.red = hue.red || RED

            /** @type {number} */
            this.hue.green = hue.green || GREEN

            /** @type {number} */
            this.hue.blue = hue.blue || BLUE

            /** @type {number} */
            this.hue.alpha = hue.alpha || ALPHA
        }
    }

    return {
        /**
         * A member function
         * @memberof CSS#
         * @param {object} values - RGBA color values
         * @param {number} values.red - A red value
         * @param {number} values.green - A green value
         * @param {number} values.blue - A blue value
         * @param {number} values.alpha - A opacity
         * @returns {string} A CSS rbga color value
         */
        'rgba'(values) {
            const color = new Color(values)
            const { red, green, blue, alpha } = color.hue
            return `rgba(${red},${green},${blue},${alpha})`
        }
    }
})()
