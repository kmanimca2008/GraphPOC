// const WebFont = require('webfontloader');

WebFont.load({
    custom: {
      // Using the FontAwesome files in this example
      families: ['ci-icons']
    },
    testString: {
      // Be sure to provide a unicode character which exists in the font library
      'ci-icons': '\f102'
    },
    // Make sure to start KeyLines in either case
    active: fontLoaded,
    inactive: fontNotLoaded
  });

  function fontLoaded(d) {
      console.log(d, 'custom font is loaded');
  }
  function fontNotLoaded(d) {
    console.log(d, 'custom font is not loaded');
}