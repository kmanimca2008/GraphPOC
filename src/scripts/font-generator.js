const webfontsGenerator = require('webfonts-generator');
const path = require('path');
const glob = require("glob");
const files = glob.sync('./src/assets/images/iconsvg/*.svg', {});

console.log(files.length + " svg files found");

webfontsGenerator({
    files: files,
    dest: path.resolve(__dirname, './../styles'),
    templateOptions: {
        classPrefix: 'ci-',
        baseSelector: '.ci'
    },
    fontName: 'ci-icons'
}, function (error) {
    if (error) {
        console.log('Fail!', error);
    } else {
        console.log('Done! Fonts available in the scss directory');
    }
});
