import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Image } from 'antd';
import { Button } from 'antd';

function Exp(props) {
  return (
    <div className = "Exp">
        <Image
        width={200}
        src="{props.path}"
        />
        <Button>
        Next
        </Button>
    </div>
  );
}

// ReactDOM.render(<ImageDemo />, mountNode);
export default Exp;