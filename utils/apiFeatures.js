class ApiFeatures{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            }
        }:{}
        // regrex : regular expression , i means case insensitive mongodb operator

        //console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        // actual copy ban gyi hai na ki reference hai object ka
        const queryCopy={...this.queryStr};
          //console.log(queryCopy);

        //removing some fields for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>{
         delete queryCopy[key];
        })
        //filter for price and rating
        // console.log(queryCopy);
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
        // regular expression


        //console.log(queryCopy);
        this.query=this.query.find(JSON.parse(queryStr));
        //  console.log(queryStr);
        return this;
    }
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip= resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;

    }
};
module.exports=ApiFeatures;

// queryStr ka matlab hai http://localhost:4000/api/products ke baad jo aata hai ?keyword=chai so yeh hai queryStr 