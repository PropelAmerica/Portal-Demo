import { useState, useEffect } from 'react';
import { getProfileById, getParticipantRequirements } from '../api/profiles';
import { getFormUrlForRequirement, getHelpTextForRequirement } from '../config/requirementTypes';
import FormModal from './FormModal';
import HelpModal from './HelpModal';
import styles from './ProfileViewer.module.css';

function ProfileViewer({ profileId }) {
  const [profile, setProfile] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [helpRequirement, setHelpRequirement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const profileResult = await getProfileById(profileId);
      if (profileResult.error) {
        setError(profileResult.error);
        setLoading(false);
        return;
      }
      setProfile(profileResult.data);

      const requirementsResult = await getParticipantRequirements(profileId);
      if (requirementsResult.error) {
        setError(requirementsResult.error);
        setLoading(false);
        return;
      }
      setRequirements(requirementsResult.data || []);

      setLoading(false);
    };

    if (profileId) {
      fetchData();
    }
  }, [profileId]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  if (!profile) {
    return <div className={styles.error}>No profile found</div>;
  }

  const handleUploadClick = (requirement) => {
    const formUrl = getFormUrlForRequirement(requirement.requirement_name);
    if (formUrl) {
      setSelectedRequirement(requirement);
      setModalOpen(true);
    } else {
      alert('No form available for this requirement type.');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRequirement(null);
  };

  const handleHelpClick = (requirement) => {
    setHelpRequirement(requirement);
    setHelpModalOpen(true);
  };

  const handleCloseHelpModal = () => {
    setHelpModalOpen(false);
    setHelpRequirement(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.requirementsWrapper}>
        {requirements.length === 0 ? (
          <div className={styles.noRequirements}>No requirements found</div>
        ) : (
          requirements.map((requirement) => {
            const needsAttention =
              requirement.status?.toLowerCase() === 'incomplete' ||
              requirement.status?.toLowerCase() === 'not started';

            return (
              <div key={requirement.id} className={styles.requirementCard}>
                {needsAttention && (
                  <div className={styles.statusIcon}>!</div>
                )}
                <h3>{requirement.requirement_name}</h3>
                <p>Due Date: {requirement.due_date}</p>
                <p>Status: {requirement.status}</p>
                <button
                  className={styles.uploadButton}
                  onClick={() => handleUploadClick(requirement)}
                >
                  Upload {requirement.requirement_name}
                </button>
                <div>
                  <button
                    className={styles.linkButton}
                    onClick={() => handleHelpClick(requirement)}
                  >
                    How do I get this?
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedRequirement && (
        <FormModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          formUrl={`${getFormUrlForRequirement(selectedRequirement.requirement_name)}?app_id=${profile.application_id}`}
          requirementName={selectedRequirement.requirement_name}
        />
      )}

      {helpRequirement && (
        <HelpModal
          isOpen={helpModalOpen}
          onClose={handleCloseHelpModal}
          requirementName={helpRequirement.requirement_name}
          helpText={getHelpTextForRequirement(helpRequirement.requirement_name)}
        />
      )}
    </div>
  );
}

export default ProfileViewer;
