/**
 *
 */
class Config extends require("@fluidnext/library").container.ContainerAware {

    init() {

        this.initAcl();

        this.getContainer().set('DemoService', new DemoService(
            this.getContainer().get('GlobalService')
        ));
    }

    /**
     *
     */
    initAcl() {

        if (this.getContainer().has('Acl')) {

            let aclService = this.getContainer().get('Acl');

            // TODO add method on service
            aclService.adapter.acl.addResource('demo');
            aclService.adapter.acl.allow('guest', 'demo');
        }
    }


}

module.exports = Config;
