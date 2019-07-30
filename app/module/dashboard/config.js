/**
 *
 */
class Config extends require("@fluidnext/library").container.ContainerAware {

    init() {

        this.initAcl();

        this.getContainer().set('DashboardService', new DashboardService());
    }

    /**
     *
     */
    initAcl() {

        if (this.getContainer().has('Acl')) {

            let aclService = this.getContainer().get('Acl');

            // TODO add method on service
            aclService.adapter.acl.addResource('dashboard');
            aclService.adapter.acl.allow('guest', 'dashboard');
        }
    }
}


module.exports = Config;
