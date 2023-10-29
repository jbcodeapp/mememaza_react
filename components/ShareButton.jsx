import React from 'react'
import { ActionButton } from './Post'

import styles from '@/styles/components/share-button.module.css';
import { useState } from 'react';
import toastr from 'toastr';
import { useRef } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function ShareButton({count, url, children, ...rest}) {
  const inputRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const selectText = () => {
      if (inputRef.current) {
        inputRef.current.select();
      }
  };

  const copyTextToClipboard = async () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(url).then(() => {
        toastr.success('URL has been copied to clipboard!', "Mememaza");
      }).catch(() => {
        toastr.error('URL could not be copied to clipboard!', "Mememaza")
      })
    }
  };

  return (
    <div className={styles.shareButtonContainer}>
        {
            showPopup ?
            <div className={styles.sharePopupContainer}>
                <div className={styles.sharePopup}>
                  <div className={styles.copyUrl}>
                    <input ref={inputRef} readOnly type='text' value={url} />
                    <button onClick={copyTextToClipboard}> <i className='fas fa-copy'></i></button>
                  </div>
                  <div className={styles.socialShares}>
                    <FacebookShareButton url={url}>
                      <FacebookIcon  size={32} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={url}>
                      <TwitterIcon  size={32} round={true} />
                    </TwitterShareButton>
                    <EmailShareButton url={url}>
                      <EmailIcon  size={32} round={true} />
                    </EmailShareButton>
                    <PinterestShareButton url={url}>
                      <PinterestIcon  size={32} round={true} />
                    </PinterestShareButton>
                    <LinkedinShareButton url={url}>
                      <LinkedinIcon  size={32} round={true} />
                    </LinkedinShareButton>
                    <WhatsappShareButton url={url}>
                      <WhatsappIcon  size={32} round={true} />
                    </WhatsappShareButton>
                    <TelegramShareButton url={url}>
                      <TelegramIcon  size={32} round={true} />
                    </TelegramShareButton>
                  </div>
                </div>
            </div> : null
        }
        <ActionButton
            {...rest}
            lg
            onClick={() => {
            setShowPopup(!showPopup);
            setTimeout(() => selectText(), 100)
            }}
            icon="share"
            text={count}
        >
        </ActionButton>
    </div>
  )
}
