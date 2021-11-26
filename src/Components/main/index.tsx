import React,{useState,useEffect} from 'react'
import axios from "axios";
import {Pagination,Grid,Card ,CardActions ,CardContent ,Typography, Container} from "@mui/material";
import "./index.css";
const api = (page:any)=>{
    console.log(page)
    return "https://hn.algolia.com/api/v1/search_by_date?tags=story&page="+page;
}
const post1 = async (page:any)=>{
    var response = await axios.get(api(page));
    console.log(response.data.hits);
    return response.data.hits;

}
// const io = (len)=>{
//     let i = 0;
//     var ls = [];
//   while (i<len)
//     {
//         ls.push(i);
//         i++;
//     }
//     return ls
// }
var page=0;
export default function Index() {
    const [post, setstate] = useState<any[]>([])
    const [temp , setTemp]=useState<any[]>([])
    const [loading,setLoading]=useState(false)
    const [currentpage,setPage]=useState(0)
    const [counter,setCounter]=useState(0)
    
    useEffect( ()=>{
        var timer:any;
        (async()=>{
            if(!loading){
                console.log("val");
                let value = await post1(page);
                setLoading(true)
                console.log(value);
                let temp = post;
               
                temp.push(value)
                setPage(0);
                setstate(temp)
                var temp1=post[currentpage];
                
                var i=0;
                    var temp2=[];
                    while (i<temp1.length){
                        temp2.push(temp1.slice(i,i+3));
                        i=i+3;
                    }
                    setTemp(temp2);
                setCounter(counter+1);
                page++;
                console.log(1);
            }
                timer=setTimeout(async ()=>{
                    let value = await post1(page);
                    var temp = post;
                   
                    temp.push(value);
                    setPage(0);
                    setstate(temp);
                    
                    
                    var temp1=post[currentpage];
                    var i=0;
                    var temp2=[];
                    while (i<temp1.length){
                        temp2.push(temp1.slice(i,i+3));
                        i=i+3;
                    }
                    setTemp(temp2);
                    setCounter(counter+1);
                  page++
                },10000);
            
        })()
        
        return  () => {
            window.clearInterval(timer);
          };
    },[counter]);
    
    
    return (
        <div data-testid="whole">
        {!loading?<div>Loading....</div>:<></>}
        

          <Container style={{display:"flex",flexDirection:"column","alignItems":"center",marginTop:"3%"}}>
          <Typography data-testid="post" variant="h3" component="h2">
              POSTS
            </Typography>
          </Container>
           {temp.map((value,index)=>{
               return (
                   <>
                   <Grid container justifyContent={"center"} spacing={2} style={{marginTop:"2%"}}>
                       {value.map((value1:any,index1:any)=>(
                           <Grid item xs={3}>
                               <Card >
                                   <CardContent>
                                       <Typography> Title :- {value1.title}</Typography>
                                       <Typography> Link :- <a href={value1.url}>post link</a></Typography>
                                       <Typography>author:-{value1.author}</Typography>
                                       <Typography>created_at:{new Date(value1.created_at_i).toISOString()}</Typography>
                                       <Typography>Tags:{
                                                    "_tags" in value1 ?value1._tags.map((value11:any,index:any)=>{
                                return (
                            <div className="item1">
                            {value11}
                            </div>
                        )
                    }):<></>
                                           
                                           }</Typography>
                                      
                                   </CardContent>
                               </Card>
                           </Grid>
                       ))}
                   </Grid>
                   </>
               )
          
           })}
           <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}> <Pagination count={post.length} onChange={(e,value)=>{
               
                var temp1=post[value-1];
                var i=0;
                var temp2=[];
                while (i<temp1.length){
                    temp2.push(temp1.slice(i,i+3));
                    i=i+3;
                }
                setTemp(temp2);
                setPage(value);
           }} color="primary"></Pagination></div>
        
        </div>
    )
}
