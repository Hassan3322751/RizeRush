import React from 'react';
import { Table, Button } from 'react-bootstrap';
import DashboardCard from '../Common Components/DashboardCard';

const ViewPromotions = (prop) => {
  const platformType = prop.platform;
  const dataArray = JSON.parse(localStorage.getItem('usersPromotions')) || [];
  const handleButtonClick = (promotionId) => {
    console.log('Button clicked for Promotion ID:', promotionId);
  };

  const keysToRender = ['_id', 'targetLink', 'promotionType', 'quantity', 'remainingQuantity'];

  const keyNames = {
    _id: 'ID',
    targetLink: 'Target Link',
    promotionType: 'Promotion Type',
    quantity: 'Quantity',
    remainingQuantity: 'Remaining Quantity',
  };

  return (
    <div>
      <DashboardCard platform={platformType}/>

      <div className="custom-scroll-tabs">
      {
        dataArray.length > 0 ? (
        <>
          <h1 className='bBotom text-center'>Promotions</h1>
          <Table striped bordered hover className="custom-scroll-table">
            <thead>
              <tr>
                {keysToRender.map((key) => (
                  <th key={key}>{keyNames[key]}</th>
                ))}
                <th>isCompleted</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {dataArray.map((data, index) => (
                <tr key={index}>
                  {keysToRender.map((key) => (
                    <td key={key}>{data[key]}</td>
                ))}
                <td>
                    {dataArray[index].isCompleted.toString()}
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleButtonClick(data._id)}
                    style={{ width: '100%' }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
        ) : (
          <div className='container1 flex-center'>
            <h1 className='bBotom'>No Promotion</h1>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default ViewPromotions;