function append(colors, assigner) {
  return Object.assign(colors, assigner(colors));
}

module.exports = {
  // prefix: "tw-",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: append(
        {
          /** primary colors:
           *    These are the colors that are most frequently used across
           *    your UI and imparts a distinct identity to the product.
           *    These are usually the colors that a brand sets as their identity.
           *
           *    三種命名方式
           *      1）100 為 default 以上為 dark 以下為 light e.g: primary-90 / primary-110
           *      2) dark / light / medium-dark / medium-light
           *      3) accent / medium-accent / trivial / medium-trivial
           *      前二種是視覺上絕對，第三種是相對，用於有 dark theme / light theme 反差類的主題
           * */
          primary: {
            light: "#c495fb",
            med_light: "#8259d1",
            DEFAULT: "#603fcf",
            med_dark: "#593eb4",
            dark: "#2a2a83",
            grey: "#bfbfda"
          },

          /** secondary / tertiary  colors:
           *    These colors highlight or complement the primary color.
           *    These are to be used sparingly to make the UI elements stand out.
           * */
          secondary: {
            light: "#fdd835",
            DEFAULT: "#fbc02d",
            dark: "#f9a825"
          },

          tertiary: {
            light: "#3acdec",
            DEFAULT: "#05a2c3"
          },

          /**
           * 以下不強制分子類
           * neutral colors: (如灰階，文字）
           *  These include shades of grey, all the way from White to Black.
           *  These are used for backgrounds, text colors, etc, and form the majority of your UI.
           *
           * semantic colors: （如 success/error/info/warning)
           *  These are the colors that communicate purpose. They help users convey messages.
           *  For example, Green has a positive connotation. We use Green to convey success,
           *  confirmation messages, etc.
           * */

          bg: {
            DEFAULT: "#2a2a83",
            dark: "#1b1b6a",
            dark_blue: "#1b1b6a",
            grey: "#d8d8d8"
          },

          text: {
            light: "#ffffff",
            DEFAULT: "#bfbfda",
            dark: "#000000",
            grey: "#676565"
          },

          //
          //    以下尚未定義
          //
          success: {
            DEFAULT: "#5aa22e",
            light: "#63faba",
          },
          error: {
            DEFAULT: "#bf1111",
            light: "#fa638c",
          },
          warning: {
            DEFAULT: "#e2ab00",
            dark: "#f0b90b",
            light: "#f8da79"
          }
        },
        colors => {
          return {
            line: {
              prim: {
                active_field: colors.primary.light,
                active_link: colors.tertiary.light
              },
              sec: {}
            },
            stops: {
              ci: {
                prim: colors.primary.dark,
                sec: colors.primary.med_dark
              },
              button: {
                prim: colors.tertiary,
                sec: colors.tertiary.light
              }
            }
          };
        }
      ),
      textColor: theme => ({
        light: theme("colors.text.light"),
        DEFAULT: theme("colors.text"),
        med_dark: theme("colors.primary.dark"),
        dark: theme("colors.text.dark"),
        active: theme("colors.tertiary.light"),
        grey: theme("colors.text.grey"),
      }),

      fontFamily: {
        lexend: [
          "Lexend",
          "-apple-system",
          "BlinkMacSystemFont",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        DEFAULT: "0 2px 7px 0 rgba(29, 29, 29, 0.05)"
      },
      borderRadius: {
        DEFAULT: "5px",
        md: "10px"
      },
      minWidth: {
        0: "0",
        "1/3": "33.3%",
        "3-12": `${300 / 12}%`,
        "1/24": "4.1666666%",
        "2/24": "8.3333333%",
        "3/24": "12.5%",
        "4/24": "16.6666666%",
        "5/24": "20.8333333%",
        "6/24": "25%",
        "7/24": "29.1666666%",
        "8/24": "33.3333333%",
        "9/24": "37.5%",
        "10/24": "41.6666666%",
        "11/24": "45.8333333%",
        "12/24": "50%",
        "13/24": "54.1666666%",
        "14/24": "58.3333333%",
        "15/24": "62.5%",
        "16/24": "66.6666666%",
        "17/24": "70.8333333%",
        "18/24": "75%",
        "19/24": "79.1666666%",
        "20/24": "83.3333333%",
        "21/24": "87.5%",
        "22/24": "91.6666666%",
        "23/24": "95.8333333%"
      }
    }
  },
  variants: {
    extend: {}
  },

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".primary-gradient": {
          background: `linear-gradient(to bottom, ${theme(
            "colors.tertiary.light"
          )}, ${theme("colors.primary.DEFAULT")})`
        },
        ".warning-gradient": {
          background: `linear-gradient(to right, ${theme(
            "colors.warning.light"
          )}, ${theme("colors.warning.dark")})`
        }
      });
    }
  ],

  /*
    |-----------------------------------------------------------------------------
    | Advanced Options         https://tailwindcss.com/docs/configuration#options
    |-----------------------------------------------------------------------------
    |
    | Here is where you can tweak advanced configuration options. We recommend
    | leaving these options alone unless you absolutely need to change them.
    |
      purgecss by default 只 purge tailwind, 不包括第三方 csss
    */

  // options: {
  //   prefix: "",
  //   important: false,
  //   separator: ":"
  // },

  purge: {
    content: [
      "./index.html",
      "./src/**/*.html",
      "./src/**/*.vue",
      "./src/**/*.ts"
    ],

    // These options are passed through directly to PurgeCSS
    options: {
      safelist: ["classNameYouDontWannaBePurged"]
    }
  },

  /*
  |-----------------------------------------------------------------------------
  | Width                                    https://tailwindcss.com/docs/width
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your width utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default
  | we provide a sensible rem based numeric scale, a percentage
  | based fraction scale, plus some other common use-cases. You
  | can, of course, modify these values as needed.
  |
  |
  | It's also worth mentioning that Tailwind automatically escapes
  | invalid CSS class name characters, which allows you to have
  | awesome classes like .w-2/3.
  |
  | Class name: .w-{size}
  |
  */

  width: {
    auto: "auto",
    px: "1px",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    24: "6rem",
    32: "8rem",
    48: "12rem",
    64: "16rem",
    "1/2": "50%",
    "1/3": "33.33333%",
    "2/3": "66.66667%",
    "1/4": "25%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.66667%",
    "5/6": "83.33333%",
    full: "100%",
    screen: "100vw"
  },
  /*
  |-----------------------------------------------------------------------------
  | Height                                  https://tailwindcss.com/docs/height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your height utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default
  | we provide a sensible rem based numeric scale plus some other
  | common use-cases. You can, of course, modify these values as
  | needed.
  |
  | Class name: .h-{size}
  |
  */

  height: {
    auto: "auto",
    px: "1px",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    24: "6rem",
    32: "8rem",
    48: "12rem",
    64: "16rem",
    full: "100%",
    screen: "100vh"
  },

  /*
  |-----------------------------------------------------------------------------
  | Minimum width                        https://tailwindcss.com/docs/min-width
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your minimum width utility sizes. These can
  | be percentage based, pixels, rems, or any other units. We provide a
  | couple common use-cases by default. You can, of course, modify
  | these values as needed.
  |
  | Class name: .min-w-{size}
  |
  */

  minWidth: {
    0: "0",
    full: "100%"
  },

  /*
  |-----------------------------------------------------------------------------
  | Minimum height                      https://tailwindcss.com/docs/min-height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your minimum height utility sizes. These can
  | be percentage based, pixels, rems, or any other units. We provide a
  | few common use-cases by default. You can, of course, modify these
  | values as needed.
  |
  | Class name: .min-h-{size}
  |
  */

  minHeight: {
    0: "0",
    full: "100%",
    screen: "100vh"
  },

  /*
  |-----------------------------------------------------------------------------
  | Maximum width                        https://tailwindcss.com/docs/max-width
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your maximum width utility sizes. These can
  | be percentage based, pixels, rems, or any other units. By default
  | we provide a sensible rem based scale and a "full width" size,
  | which is basically a reset utility. You can, of course,
  | modify these values as needed.
  |
  | Class name: .max-w-{size}
  |
  */

  maxWidth: {
    xs: "20rem",
    sm: "30rem",
    md: "40rem",
    lg: "50rem",
    xl: "60rem",
    "2xl": "70rem",
    "3xl": "80rem",
    "4xl": "90rem",
    "5xl": "100rem",
    full: "100%"
  },

  /*
  |-----------------------------------------------------------------------------
  | Maximum height                      https://tailwindcss.com/docs/max-height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your maximum height utility sizes. These can
  | be percentage based, pixels, rems, or any other units. We provide a
  | couple common use-cases by default. You can, of course, modify
  | these values as needed.
  |
  | Class name: .max-h-{size}
  |
  */

  maxHeight: {
    full: "100%",
    screen: "100vh"
  },

  /*
  |-----------------------------------------------------------------------------
  | Padding                                https://tailwindcss.com/docs/padding
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your padding utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default we
  | provide a sensible rem based numeric scale plus a couple other
  | common use-cases like "1px". You can, of course, modify these
  | values as needed.
  |
  | Class name: .p{side?}-{size}
  |
  */

  padding: {
    px: "1px",
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem"
  },

  /*
  |-----------------------------------------------------------------------------
  | Margin                                  https://tailwindcss.com/docs/margin
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your margin utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default we
  | provide a sensible rem based numeric scale plus a couple other
  | common use-cases like "1px". You can, of course, modify these
  | values as needed.
  |
  | Class name: .m{side?}-{size}
  |
  */

  margin: {
    auto: "auto",
    px: "1px",
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem"
  },

  /*
  |-----------------------------------------------------------------------------
  | Negative margin                https://tailwindcss.com/docs/negative-margin
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your negative margin utility sizes. These can
  | be percentage based, pixels, rems, or any other units. By default we
  | provide matching values to the padding scale since these utilities
  | generally get used together. You can, of course, modify these
  | values as needed.
  |
  | Class name: .-m{side?}-{size}
  |
  */

  negativeMargin: {
    px: "1px",
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem"
  },

  /*
  |-----------------------------------------------------------------------------
  | Shadows                                https://tailwindcss.com/docs/shadows
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your shadow utilities. As you can see from
  | the defaults we provide, it's possible to apply multiple shadows
  | per utility using comma separation.
  |
  | If a `default` shadow is provided, it will be made available as the non-
  | suffixed `.shadow` utility.
  |
  | Class name: .shadow-{size?}
  |
  */

  shadows: {
    default: "0 2px 4px 0 rgba(0,0,0,0.10)",
    md: "0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)",
    lg: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
    outline: "0 0 0 3px rgba(52,144,220,0.5)",
    none: "none"
  },

  /*
  |-----------------------------------------------------------------------------
  | Z-index                                https://tailwindcss.com/docs/z-index
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your z-index utility values. By default we
  | provide a sensible numeric scale. You can, of course, modify these
  | values as needed.
  |
  | Class name: .z-{index}
  |
  */

  zIndex: {
    auto: "auto",
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    75: 75,
    100: 100
  },

  /*
  |-----------------------------------------------------------------------------
  | Opacity                                https://tailwindcss.com/docs/opacity
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your opacity utility values. By default we
  | provide a sensible numeric scale. You can, of course, modify these
  | values as needed.
  |
  | Class name: .opacity-{name}
  |
  */

  opacity: {
    0: "0",
    25: ".25",
    50: ".5",
    75: ".75",
    100: "1"
  },

  /*
  |-----------------------------------------------------------------------------
  | SVG fill                                   https://tailwindcss.com/docs/svg
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your SVG fill colors. By default we just provide
  | `fill-current` which sets the fill to the current text color. This lets you
  | specify a fill color using existing text color utilities and helps keep the
  | generated CSS file size down.
  |
  | Class name: .fill-{name}
  |
  */

  svgFill: {
    current: "currentColor"
  },

  /*
  |-----------------------------------------------------------------------------
  | SVG stroke                                 https://tailwindcss.com/docs/svg
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your SVG stroke colors. By default we just provide
  | `stroke-current` which sets the stroke to the current text color. This lets
  | you specify a stroke color using existing text color utilities and helps
  | keep the generated CSS file size down.
  |
  | Class name: .stroke-{name}
  |
  */

  svgStroke: {
    current: "currentColor"
  }

  /*
  |-----------------------------------------------------------------------------
  | Modules                  https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Here is where you control which modules are generated and what variants are
  | generated for each of those modules.
  |
  | Currently supported variants:
  |   - responsive
  |   - hover
  |   - focus
  |   - active
  |   - group-hover
  |
  | To disable a module completely, use `false` instead of an array.
  |
  */

  // modules: {
  //   appearance: ["responsive"],
  //   backgroundAttachment: ["responsive"],
  //   backgroundColors: ["responsive", "hover", "focus"],
  //   backgroundPosition: ["responsive"],
  //   backgroundRepeat: ["responsive"],
  //   backgroundSize: ["responsive"],
  //   borderCollapse: [],
  //   borderColors: ["responsive", "hover", "focus"],
  //   borderRadius: ["responsive"],
  //   borderStyle: ["responsive"],
  //   borderWidths: ["responsive"],
  //   cursor: ["responsive"],
  //   display: ["responsive"],
  //   flexbox: ["responsive"],
  //   float: ["responsive"],
  //   fonts: ["responsive"],
  //   fontWeights: ["responsive", "hover", "focus"],
  //   height: ["responsive"],
  //   leading: ["responsive"],
  //   lists: ["responsive"],
  //   margin: ["responsive"],
  //   maxHeight: ["responsive"],
  //   maxWidth: ["responsive"],
  //   minHeight: ["responsive"],
  //   minWidth: ["responsive"],
  //   negativeMargin: ["responsive"],
  //   opacity: ["responsive"],
  //   outline: ["focus"],
  //   overflow: ["responsive"],
  //   padding: ["responsive"],
  //   pointerEvents: ["responsive"],
  //   position: ["responsive"],
  //   resize: ["responsive"],
  //   shadows: ["responsive", "hover", "focus"],
  //   svgFill: [],
  //   svgStroke: [],
  //   textAlign: ["responsive"],
  //   textColors: ["responsive", "hover", "focus"],
  //   textSizes: ["responsive"],
  //   textStyle: ["responsive", "hover", "focus"],
  //   tracking: ["responsive"],
  //   userSelect: ["responsive"],
  //   verticalAlign: ["responsive"],
  //   visibility: ["responsive"],
  //   whitespace: ["responsive"],
  //   width: ["responsive"],
  //   zIndex: ["responsive"]
  // },
};
