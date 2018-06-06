
export class Task
{
    constructor(
       public id :number,
       public userId :number,
       public summary:string,
       public description:string,
       public priorityId:string,
       public statusId:string,
    ) {}
}