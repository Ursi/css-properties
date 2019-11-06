const
	gulpPug = require(`gulp-pug`),
	gulpPugClient = require(`gulp-pug-client`),
	{
		src,
		dest,
		series,
		parallel,
		watch,
	} = require(`gulp`),
	globs = {};

globs.pug = `*.pug`;
function pug() {
	return src(globs.pug)
		.pipe(gulpPug())
		.pipe(dest(`..`));
}

globs.pugClient = `pug-client/*.pug`;
function pugClient() {
	return src(globs.pugClient)
		.pipe(gulpPugClient())
		.pipe(dest(`../pug-client`))
}

function build() {
	return parallel(pug, pugClient);
}

async function watchFiles() {
	watch(globs.pug, pug);
	watch(globs.pugClient, pugClient);
}

module.exports = {
	default: parallel(build(), watchFiles),
	build: build(),
};
