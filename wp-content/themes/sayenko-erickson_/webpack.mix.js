/**
 * Laravel Mix configuration file.
 *
 * Laravel Mix is a layer built on top of WordPress that simplifies much of the
 * complexity of building out a Webpack configuration file. Use this file to
 * configure how your assets are handled in the build process.
 *
 * @link https://laravel.com/docs/5.6/mix
 */

// Import required packages.
const mix = require( 'laravel-mix' );
require('laravel-mix-polyfill');
require('laravel-mix-copy-watched');
require('laravel-mix-imagemin');
const TargetsPlugin = require("targets-webpack-plugin");


//require('laravel-mix-polyfill');

/*
 * -----------------------------------------------------------------------------
 * Theme Export Process
 * -----------------------------------------------------------------------------
 * Configure the export process in `webpack.mix.export.js`. This bit of code
 * should remain at the top of the file here so that it bails early when the
 * `export` command is run.
 * -----------------------------------------------------------------------------
 */

if ( process.env.export ) {
	const exportTheme = require( './webpack.mix.export.js' );
	return;
}

/*
 * -----------------------------------------------------------------------------
 * Build Process
 * -----------------------------------------------------------------------------
 * The section below handles processing, compiling, transpiling, and combining
 * all of the theme's assets into their final location. This is the meat of the
 * build process.
 * -----------------------------------------------------------------------------
 */

/*
 * Sets the development path to assets. By default, this is the `/resources`
 * folder in the theme.
 */
const devPath = 'assets';

/*
 * Sets the path to the generated assets. By default, this is the `/public` folder
 * in the theme. If doing something custom, make sure to change this everywhere.
 */
mix.setPublicPath( 'public' );

/*
 * Builds sources maps for assets.
 *
 * @link https://laravel.com/docs/5.6/mix#css-source-maps
 */
mix.sourceMaps();

/*
 * Versioning and cache busting. Append a unique hash for production assets. If
 * you only want versioned assets in production, do a conditional check for
 * `mix.inProduction()`.
 *
 * @link https://laravel.com/docs/5.6/mix#versioning-and-cache-busting
 */
if (mix.inProduction()) {
	mix.version();
}

/*
 * Compile JavaScript.
 *
 * @link https://laravel.com/docs/5.6/mix#working-with-scripts
 */
 
mix.js( `${ devPath }/js/modernizr-custom.js`, 'js' )
	.js( `${ devPath }/js/infobox.js`, 'js' )
	.js( `${ devPath }/js/project.js`, 'js' )
	.polyfill({
		targets: "firefox 50, IE 11",
		debug: true
	})
	.extract();


// Compile SASS/CSS.
 mix.sass( `${ devPath }/scss/style.scss`, 'css' )
	.sass( `${ devPath }/scss/login.scss`, 'css' )
	.sass( `${ devPath }/scss/editor.scss`, 'css' )
	.copyWatched('assets/images/**', 'public/images', { base: 'assets/images' })




/*
 * Add custom Webpack configuration.
 *
 * Laravel Mix doesn't currently minimize images while using its `.copy()`
 * function, so we're using the `CopyWebpackPlugin` for processing and copying
 * images into the public folder.
 *
 * @link https://laravel.com/docs/5.6/mix#custom-webpack-configuration
 * @link https://webpack.js.org/configuration/
 */
mix.webpackConfig( {
	stats: 'minimal',
	devtool: mix.inProduction() ? false : 'source-map',
	performance: { hints: false },
	externals: { jquery: 'jQuery' },
	plugins: [
        new TargetsPlugin({
          browsers: ['last 2 versions', 'chrome >= 41', 'IE 11'],
        }),
	],

} );


if ( process.env.sync ) {

	/*
	 * Monitor files for changes and inject your changes into the browser.
	 *
	 * @link https://laravel.com/docs/5.6/mix#browsersync-reloading
	 */
	mix.browserSync( {
		proxy: 'https://erickson.local',
        port: 3000,
		notify: false,
		open: true,
		https: {
		 	'key': '/Applications/MAMP/Library/OpenSSL/certs/localhost.key',
			'cert': '/Applications/MAMP/Library/OpenSSL/certs/localhost.crt'
		},
		files: [
			'public/**/*.css',
			'**/*.php',
		],
	} );
}
