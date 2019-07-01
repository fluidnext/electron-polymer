/**
 *
 */
class Config extends require("@fluidnext/library").container.ContainerAware {
    init() {

        this.getContainer().set('DemoService', new DemoService());
    }
}

module.exports = Config;
