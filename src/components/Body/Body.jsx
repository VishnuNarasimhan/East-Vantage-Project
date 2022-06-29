import './Body.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Body() {
  //Using useState we are tracking the state of the functional component...
  const [data, setData] = useState();

  //Using fetchData function we are fetching the Data with help of axios GET request...
  const fetchData = async () => {
    const { data } = await axios.get('https://randomuser.me/api');
    console.log(data);
    setData(data);
  };

  //Using useEffect we are calling the fetchData function...
  useEffect(() => {
    fetchData();
  }, []);

  // Below code is used to store the data in local storage...
  let my_data = JSON.stringify(data);
  localStorage.setItem('userData', my_data);

  return (
    <div className='Body'>
      <h1 className='Body-heading'>User Details</h1>
      <hr />
      {/* Here we are rendering the data with help of map method... */}
      {data &&
        data.results.map((item, index) => (
          <div className='body-content' key={index}>
            <img
              src={item.picture.large}
              alt=''
              className='body-content-profile-img'
            />
            <p className='body-content-name'>
              {item.name.title} {item.name.first} {item.name.last}
            </p>
            <p className='body-content-email'>{item.email}</p>
          </div>
        ))}
      <button
        onClick={() => {
          fetchData();
        }}
        className='Body-btn'
      >
        Fetch User
      </button>
    </div>
  );
}
