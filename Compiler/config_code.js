var _fs        = require('fs');
var _uglifyJS  = require('uglify-js');
var _uglifyCSS = require('uglifycss');

function concat(opts) {
    var fileList = opts.src;
    var distPath = opts.dest;
    var out = fileList.map(function(filePath){
            return _fs.readFileSync(filePath).toString();
        });
    _fs.writeFileSync(distPath, out.join('\n'));
    console.log(' '+ distPath +' built.');
}

function uglifyJS(srcPath, distPath) {
    var
      jsp = _uglifyJS.parser,
      pro = _uglifyJS.uglify,
      ast = jsp.parse( _fs.readFileSync(srcPath).toString() );
 
    ast = pro.ast_mangle(ast);
    ast = pro.ast_squeeze(ast);

var header = '\
/*!\n\
 * Web Cabin Menu - A simple menu and toolbar system.\n\
 *\n\
 * Dependancies:\n\
 *  JQuery 1.11.1\n\
 *\n\
 * Author: Jeff Houde (lochemage@webcabin.org)\n\
 * Web: https://menu.webcabin.org/\n\
 * API: https://menu.api.webcabin.org/\n\
 *\n\
 * Licensed under\n\
 *   MIT License http://www.opensource.org/licenses/mit-license\n\
 *\n\
 */\n';

     _fs.writeFileSync(distPath, header + pro.gen_code(ast));
    console.log(' '+ distPath +' built.');
}

function uglifyCSS(srcPath, distPath) {
    var
      pro = _uglifyCSS.processString,
      ast = _fs.readFileSync(srcPath).toString();
 
    _fs.writeFileSync(distPath, pro(ast, {uglyComments:false}));
    console.log(' '+ distPath +' built.');
}



// Main script engine and core nodes.
concat({
  src: [
    '../Code/menu.js',
  ],
  dest: '../Build/wcMenu.js',
});

concat({
  src: [
    '../Code/menu.css',
  ],
  dest: '../Build/wcMenu.css',
});

// Now minify them. 
uglifyJS('../Build/wcMenu.js', '../Build/wcMenu.min.js');
uglifyCSS('../Build/wcMenu.css', '../Build/wcMenu.min.css');
