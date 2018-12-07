import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
// Other imports
import { UNIVERSAL_ROUTES } from './universal-routes';
import * as cookieParser from 'cookie-parser';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.js');

// We need cookies for client/server
app.use(cookieParser('ngx-cauldron-token'));

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
    // In case you want to use an AppShell with SSR and Lazy loading
    // you'd need to uncomment the below. (see: https://github.com/angular/angular-cli/issues/9202)
    // {
    //   provide: NgModuleFactoryLoader,
    //   useClass: ModuleMapNgFactoryLoader,
    //   deps: [
    //     Compiler,
    //     MODULE_MAP
    //   ],
    // },
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get(UNIVERSAL_ROUTES, (req, res) => {
  console.log('Route handled by UNIVERSAL');
  res.render('index', { req, res });
});

// All Universal routes use the Universal engine
// app.get(UNIVERSAL_ROUTES, (req, res) => {
//   console.log('Route handled by UNIVERSAL');
//   res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
// });

// All Non-universal routes use pure Angular
app.get('*', function (req, res) {
  console.log('Route handled by ANGULAR CLIENT-SIDE');
  res.sendFile(join(DIST_FOLDER, 'browser', 'index.html'));
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
