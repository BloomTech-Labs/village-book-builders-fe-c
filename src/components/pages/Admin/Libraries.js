// * ? Should this be reorganized into a common component?
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Divider, Input, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import './libraries.css';

export default function Libraries() {
  const [libraries, setLibraries] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { push } = useHistory();

  const getLibraries = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/library`)
      .then(libraries => {
        setLibraries(libraries.data);
      })
      .catch(err => {
        //TODO: make this .catch more useful
        console.log(err);
      });
  };

  useEffect(() => {
    getLibraries();
  }, []);

  function handleEdit(libraryId) {
    console.log('handle edit');
    // TODO: better to pass the libary data here than do a second axios call at new page. Or set it to redux store here, so I can pull it out at new page. Decisions...
    push(`/admin/library/edit/${libraryId}`);
  }

  return (
    <div className="libraries-container">
      <h1>Libraries, Admin View.</h1>

      <Button style={{ width: '50%', marginBottom: '10pt' }} align="center">
        Create New Library
      </Button>
      <Input.Search placeholder="Search by Name" style={{ width: '50%' }} />
      <Divider />
      {libraries
        ? libraries.map(library => {
            return (
              <div className="individual-library-container" key={library.id}>
                {/* TODO: make this a card instead & remove dividers or will that slow it down on low-end mobile devices?*/}
                <h2>{library.name}</h2>
                <p>{library.description}</p>
                {/* <div className="button-container"> */}
                <Button onClick={() => setShowModal(true)}> More Info </Button>
                <Button onClick={() => handleEdit(library.id)}> Edit </Button>
                {/* </div> */}
                <Modal
                  visible={showModal}
                  title={library.name}
                  onOk={() => handleEdit(library.Id)}
                  onCancel={() => setShowModal(false)}
                  footer={[
                    <Button key="back" onClick={() => setShowModal(false)}>
                      Done
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      // loading={loading}
                      onClick={() => handleEdit(library.id)}
                    >
                      Edit
                    </Button>,
                  ]}
                >
                  {library.image ? (
                    <img src={library.image} alt="Library" />
                  ) : (
                    <p>Previous Image URL broken or not provided</p>
                  )}
                  <p>Description: {library.description}</p>
                  <p>Library Usage: {library.library_usage}</p>
                  <p>Notes: {library.notes}</p>
                  <p>Image: {library.image}</p>
                </Modal>
                <Divider />
              </div>
            );
          })
        : null}
    </div>
  );
}
