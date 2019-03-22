/**
 *
 */
class Config extends require("@fluidnext/library").container.ContainerAware {
    init() {

        this.getContainer().get('Test').then(function (service) {
            this.getContainer().set('HelpService', new HelpService(service))
        }.bind(this));
    }
}

module.exports = Config;