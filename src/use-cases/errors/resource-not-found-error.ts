export class ResourceNotFoundExists extends Error {
    constructor(){
        super("Resource not found")
    }
}