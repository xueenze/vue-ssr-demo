const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
// const microcache = require('route-cache');

const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer, } = require('vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';
// const useMicroCache = process.env.MICRO_CACHE !== 'false';

const app = express();

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15,
        }),
        basedir: resolve('./dist'),
        runInNewContext: false,
    }));
}

let renderer;
let readyPromise;
const templatePath = resolve('./src/index.template.html');

if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const bundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createRenderer(bundle, {
        template,
        clientManifest,
    });
} else {
    readyPromise = require('./build/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options);
        }
    );
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
});

app.use('/dist', serve('./dist', true));

function render(req, res) {
    const s = Date.now();

    res.setHeader('Content-Type', 'text/html');

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error');
            console.error(`error during render : ${req.url}`);
            console.error(err.stack);
        }
    };

    const context = {
        title: 'Demo',
        url: req.url,
    };

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err);
        }

        // 这里我们对IE的访问进行404的返回
        if (req.headers['user-agent'].indexOf('Trident') > -1) {
            res.send('<html><body>Not use IE</body></html>');
            return;
        }

        res.send(html);
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`);
        }
    });
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
