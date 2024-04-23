import { useCallback } from 'react';

import SpinnerFullSize from 'components/SpinnerFullSize';
import axiosFetch from 'core/api/fetch';
import postAndMutate from 'core/api/postAndMutate';
import useOrganizationSettings, {
  endpoint,
  OrganizationSettings,
} from 'hooks/fetch/useOrganizationSettings';
import useUserInfo from 'hooks/fetch/useUserInfo';

import {
  InitiateEventPhotoUploadResponse,
} from './interfaces/InitiateEventPhotoUploadResponse';
import OrganizationSettingsForm from './OrganizationSettingsForm';

const submit = async (
  data: OrganizationSettings,
  orgId: string,
  logo?: File,
) => {
  let logoUrl = data.logoUrl;
  if (logo) {
    const folder = orgId;
    logoUrl = await getS3LogoURL(logo, folder);
  }
  const settings = {
    ...data,
    logoUrl,
  } as OrganizationSettings;

  return postAndMutate(endpoint, settings);
};

const getS3LogoURL = async (
  logoFile: File,
  subFolder: string,
): Promise<string> => {
  const metadata = {
    contentType: logoFile.type,
    title: logoFile.name,
    description: logoFile.name,
    extension: logoFile.name.split('.').pop(),
  };

  const URL = 'organization-settings/' + subFolder + '/logos/initiate-upload';

  const preSignedURL = await axiosFetch.post(URL, metadata);

  const result: InitiateEventPhotoUploadResponse = preSignedURL.data;

  const s3response = await fetch(result.s3PutObjectUrl, {
    method: 'PUT',
    body: logoFile,
  });

  try {
    // Removing manually the AWSAccessKeyId and other parameters that are not needed from the URL for now. TODO: implement a better solution
    return s3response.url.substring(0, s3response.url.indexOf('?'));
  } catch (error) {
    console.debug(error);
  }

  return '';
};

type InternalProps = {
  defaultValues: Partial<OrganizationSettings>;
  submit: (data: OrganizationSettings, logo?: File) => Promise<any>;
};

type ExternalProps = {
  setFormStateOnParent(formState: {
    isDirty: boolean;
    isSubmitting: boolean;
  }): void;
};

export type Props = ExternalProps & InternalProps;

const OrganizationSettingsFormWithData = (props: ExternalProps) => {
  const { userInfo } = useUserInfo();
  const orgId = userInfo?.orgId ?? '';
  const { data } = useOrganizationSettings();

  const _submit = useCallback(
    (data: OrganizationSettings, logo?: File) => submit(data, orgId, logo),
    [orgId],
  );

  if (!data) {
    return <SpinnerFullSize />;
  }

  return (
    <OrganizationSettingsForm
      defaultValues={data}
      submit={_submit}
      {...props}
    />
  );
};

export default OrganizationSettingsFormWithData;
