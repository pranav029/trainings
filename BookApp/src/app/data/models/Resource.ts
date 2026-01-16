export interface Resource<T> { }

export class Loading<T> implements Resource<T> { }

export class Success<T> implements Resource<T> {
    data?: T
    constructor(data?: T) {
        this.data = data
    }
}

export class Failure<T> implements Resource<T> {
    message: string
    constructor(message: string) {
        this.message = message
    }
}