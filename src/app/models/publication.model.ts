export class Publication {
    _id: string;

    constructor(
        public id: string,
        public text: string,
        public file: string,
        public created_at: string,
        public user: any,
    ) {
    }
}
