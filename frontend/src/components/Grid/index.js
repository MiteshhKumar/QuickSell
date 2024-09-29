import React from 'react';
import './grid.css';
import Column from '../Column/Column';

function Grid({ gridData, grouping, userIdToData }) {
    const keys = Object.keys(gridData);

    return (
        <div className='grid'>
            {keys.map((k) => (
                <Column 
                    key={k} 
                    tickets={gridData[k]} 
                    grouping={grouping} 
                    groupBy={k} 
                    userIdToData={userIdToData} 
                />
            ))}
        </div>
    );
}

export default Grid;
