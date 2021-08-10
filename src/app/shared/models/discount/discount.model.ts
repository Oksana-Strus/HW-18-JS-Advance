export interface IDiscount {
    id?: number;
    title: string;
    text: string;
    image: string;
    author: string;
    date: Date
}

export class Discount implements IDiscount {
    constructor(public title: string,
        public text: string,
        public image: string,
        public author: string,
        public date: Date) { }
}