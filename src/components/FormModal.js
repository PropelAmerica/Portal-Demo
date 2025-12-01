import { useState, useEffect, useRef } from 'react';
import { Modal } from '@mantine/core';
import styles from './FormModal.module.css';

function FormModal({ isOpen, onClose, formUrl, requirementName}) {
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const iframeRef = useRef(null);

  useEffect(() => {
    const checkIframeUrl = setInterval(() => {
      try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          const iframeUrl = iframeRef.current.contentWindow.location.href;
          console.log('Iframe URL:', iframeUrl);

          if (iframeUrl.includes('viewform') ||
              iframeUrl.includes('confirmation') ||
              iframeUrl.includes('thank') ||
              iframeUrl.includes('success')) {
            console.log('Detected thank you page - closing modal');
            onClose();
            clearInterval(checkIframeUrl);
          }
        }
      } catch (e) {
        console.log('Cannot access iframe URL (cross-origin):', e.message);
      }
    }, 1000);

    return () => clearInterval(checkIframeUrl);
  }, [onClose]);

  useEffect(() => {
    const handleMessage = (event) => {
      console.log('Received postMessage:', event.data);

      if (!event.data) return;

      if (event.data === 'fs-form-submit') {
        console.log('Formstack form submitted - starting countdown');
        setIsSubmitted(true);
        setCountdown(3);
        return;
      }

      if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
        console.log('Form submitted - starting countdown');
        setIsSubmitted(true);
        setCountdown(3);
        return;
      }

      if (event.data === 'formstack-form-submitted') {
        console.log('Formstack form submitted - starting countdown');
        setIsSubmitted(true);
        setCountdown(3);
        return;
      }

      if (typeof event.data === 'object' && event.data.type === 'form-submitted') {
        console.log('Form submitted event - starting countdown');
        setIsSubmitted(true);
        setCountdown(3);
        return;
      }

      if (typeof event.data === 'string' && (
          event.data.includes('submit') ||
          event.data.includes('thank') ||
          event.data.includes('success')
      )) {
        console.log('Form submission detected from string - starting countdown');
        setIsSubmitted(true);
        setCountdown(3);
        return;
      }

      if (event.data.fsAnalyticsEvent === 'form-submitted') {
        console.log('Formstack analytics event - starting countdown');
        setIsSubmitted(true);
        setCountdown(3);
        return;
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onClose]);

  useEffect(() => {
    if (isSubmitted && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSubmitted && countdown === 0) {
      onClose();
    }
  }, [isSubmitted, countdown, onClose]);

  const handleCancelClick = () => {
    setShowWarning(true);
  };

  const confirmClose = () => {
    setShowWarning(false);
    onClose();
  };

  const cancelClose = () => {
    setShowWarning(false);
  };

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={handleCancelClick}
        title={`Upload ${requirementName}`}
        size="xl"
        classNames={{
          title: styles.modalTitle,
          body: styles.modalBody,
        }}
      >
        {isSubmitted ? (
          <div className={styles.successContainer}>
            <div className={styles.successMessage}>
              <h2>Success!</h2>
              <p>Closing window in {countdown}...</p>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.iframeContainer}>
              <iframe
                ref={iframeRef}
                src={formUrl}
                className={styles.iframe}
                title={`${requirementName} Form`}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={handleCancelClick} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </>
        )}
      </Modal>

      <Modal
        opened={showWarning}
        onClose={cancelClose}
        title="Warning"
        size="sm"
        classNames={{
          title: styles.warningTitle,
        }}
      >
        <p className={styles.warningText}>Your form has not been submitted. Are you sure you want to close?</p>
        <div className={styles.warningButtons}>
          <button onClick={cancelClose} className={styles.continueButton}>
            Continue Editing
          </button>
          <button onClick={confirmClose} className={styles.confirmCloseButton}>
            Close Without Saving
          </button>
        </div>
      </Modal>
    </>
  );
}

export default FormModal;
