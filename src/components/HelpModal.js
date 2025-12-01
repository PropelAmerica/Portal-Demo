import { Modal } from '@mantine/core';
import styles from './HelpModal.module.css';

function HelpModal({ isOpen, onClose, requirementName, helpText }) {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={`How to get: ${requirementName}`}
      size="md"
      classNames={{
        title: styles.modalTitle,
        overlay: styles.overlay,
        content: styles.modalContent,
        header: styles.modalHeader,
        body: styles.modalBody,
      }}
    >
      <div className={styles.helpContent}>
        <p className={styles.helpText}>{helpText}</p>
        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default HelpModal;
