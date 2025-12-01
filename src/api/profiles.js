import { supabase } from '../supabaseClient';

/**
 * Fetch a profile by ID from Supabase
 * @param {string} profileId - The ID of the profile to fetch
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export const getProfileById = async (profileId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { data: null, error: err };
  }
};

/**
 * Fetch participant requirements for a profile
 * @param {string} profileId - The profile ID to fetch requirements for
 * @returns {Promise<{data: array|null, error: object|null}>}
 */
export const getParticipantRequirements = async (profileId) => {
  try {
    const { data, error } = await supabase
      .from('participant_requirements')
      .select('*')
      .eq('profile_id', profileId);

    if (error) {
      console.error('Error fetching requirements:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { data: null, error: err };
  }
};
