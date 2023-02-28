import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { ellipsis } from '../../helpers';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaYoutubeSquare } from 'react-icons/fa';

const Footer = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/front-end/?name=footer&language=EN`)
      .then(res => {
        console.log('res.data', res.data);
        setData(res.data.view);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  return data ? (
    <div className='footer-container'>
      <div>
        <div>
          <img className="logo" src={data.content.top.first.logo} alt="logo" />
          <p>{ellipsis(170, data.content.top.first.main)}</p>
        </div>
        <div>
          {data.content.top.second.links.map((el, i) => {
            return <div key={i}>{el.name}</div>;
          })}
        </div>
        <div>
          <p>{data.content.top.third.title}</p>
          <div>
            <a href={data.content.top.third.links[0].link } target="_blank" rel="noreferrer">
              <button type="button">
                <FaFacebook size={30}/>
              </button>
            </a>
            <a href={data.content.top.third.links[1].link } target="_blank" rel="noreferrer">
              <button type="button">
                <FaTwitter size={30}/>
              </button>
            </a>
            <a href={data.content.top.third.links[2].link } target="_blank" rel="noreferrer">
              <button type="button">
                <FaInstagram size={30}/>
              </button>
            </a>
            <a href={data.content.top.third.links[3].link } target="_blank" rel="noreferrer">
              <button type="button">
                <FaYoutubeSquare size={30}/>
              </button>
            </a>
            <a href={data.content.top.third.links[4].link } target="_blank" rel="noreferrer">
              <button type="button">
                <FaLinkedin size={30}/>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div>
        <p>{data.content.bottom.right.title}</p>
      </div>
    </div>
  ) : null;
};

export default Footer;
