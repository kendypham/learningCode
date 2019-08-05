// Đề 2: Cho trước 1 List < String > viết 1 hàm nhận param là (String a, String b) trả về khoảng cách a,b trong list. Nếu a,b bị duplicate trong list thì trả về khoảng cách bé nhất; a hoặc b không tồn tại thì trả về -1
// Ví dụ: list = [“cat”, “dog”, “bird”, “fish”, “cat”,“duck”,“chicken”,“dog”]
// dist(“dog”,“duck”) -> 2 // dog sau gần duck hơn dog đầu
// dist(“cat”,“frog”) -> -1
var  list = ["cat","dog", "bird", "fish", "cat","duck","chicken","dog"];
var findIndex = function(str){
    var tmp = [];
    list.forEach((v,i) => {   
        if(v === str){
            tmp.push(i)
        }
    })
    return tmp;
}
var countSpace = function(strA, strB){
    if(list.includes(strA) && list.includes(strB))
        {   
            var space = Math.abs(findIndex(strA)[0] - findIndex(strB)[0]);
            for(let i of findIndex(strA)){
                for(let j of findIndex(strB)){
                    if(Math.abs(i-j) < space)
                        space = Math.abs(i-j)
                }
            }
            return space; 
        }
    return -1;
}

var result = countSpace("dog","dog");
console.log(result);