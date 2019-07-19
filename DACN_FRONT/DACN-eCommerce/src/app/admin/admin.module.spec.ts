import { AdminModule } from './admin.module';

describe('AdminModule', () => {
    let AdminModule: AdminModule;

    beforeEach(() => {
        AdminModule = new AdminModule();
    });

    it('should create an instance', () => {
        expect(AdminModule).toBeTruthy();
    });
});
