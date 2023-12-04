



export class UpdatedStatusUserDto {

    constructor(
        public readonly id_user: number,
        public readonly status?: string
    ){}

    get values(){
        const returnObj: {[key:string]: any} = {};

        if( this.status ) returnObj.status_user = this.status;

        return returnObj;
    }

    static create(object: { [key: string]: any }): [string?, UpdatedStatusUserDto?] {

        const { id_user, status} = object;
        
        if(!id_user || isNaN(id_user)) return ['id user must be a number'];


        return [undefined, new UpdatedStatusUserDto( id_user, status )];

    }

        
}




