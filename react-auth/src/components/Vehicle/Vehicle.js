import { Link } from 'react-router-dom';
import './Vehicle.css';

const Vehicles = (props) => {
    const { id, transport, image } = props.vehicle;

    return (
        <div className='col-lg-3'>
            <div className='card text-center'>
                <Link to={`/destination/${id}`}>
                    <div className='card-body'>
                        <img className='w-100' src={image} alt={transport}/>
                        <h5 className='card-title font-weight-bold'>
                            {transport}
                        </h5>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Vehicles;
