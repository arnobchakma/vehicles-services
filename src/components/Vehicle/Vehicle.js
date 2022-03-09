import React from 'react';
import { useHistory } from 'react-router';
import './Vehicle.css';

const Vehicle = (props) => {
    const { type, img } = props.vehicle;
    const history = useHistory();
    const handleVehicle = (type) => {
        history.push(`/${type}`);
    }
    return (
        <div className="col-lg-3 col-md-6">
            <div className="card" onClick={() => handleVehicle(type)}>
                <div className="card-body">
                    <img src={img} alt={type} />
                    <h3>{type}</h3>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;