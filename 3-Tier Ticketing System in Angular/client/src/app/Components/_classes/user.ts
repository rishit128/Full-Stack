export class User {
    
    constructor(
        public name: String,
        public phone: Number | null,
        public email: String,
        public password: String,
       public _id:String
    ) {  }
}
