import React from 'react';
import './Item.css';

const item = (props) => (
        <div className="Item"
            onClick={props.clicked}>{props.children}
        </div>
)
export default item;