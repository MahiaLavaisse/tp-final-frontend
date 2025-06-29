// Servicio para manejar el perfil del usuario usando localStorage
export const saveProfile = (profile) => {
  localStorage.setItem('userProfile', JSON.stringify(profile));
};

export const getProfile = () => {
  const profile = localStorage.getItem('userProfile');
  return profile ? JSON.parse(profile) : null;
};

export const getUserProfile = () => {
  const profile = getProfile();
  return Promise.resolve({ data: profile });
};

export const updateUserProfile = (updatedProfile) => {
  saveProfile(updatedProfile);
  return Promise.resolve({ data: updatedProfile });
};