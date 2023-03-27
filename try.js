const obj = {
    MangaName : {
        type : String,
        required : true
    },
    Chapters: {
        type : Array,
        required : true
    }
}
let arr = [5,3,4,1,2];
obj.MangaName = "kaguya";
obj.Chapters = 1;
console.log(obj)
obj.Chapters.push(50)
console.log(arr)
console.log(typeof(obj.Chapters))
console.log(obj)
