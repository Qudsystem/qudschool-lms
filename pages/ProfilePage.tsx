import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import AchievementsCard from '../components/AchievementsCard';
import ChangePasswordModal from '../components/ChangePasswordModal'; // *** Password Modal ***
import AddSectionModal from '../components/AddSectionModal';
import { UserAvatar, IconEdit, IconLockClosed, IconMail, IconUserCircle, IconBookOpen, IconSparkles, IconChatBubbleLeftRight } from '../constants';
import { User, Badge } from '../types';
import useI18n from '../hooks/useI18n';
import { FEATURE_FLAGS, getComingSoonMessage } from '../config/featureFlags';
import { useToast } from '../hooks/useToast';
import usePersistentState from '../hooks/usePersistentState';

interface ProfilePageProps {
  currentUser: User;
}

// Mock data for badges, would come from an API in a real app
const earnedBadges: Badge[] = [
    {
        id: 'b1',
        nameKey: 'badge.reactPro.name',
        descriptionKey: 'badge.reactPro.desc',
        icon: <IconSparkles />,
        dateEarned: '2023-10-26'
    },
    {
        id: 'b2',
        nameKey: 'badge.communityHelper.name',
        descriptionKey: 'badge.communityHelper.desc',
        icon: <IconChatBubbleLeftRight />,
        dateEarned: '2023-10-20'
    },
    {
        id: 'b3',
        nameKey: 'badge.pythonBasics.name',
        descriptionKey: 'badge.pythonBasics.desc',
        icon: <IconBookOpen />,
        dateEarned: '2023-09-15'
    }
];

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  const { t } = useI18n();
  const { showToast, ToastContainer } = useToast();
  const userInitial = currentUser.email.charAt(0).toUpperCase();
  const mockFullName = currentUser.email.split('@')[0].replace(/[.\-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "User";
  
  const [fullName, setFullName] = useState(mockFullName);
  const [displayName, setDisplayName] = useState(currentUser.email.split('@')[0]);
  const [bio, setBio] = useState(t('profilePage.defaultBio', { appName: t('app.name') }));
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; displayName?: string; bio?: string }>({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // *** Password Modal State ***
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [avatarDataUrl, setAvatarDataUrl] = usePersistentState<string | null>(
    `profile-avatar-${currentUser.id || currentUser.email}`,
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2 MB
  const ALLOWED_AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

  const handleAvatarPick = () => {
    if (!FEATURE_FLAGS.uploadProfilePicture) {
      showToast(getComingSoonMessage(t('profilePage.changePicture')), 'info');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset so the same file can be picked again later
    event.target.value = '';
    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      showToast(t('profilePage.avatar.invalidType'), 'error');
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      showToast(t('profilePage.avatar.tooLarge'), 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = reader.result;
        if (typeof result === 'string') {
          setAvatarDataUrl(result);
          showToast(t('profilePage.avatar.uploadSuccess'), 'success');
        }
      } catch {
        showToast(t('profilePage.error.updateFailed'), 'error');
      }
    };
    reader.onerror = () => showToast(t('profilePage.error.updateFailed'), 'error');
    reader.readAsDataURL(file);
  };

  const handleAvatarRemove = () => {
    setAvatarDataUrl(null);
    showToast(t('profilePage.avatar.removeSuccess'), 'info');
  };
  
  // *** Validation Functions ***
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = t('profilePage.validation.fullNameRequired');
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = t('profilePage.validation.fullNameTooShort');
    }
    
    if (!displayName.trim()) {
      newErrors.displayName = t('profilePage.validation.displayNameRequired');
    } else if (displayName.trim().length < 2) {
      newErrors.displayName = t('profilePage.validation.displayNameTooShort');
    } else if (!/^[a-zA-Z0-9_-]+$/.test(displayName)) {
      newErrors.displayName = t('profilePage.validation.displayNameInvalid');
    }
    
    if (bio.trim().length > 500) {
      newErrors.bio = t('profilePage.validation.bioTooLong');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // *** تم تفعيل Profile Edit مع API Mock ***
  const handleEdit = (fieldKey: string) => {
    if (!FEATURE_FLAGS.profileEdit) {
      showToast(getComingSoonMessage(t(fieldKey)), 'info');
      return;
    }
    showToast(t('profilePage.info.editMode'), 'info');
  };

  const handleUpdateProfile = async () => {
    if (!FEATURE_FLAGS.profileEdit) {
      showToast(getComingSoonMessage(t('profilePage.updateProfile')), 'info');
      return;
    }

    // Validate form
    if (!validateForm()) {
      showToast(t('profilePage.error.validationFailed'), 'error');
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // *** TODO: Replace with real API call ***
      // const response = await fetch(`/api/users/${currentUser.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ fullName, displayName, bio })
      // });
      // if (!response.ok) throw new Error('Update failed');
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success!
      showToast(t('profilePage.success.profileUpdated'), 'success');
      
      // TODO: Update user in Context/Global State
      // updateCurrentUser({ ...currentUser, fullName, displayName, bio });
      
    } catch (error) {
      console.error('Profile update error:', error);
      showToast(t('profilePage.error.updateFailed'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // *** تم تفعيل Change Password مع Modal ***
  const handleChangePassword = () => {
    if (!FEATURE_FLAGS.changePassword) {
      showToast(getComingSoonMessage(t('profilePage.security.changePassword')), 'info');
      return;
    }
    setIsPasswordModalOpen(true);
  };

  const handlePasswordChangeSuccess = () => {
    showToast(t('password.success.changed'), 'success');
  };

  const inputBaseClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light dark:placeholder-gray-400";
  const translatedRole = currentUser.roleKey ? t(currentUser.roleKey) : currentUser.role;

  return (
    <>
      {ToastContainer}
      <div className="py-8 md:py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-light">
            {t('profilePage.title')}
          </h1>
          <p className="mt-2 text-lg text-neutral-DEFAULT dark:text-gray-400">{t('profilePage.subtitle')}</p>
          <Button onClick={() => setIsAddSectionModalOpen(true)} className="mt-4">Add New Section</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <Card className="md:col-span-1 p-6 text-center">
            <UserAvatar
              initial={userInitial}
              imageUrl={avatarDataUrl || undefined}
              size="lg"
              className="mx-auto mb-4 w-24 h-24 text-3xl ring-4 ring-primary-light"
            />
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{fullName}</h2>
            <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">{currentUser.email}</p>
            <p className="mt-1 text-xs px-2 py-0.5 inline-block bg-primary-light text-primary-dark font-medium rounded-full">{translatedRole}</p>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{t('profilePage.joinedDate', {date: 'January 1, 2023'})}</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
              aria-label={t('profilePage.changePicture')}
            />
             <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 w-full" 
                onClick={handleAvatarPick}
                leftIcon={<IconEdit className="w-4 h-4"/>}
            >
                {t('profilePage.changePicture')}
            </Button>
            {avatarDataUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-red-500 hover:text-red-600"
                onClick={handleAvatarRemove}
              >
                {t('profilePage.avatar.remove')}
              </Button>
            )}
          </Card>

          <div className="md:col-span-2 space-y-8">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{t('profilePage.personalInfo.title')}</h3>
                <Button variant="ghost" size="sm" onClick={() => handleEdit('profilePage.personalInfo.title')} leftIcon={<IconEdit className="w-4 h-4"/>}>{t('profilePage.personalInfo.edit')}</Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profilePage.personalInfo.fullName')}</label>
                  <input 
                    type="text" 
                    value={fullName} 
                    onChange={e => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: undefined })); }}
                    className={`${inputBaseClasses} ${errors.fullName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profilePage.personalInfo.displayName')}</label>
                  <input 
                    type="text" 
                    value={displayName} 
                    onChange={e => { setDisplayName(e.target.value); setErrors(prev => ({ ...prev, displayName: undefined })); }}
                    className={`${inputBaseClasses} ${errors.displayName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                    placeholder="username123"
                  />
                  {errors.displayName && <p className="mt-1 text-sm text-red-500">{errors.displayName}</p>}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('profilePage.personalInfo.displayNameHint')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profilePage.personalInfo.bio')}</label>
                  <textarea 
                    value={bio} 
                    onChange={e => { setBio(e.target.value); setErrors(prev => ({ ...prev, bio: undefined })); }}
                    rows={4} 
                    className={`${inputBaseClasses} ${errors.bio ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder={t('profilePage.personalInfo.bioPlaceholder')}
                    disabled={isLoading}
                    maxLength={500}
                  />
                  {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{bio.length}/500 {t('profilePage.personalInfo.characters')}</p>
                </div>
              </div>
              <div className="mt-6 text-right rtl:text-left">
                <Button 
                  onClick={handleUpdateProfile} 
                  className="bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? t('profilePage.saving') : t('profilePage.updateProfile')}
                </Button>
              </div>
            </Card>

            <AchievementsCard badges={earnedBadges} />

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-4">{t('profilePage.accountSecurity.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"><IconMail className={`w-4 h-4 ${t('langDir') === 'rtl' ? 'ml-2' : 'mr-2'} text-gray-500 dark:text-gray-400`}/> {t('profilePage.accountSecurity.email')}</p>
                        <p className="text-sm text-neutral-dark dark:text-neutral-light">{currentUser.email}</p>
                    </div>
                     <Button variant="link" size="sm" onClick={() => handleEdit('profilePage.accountSecurity.email')} className="text-xs">{t('profilePage.accountSecurity.change')}</Button>
                </div>
                 <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"><IconLockClosed className={`w-4 h-4 ${t('langDir') === 'rtl' ? 'ml-2' : 'mr-2'} text-gray-500 dark:text-gray-400`}/> {t('profilePage.accountSecurity.password')}</p>
                        <p className="text-sm text-neutral-dark dark:text-neutral-light">••••••••</p>
                    </div>
                    <Button variant="solid" size="sm" onClick={handleChangePassword} className="bg-secondary hover:bg-secondary-dark">{t('profilePage.accountSecurity.changePassword')}</Button>
                </div>
              </div>
            </Card>
          </div>
          </div>
        </div>
      </div>

      {/* *** Change Password Modal *** */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordChangeSuccess}
      />

      {isAddSectionModalOpen && (
        <AddSectionModal onClose={() => setIsAddSectionModalOpen(false)} />
      )}
    </>
  );
};

export default ProfilePage;
