import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { fetchVillage } from '../../../state/actions/index';

const Village = ({ villageData, userId, fetchVillage }) => {
  // const { villageData, fetchVillage } = props;
  useEffect(() => {
    // console.log("village component useEffect", villageData);
    fetchVillage(userId); // !This headmaster ID is being hardcoded right now
  }, []);
  // console.log("village component, villageData", villageData);

  return (
    <div className="school-village-container">
      <h1 style={{ textAlign: 'center' }} className="page-title">
        Schools & Villages
      </h1>
      <Divider orientation="left">Villages</Divider>
      <div className="village-container">
        <div>
          <span>Village Contact:</span> {villageData.village_contact_name}
        </div>
        <div>
          <span>Village Contact Phone:</span>{' '}
          {villageData.village_contact_phone}
        </div>
        {/* //! These are not in the data from server atm */}
        <div>
          <span>Education Contact:</span> {villageData.educationContactName}
        </div>
        <div>{villageData.educationContactEmail}</div>
        <div>{villageData.educationContactPhone}</div>
        <div>
          <span>Notes:</span> {villageData.notes}
        </div>
        <div>
          <Link to={`/village/edit/${villageData.id}`}>
            <Button style={{ margin: '.5rem 0' }}>Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    villageData: state.headmasterReducer.villageData,
    userId: state.authReducer.userId,
  };
};

export default connect(mapStateToProps, { fetchVillage })(Village);
