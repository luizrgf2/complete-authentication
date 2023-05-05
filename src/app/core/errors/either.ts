export class Right<T>{

    right:T
    left:undefined

    constructor(value:T){
        this.right = value
    }

    static create<T>(value:T):Right<T>{
        return new Right(value)
    }

}

export class Left<T>{

    right:undefined
    left:T

    constructor(value:T){
        this.left = value
    }

    static create<T>(value:T):Left<T>{
        return new Left(value)
    }

}

export type Either<L,R> = Left<L>|Right<R>