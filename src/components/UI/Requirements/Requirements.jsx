import React from 'react';

import DOMPurify from 'dompurify';

import './requirements.scss';

const Requirements = ({platform, req, type}) => {
  let output = '';
  const sanitizedText = DOMPurify.sanitize(req); 
  const regex = /\n([\w\s®]+:)/g;

  if (platform.platform.name === 'PC' && Object.keys(platform.requirements).length !== 0) {
    let items = '';

    if (type === 'Minimal' && req !== undefined) {
      output = sanitizedText.replace(regex, '\n<strong>$1</strong>');
      if (output.includes('\n')) { // if formatted text
        items = output.split('\n');
        output = items.map((item, index) => {
  
          if (index === 0) {
            return null;
          }

          if (item.length === 0) {
            return null; // if empty text
          }
          return <li className="reqs-li" key={index} dangerouslySetInnerHTML={{ __html: item }}></li>;
        });
      } else { // if raw text
        return <li key={platform.platform.id} className="reqs-li">{req}</li>;
      }
    }
    if (type === 'Recommended' && req !== undefined) {
      output = sanitizedText.replace(regex, '\n<strong>$1</strong>');
      if (output.includes('\n')) { // if formatted text
        items = output.split('\n');
        output = items.map((item, index) => {
  
          if (index === 0) {
            return null;
          }

          if (item.length === 0) {
            return null; // if empty text
          }
          return <li className="reqs-li" key={index} dangerouslySetInnerHTML={{ __html: item }}></li>;
        });
      } else { // if raw text
        return <li key={platform.platform.id} className="reqs-li">{req}</li>;
      }
    }

    if (req === undefined) { // if is no requirement
      output = <div className="reqs-block">
        <div className="reqs-undefined">There is no {type} requirements information for this game</div>
      </div>  
    }
    
  } else {
    return <div className="reqs-block">
      <div className="reqs-name">{type}</div>
      <ul className="reqs-ul">
      <div className="reqs-undefined">There is no {type} requirements information for this game</div>
      </ul> 
    </div> 
  }

  return (
    <div className="reqs-block">
      <div className="reqs-name">{type}</div>
      <ul className="reqs-ul">
        {output}
      </ul> 
    </div> 
  );
};

export default Requirements;