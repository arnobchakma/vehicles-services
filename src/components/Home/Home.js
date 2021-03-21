import React, { useState } from 'react';
import fakeData from '../../fakeData/fakeData.json';
import Vehicle from '../Vehicle/Vehicle';
import './Home.css';

const Home = () => {
    const [vehicles, setVehicles] = useState(fakeData);
    return (
       <div className="home-width">
            <div className="row">
                {
                    vehicles.map(data => <Vehicle vehicle={data} key={data.id}></Vehicle>)
                }
            </div>
        </div>    
    );
};

export default Home;