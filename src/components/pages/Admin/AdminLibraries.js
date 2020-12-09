import React, { useState } from 'react';
import { Button, Divider, Modal } from 'antd';
import { useHistory } from 'react-router-dom';

export default function AdminLibraries() {
  const mockLibraries = [
    {
      id: 1,
      name: 'Okanoke Library',
      description: 'really tall building on the left',
      library_usage: 'this will be a paragraph',
      notes: 'another optiona paragraph',
      image: 'Url link here',
    },
    {
      id: 2,
      name: 'Merry Moving Library',
      description: 'cute, pink bus',
      library_usage: 'this will be a paragraph',
      notes: 'another optiona paragraph',
      image: 'Url link here',
    },
    {
      id: 3,
      name: 'First Fallon Library',
      description: 'Metal bunker at edge of town',
      library_usage: 'this will be a paragraph',
      notes: 'another optiona paragraph',
      image: 'Url link here',
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { push } = useHistory();

  function handleMoreInfo() {
    // setLoading(true);
    console.log('handleMoreInfo ran here');
    setShowModal(true);
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
  }

  function handleEdit(libraryId) {
    console.log('handle edit');
    // better to pass the libary data here than do a second axios call at new page. Or set it to redux store here, so I can pull it out at new page. Decisions...
    push(`/admin/library/edit/${libraryId}`);
  }

  return (
    <>
      <h1>Libraries, Admin View.</h1>
      <Divider />
      <Button>Add New Library</Button>
      {mockLibraries.map(library => {
        return (
          <div key={library.id}>
            {/* TODO: make this a card instead & remove dividers or will that slow it down on low-end mobile devices?*/}
            <h2>{library.name}</h2>
            <p>{library.description}</p>
            <Button onClick={() => handleMoreInfo()}> More Info </Button>
            <Button onClick={() => handleEdit(library.id)}> Edit </Button>
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
                  loading={loading}
                  onClick={() => handleEdit(library.id)}
                >
                  Edit
                </Button>,
              ]}
            >
              <p>Description: {library.description}</p>
              <p>Library Usage: {library.library_usage}</p>
              <p>Notes: {library.notes}</p>
              <p>Image: {library.image}</p>
            </Modal>
            <Divider />
          </div>
        );
      })}
    </>
  );
}
