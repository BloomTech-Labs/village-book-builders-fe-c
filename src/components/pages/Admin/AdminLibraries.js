import React from 'react';
import { Button, Divider } from 'antd';

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

  return (
    <>
      <h1>Libraries, Admin View.</h1>
      <Divider />
      <Button>Add New Library</Button>
      {mockLibraries.map(library => {
        return (
          <div>
            <h2>{library.name}</h2>
            <p>{library.description}</p>
            {/* <p>{library.library_usage}</p>
            <p>{library.notes}</p>
            <p>{library.image}</p> */}
            <Button>More Info</Button>
            <Button>Edit</Button>
            <Divider />
          </div>
        );
      })}
    </>
  );
}
