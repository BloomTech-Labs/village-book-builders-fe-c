// * ? Should this be reorganized into a common component?
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import { Button, Divider, Input, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import './libraries.css';

export default function Libraries() {
  // const mockSampleLibraries = [
  //   {
  //     id: 1,
  //     name: 'Okanoke Library',
  //     description: 'really tall building on the left',
  //     library_usage: 'this will be a paragraph',
  //     notes: 'another optiona paragraph',
  //     image: 'Url link here',
  //   },
  //   {
  //     id: 2,
  //     name: 'Merry Moving Library',
  //     description: 'cute, pink bus',
  //     library_usage: 'this will be a paragraph',
  //     notes: 'another optiona paragraph',
  //     image: 'Url link here',
  //   },
  //   {
  //     id: 3,
  //     name: 'First Fallon Library',
  //     description: 'Metal bunker at edge of town',
  //     library_usage: 'this will be a paragraph',
  //     notes: 'another optiona paragraph',
  //     image: 'Url link here',
  //   },
  // ];
  const [libraries, setLibraries] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState();
  // const [loading, setLoading] = useState(false);

  const { push } = useHistory();

  const getLibraries = () => {
    axiosWithAuth()
      .get(`/library`)
      .then(libraries => {
        console.log('libraries from new server', libraries);
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

  function handleModal(library) {
    setModal(library);
    setShowModal(true);
  }

  return (
    <div className="libraries-container">
      <h1>Libraries, Admin View.</h1>

      <Button style={{ width: '50%', marginBottom: '10pt' }} align="center">
        Create New Library
      </Button>
      <Input.Search placeholder="Search by Name" style={{ width: '50%' }} />
      <Divider />
      {libraries ? (
        libraries.map(library => {
          return (
            <div className="individual-library-container" key={library.id}>
              {/* TODO: make this a card instead & remove dividers or will that slow it down on low-end mobile devices?*/}
              <h2>{library.name}</h2>
              <p>{library.description}</p>
              {/* <div className="button-container"> */}
              <Button onClick={() => handleModal(library)}> More Info </Button>
              <Button onClick={() => handleEdit(library.id)}> Edit </Button>
              {/* </div> */}
              <Divider />
            </div>
          );
        })
      ) : (
        <p>
          Either there are no libraries, or there has been a problem with the
          server
        </p>
      )}
      {showModal && (
        <Modal
          visible={showModal}
          title={modal.name}
          onOk={() => handleEdit(modal.Id)}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="back" onClick={() => setShowModal(false)}>
              Done
            </Button>,
            <Button
              key="submit"
              type="primary"
              // loading={loading}
              onClick={() => handleEdit(modal.id)}
            >
              Edit
            </Button>,
          ]}
        >
          {modal.image ? (
            <img src={modal.image} alt="Library" />
          ) : (
            <p>Previous Image URL broken or not provided</p>
          )}
          <p>Description: {modal.description}</p>
          <p>Library Usage: {modal.library_usage}</p>
          <p>Notes: {modal.notes}</p>
          <p>Image: {modal.image}</p>
        </Modal>
      )}
    </div>
  );
}
