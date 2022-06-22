import Route from '@ember/routing/route';
import config from '../config/environment';

export default class ApplicationRoute extends Route {
  setupController(controller) {
    super.setupController(...arguments);

    const appVersion = config.APP.appVersion;
    controller.setProperties({ appVersion: appVersion });
  }
}
