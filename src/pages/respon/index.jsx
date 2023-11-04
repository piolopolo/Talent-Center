import React from 'react';
import SearchBox from 'components/SearchBox';


const tableStyle = {
  backgroundColor: 'transparent',
  borderCollapse: 'collapse',
  width: '100%', // Sesuaikan dengan lebar yang Anda inginkan
};

const thStyle = {
  backgroundColor: '#f2f2f2',
  color: 'black',
  padding: '10px',
};

const tdStyle = {
  color: 'black',
  padding: '10px',
};

const TransparentTable = () => {
  return (
    <div>
      <SearchBox sx={{borderRadius: '2px'}} />
    <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Nama</th>
            <th style={thStyle}>Usia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>John Doe</td>
            <td style={tdStyle}>30</td>
          </tr>
          <tr>
            <td style={tdStyle}>Jane Smith</td>
            <td style={tdStyle}>25</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransparentTable;
