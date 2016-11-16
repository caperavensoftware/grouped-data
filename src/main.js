export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging();

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}