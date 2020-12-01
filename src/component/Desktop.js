import React from 'react';
import './Desktop.css';
import { useStateValue } from '../Auth';

function Desktop() {
  const [{ desktop, }, dispatch] = useStateValue();
  const setSelCheckOutDestop = (desktop_name) => {
    dispatch(
      {
        type: 'DESKTOP_SELECT',
        payload: desktop_name
      }
    )
  }
  return (
    <div>
      {desktop?.map(({ desktop_name, enabled, basket_number }) => {
        return (
          <div key={desktop_name}>
            <div onClick={() => setSelCheckOutDestop(desktop_name)}>{desktop_name} {enabled && 'order'}</div>
          </div>
        )
      })}
    </div>)
}

export default Desktop;