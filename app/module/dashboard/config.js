/**
 *
 */
class Config extends require("@fluidnext/library").container.ContainerAware {

    init() {
        this.getContainer().set('DashboardService', new DashboardService());
    }
}


module.exports = Config;
