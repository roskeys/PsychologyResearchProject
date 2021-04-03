import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Image } from 'antd';
import {Slider} from 'antd';

function Estimate() {
  return (
    <div>
        <Slider
        />
        <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
    </div>
  );
}

// ReactDOM.render(<ImageDemo />, mountNode);
export default Estimate;