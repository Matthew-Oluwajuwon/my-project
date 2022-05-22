import React from 'react';
import FetchingData from './FetchingData';


const Header = () => {
    return (
        <div className="head-body"> 
            <div className="header-title">
                <div className="sm-logo">
                        <img src="xpresspayout.png" alt="logo"/>
                    </div>
                <h1>JSON PLACEHOLDER API</h1>
            </div>
            <FetchingData />
        </div>
     );
}
 
export default Header;