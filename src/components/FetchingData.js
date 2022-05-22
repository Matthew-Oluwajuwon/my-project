import React, {useState} from 'react';
import MyPieChart from './PieChart'
import axios from 'axios';
import _ from 'lodash';


const pageSize = 5;
const FetchingData = () => {
    const [posts, setposts] = useState();
    const [paginatedPost, setPaginatedPost] = useState();
    const [currentPage, setCurrentPage] = useState(1); 
    const [searchTerm, setSearchTerm] = useState("");
    
    
const data = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(res=>{
            console.log(res.data);
             setposts(res.data);
            setPaginatedPost(_(res.data).slice(0).take(pageSize).value());
        });
         
         
};
    
    const pageCount = posts? Math.ceil(posts.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1)

    const pagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1)  * pageSize;
        const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
        setPaginatedPost(paginatedPost)
    }
    
    
    return ( 
        <div className="post-container">
            <div className="search-fetch">
                <input type="text" className="input-field" placeholder="Search..." onChange={(e)=> {
                setSearchTerm(e.target.value)}
                } />
                <button type="button" className="btn" onClick={data}><i className="bi bi-arrow-clockwise"></i>Fetch Post</button>
            </div>
            
            {
            
                paginatedPost ? (
                    <table className="table table-striped">
                        <thead className="thead-danger">
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>BODY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              paginatedPost.filter((value) => {
                                  if (searchTerm === "") {
                                      return value;
                                  } else if(
                                      value.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      value.body.toLowerCase().includes(searchTerm.toLowerCase())
                                   ) {
                                      return value;
                                   }
                              }).map((post, index)=> (
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.body}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className='table-data'>
                        <div className="empty">
                            <ul>
                                <li className="id">ID</li>
                                <li>TITLE</li>
                                <li>BODY</li>
                            </ul>
                        </div>
                        <div className="no-data">
                                <h4>No Data Found</h4>
                            </div>
                    </div>
                )
            }
            
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {
                        pages.map((page) => (
                        <li className={
                            page === currentPage? "page-item active" : "page-item"
                        }>
                            <p className="page-link"
                            onClick={()=>pagination(page)}>{page}</p>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            {
                paginatedPost ? (
                <MyPieChart />
                ) : (
                    "No Data Found"
                )
                }
        </div>
     );
}
 
export default FetchingData;