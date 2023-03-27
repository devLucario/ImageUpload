// a function to break the image name to specify its various details

function nameBreak(name){
    let nameObj = {
        MangaName : String,
        Page : Boolean,
        PageNo : Number
    }
    let flag = 0, index1 = 0, index2 = 0;

    // conerting to lowercase and removing extension
    name = name.toLowerCase();
    for(let j=name.length;j>0;j--){
        if(name[j]=='.'){
            name = name.slice(0,j)
        }
    }
    // console.log(name)
    // finding indexes of --
    for(let i=0;i<name.length;i++){
        // console.log(i,"   ",name[i])
        if(name[i]=='-' && name[i+1]=='-'){
            flag = flag+1;

            if(flag == 1){
                index1 = i+2;
            }
            if(flag == 2){
                index2 =i+2;
            }
        }
    }
    // console.log(index1,"   ",index2)
    // finding MangaName & page no
    nameObj.MangaName = name.slice(index1,index2-2);
    if(name.substr(index2,4)=='page'){
        nameObj.Page = true;
        nameObj.PageNo = Number(name.slice(index2+4))
    }
    else{
        nameObj.Page = false;
        nameObj.PageNo = -1;
    }

    return nameObj;
}

// console.log(nameBreak("1679152603664--Kaguya-Sama: LoveIsWar--page 23"))
// date--MangaName--page 1.jpg
// or use icon

export {nameBreak};