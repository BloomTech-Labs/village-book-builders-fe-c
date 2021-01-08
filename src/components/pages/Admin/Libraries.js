// * ? Should this be reorganized into a common component?
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import { Button, Divider, Input, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import './libraries.css';

export default function Libraries() {
  const [libraries, setLibraries] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [libraryModal, setLibraryModal] = useState(false);
  const [search, setSearch] = useState('');

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

  const searchHandler = e => setSearch(e.target.value);

  function handleAddLibrary() {
    push('/admin/library/add');
  }

  function handleEdit(libraryId) {
    // console.log('handle edit');
    // TODO: better to pass the libary data here than do a second axios call at new page. Or set it to redux store here, so I can pull it out at new page. Decisions...
    push(`/admin/library/edit/${libraryId}`);
  }

  function handleModal(library) {
    setLibraryModal(library);
    setShowModal(true);
  }

  return (
    <div className="libraries-container">
      <h1>Libraries, Admin View.</h1>

      <Button
        onClick={() => handleAddLibrary()}
        style={{ width: '50%', marginBottom: '10pt' }}
        align="center"
      >
        Create New Library
      </Button>
      <Input.Search
        onChange={searchHandler}
        value={search}
        placeholder="Search by Name"
        style={{ width: '50%' }}
      />
      <Divider />
      {libraries ? (
        libraries
          .filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(library => {
            return (
              <div className="individual-library-container" key={library.id}>
                <h2>{library.name}</h2>
                <p>{library.description}</p>
                {/* <div className="button-container"> */}
                <Button onClick={() => handleModal(library)}>
                  {' '}
                  More Info{' '}
                </Button>
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
          title={libraryModal.name}
          onOk={() => handleEdit(libraryModal.Id)}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="back" onClick={() => setShowModal(false)}>
              Done
            </Button>,
            <Button
              key="submit"
              type="primary"
              // loading={loading}
              onClick={() => handleEdit(libraryModal.id)}
            >
              Edit
            </Button>,
          ]}
        >
          {libraryModal.image ? (
            <img src={libraryModal.image} alt="Library" />
          ) : (
            <p>Previous Image URL broken or not provided</p>
          )}
          <p>Description: {libraryModal.description}</p>
          <p>Library Usage: {libraryModal.library_usage}</p>
          <p>Notes: {libraryModal.notes}</p>
          <p>Image: {libraryModal.image}</p>
        </Modal>
      )}
    </div>
  );
}
