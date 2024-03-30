import React from 'react'
import Askarologo from '../images/askarologo.jpg';
import HomeIcon from '@material-ui/icons/Home';
import FeaturedPlaylistOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlined from "@material-ui/icons/AssignmentIndOutlined";
import PeopleAltOutlined from '@material-ui/icons/PeopleAltOutlined';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined'
import Search from '@material-ui/icons/Search';
import { Avatar, Button } from '@material-ui/core';
import './css/askaronevbar.css';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'
import { ExpandMoreOutlined } from '@material-ui/icons';
import axios from 'axios';

function AskaroNevbar() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");

  const Close = <CloseIcon />;

  const handleSubmit = async () => {
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        questionName: question,
        questionUrl: inputUrl
      };
      await axios
        .post("/api/questions", body, config)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
          alert("Error in adding question");
        });
    }
  };
  const handleLogoClick = () => {
    // Reload the page when the logo is clicked
    window.location.reload();
  };
  return (
    <div className='Askaro-nevbar'>
      <div className='Askaro-nevbar-content'>
        <div className='Askaro-nevbar-logo' onClick={handleLogoClick}>
          <img src={Askarologo} alt="logo" />
          <h4 style={{ color: '#b92b27', margin: '7px 0px', fontSize: '20px' }}>Askaro</h4>
        </div>
        <div className='Askaro-nevbar-icons'>
          <div className='Askaro-nevbar-icon' onClick={handleLogoClick}><HomeIcon /></div>
          <div className='Askaro-nevbar-icon'><FeaturedPlaylistOutlinedIcon /></div>
          <div className='Askaro-nevbar-icon'><AssignmentTurnedInOutlined /></div>
          <div className='Askaro-nevbar-icon'><PeopleAltOutlined /></div>
          <div className='Askaro-nevbar-icon'><NotificationsOutlined /></div>
        </div>

        <div className='Askaro-nevbar-input'>
          <Search />
          <input type="text" placeholder='Search questions' />
        </div>
        <div className='Askaro-nevbar-profile'>
          <Avatar />
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
        <Modal open={isModalOpen}
          closeIcon={Close}
          onClose={() => setIsModalOpen(false)}
          closeOnEsc
          center
          closeOnOverlayClick={false}
          style={{
            overlay: {
              height: 'auto'
            }
          }}
        >
          <div className='modal-title'>
            <h5>Add Questions </h5>
            <h5>Share link</h5>
          </div>

          <div className='modal-info'>
            <Avatar />
            <div className='modal-scope'>
              <PeopleAltOutlined />
              <p>Public</p>
              <ExpandMoreOutlined />
            </div>
          </div>
          <div className='modal-field'>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text" placeholder="Write the question ,here"></input>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid gray'
            }}>
              <input type="text" placeholder="It`s an optional : to add the link that gibe the context"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                style={{
                  margin: "15px 0",
                  border: "1px solid lightgray",
                  padding: "10px",
                  outline: "1px solid #000",
                }}
              />
              {
                inputUrl !== "" && <img style={{ height: '40vh', objectFit: 'contain' }} src={inputUrl} alt='urlimage' />
              }
            </div>
          </div>
          <div className='modal-buttons'>
            <button className="cancle" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSubmit} type="submit" className="add">
              Add Question
            </button>
          </div>
        </Modal>

      </div>
    </div>

  );
}

export default AskaroNevbar
