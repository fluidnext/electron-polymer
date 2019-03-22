/**
 *
 */
class Config extends require("@fluidnext/library").container.ContainerAware {
    init() {
        this.getContainer().set('HomeService', new HomeService());
    }
}


module.exports = Config;
