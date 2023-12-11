export class Command {
    constructor(resourceType, httpClient) {
        this.resourceType = resourceType;
        this.httpClient = httpClient;
    }
    execute(data, options) {
        const payload = data instanceof FormData
            ? data
            : Object.assign(Object.assign({}, data), { resourceType: this.resourceType });
        return this.httpClient.post('/api/rx/application/command', payload, options);
    }
}
//# sourceMappingURL=command.class.js.map