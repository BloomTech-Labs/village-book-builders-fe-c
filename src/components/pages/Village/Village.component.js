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
    <div>
      <div>
        <Divider orientation="left">Villages</Divider>
        <p>Village Contact: {villageData.village_contact_name}</p>
        <p>Village Contact Phone: {villageData.village_contact_phone}</p>
        {/* //! These are not in the data from server atm */}
        <p>Education Contact: {villageData.educationContactName}</p>
        <p>{villageData.educationContactEmail}</p>
        <p>{villageData.educationContactPhone}</p>
        <p>Notes: {villageData.notes}</p>
        <div>
          <Link to={`/village/edit/${villageData.id}`}>
            <Button buttonText="Edit Village Profile" />
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
