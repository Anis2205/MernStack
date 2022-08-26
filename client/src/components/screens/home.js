import React, { useEffect, useState , useContext} from "react";
import { Link } from 'react-router-dom'
import {UserContext} from '../../App'
const Home = () => {
  const {state,dispatch} = useContext(UserContext)
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwttoken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setdata(result.post);
      });
  }, []);

  const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwttoken")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setdata(newData)
    })
}

  const makeComment = (text,postId)=>{
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwttoken")
        },
        body:JSON.stringify({
            postId,
            text
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
       })
      setdata(newData)
    }).catch(err=>{
        console.log(err)
    })
}


  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwttoken"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setdata(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwttoken"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setdata(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card">
                       <h5 style={{padding:"5px"}}>{item.postedBy.name}{item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                  
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
