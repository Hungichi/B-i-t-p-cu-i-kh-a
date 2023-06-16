export default class Money {
    id
    name
    amount
    date
    createdAt
    createBy
    updateAt
    updateBy
    status
    typeof

    constructor(name , amount, date, status, type){
        this.id = getAutoId();
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.status = status;
        this.type = type;
        this.createdAt = Date.now();
        this.createBy = getCurrentUser();
    }
    getAutoId(){

    }
    getCurrentUser(){
        
    }
}