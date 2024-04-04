import dayjs from "dayjs";

function Film(id,title,favorite=false,date=null,score=0,user=1){
    this.id=id;
    this.title=title;
    this.favorite=favorite;
    this.date=(date===null) ? null : dayjs(date).format("YYYY-MM-DD");
    this.score=score;
    this.user=user;
}

export {Film};