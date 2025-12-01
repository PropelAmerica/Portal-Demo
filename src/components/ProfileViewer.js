import { useState, useEffect } from 'react';
import { getProfileById, getParticipantRequirements } from '../api/profiles';
import styles from './ProfileViewer.module.css';

function ProfileViewer({ profileId }) {
  const [profile, setProfile] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className={styles.container}>
      {requirements.length === 0 ? (
        <div className={styles.noRequirements}>No requirements found</div>
      ) : (
        requirements.map((requirement) => (
          <div key={requirement.id} className={styles.requirementCard}>
            <h3>{requirement.requirement_name}</h3>
            <p>Due Date: {requirement.due_date}</p>
            <p>Status: {requirement.status}</p>
            <button className={styles.uploadButton}>
              Upload {requirement.requirement_name}
            </button>
            <div>
              <button className={styles.linkButton}>
                How do I get this?
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfileViewer;
