/**
 *
 */
class Config extends require("@fluidnext/library").container.ContainerAware {
    init() {

        this.getContainer().set('DemoService', new DemoService(
            this.getContainer().get('GlobalService')
        ));
    }
}

module.exports = Config;
