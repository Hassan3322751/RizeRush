import React, { useState, useEffect } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import axios from 'axios';
import baseUrl from '../Common Components/baseUrl.js';


const Reffer_Earn = () => {
  const [referrals, setReferrals] = useState([]);
  const [referrLink, setReferrLink] = useState();

  useEffect(() => {
    const fetchReferrals = () => {
        axios.get(`${baseUrl()}/isAuthenticated`, {
            withCredentials: true,
        })
        .then((response) => {
            if (response.data.success) {
                setReferrals(response.data.message.refrrals);
                setReferrLink(response.data.message.refrringLink[0]);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
      fetchReferrals();
  }, []);


  // Function to copy referral link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referrLink)
      .then(() => alert('Link copied to clipboard'))
      .catch((error) => console.error('Failed to copy link: ', error));
  };

  return (
    <Container>
      <h1 className='text-center mt-5 mb-3'>Reffer & Earn</h1>
      <div className="text-center mb-5">
        <p>Share this link with your friends:</p>
        <div className="d-flex">
          <input type="text" className="form-control bg-white" value={`${referrLink}`} readOnly />
          <Button variant="primary" onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>
      {
        referrals.length > 0 ? (
        <>
            <h1 className='text-center'>Referrals</h1>
          <Table striped bordered className='bg-white box-shadow'>
            <thead> 
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral, index) => (
                <tr key={index} className={index % 2 === 0 ? 'table-primary' : 'table-white'}>
                  <td>{index + 1}</td>
                  <td>{referral._id}</td>
                  <td>{referral.Name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
        ) : (
          <div className='container1 flex-center'>
            <h1 className=''>No referral</h1>
          </div>
        )
      }
    </Container>
  );
};

export default Reffer_Earn;
