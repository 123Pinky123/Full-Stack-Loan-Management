import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

// Remove BootstrapContext entirely
const bootstrap = () =>
    bootstrapApplication(App, config);

export default bootstrap;
