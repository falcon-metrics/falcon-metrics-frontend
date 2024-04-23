import fetch from 'core/api/fetch';
import useUserInfo, { UserInfo } from './fetch/useUserInfo';
import useAuthentication from './useAuthentication';

export enum ContactTypes {
  trialOngoing = 'Trial ongoing',
  trialExpired = 'Trial expired',
}

export type SubmissionResponse = {
  errorMessage?: string;
};

const postMessage = (url: string, data: any) => {
  return fetch.post<any, { statusCode: number; body: string }>(url, data);
};

const useContactUs = () => {
  const { userInfo } = useUserInfo();
  const {
    userInfo: { organisation },
  } = useAuthentication();

  const submitMessage = async (
    contactData: Omit<ContactData, 'organisation'>,
  ): Promise<SubmissionResponse> => {
    if (!userInfo) {
      return { errorMessage: 'No user data available.' };
    }
    return postMessage('/contact-us', {
      message: getMessageWithMetadata({
        organisation,
        ...userInfo,
        ...contactData,
      }),
      from: 'support@example.com',
    })
      .then((data) => ({
        errorMessage: data.statusCode === 500 ? data.body : undefined,
      }))
      .catch((e) => ({
        errorMessage: 'Error submitting the message.' + JSON.stringify(e),
      }));
  };
  return {
    submitMessage,
  };
};

export default useContactUs;

type ContactData = {
  message: string;
  contactType: ContactTypes;
  phoneNumber?: string;
  organisation: string;
};

function getMessageWithMetadata({
  message,
  phoneNumber,
  email,
  role,
  organisation,
  contactType,
  firstName,
  lastName,
}: ContactData & UserInfo) {
  const phonePart = phoneNumber
    ? `<b>Contact phone:</b> ${phoneNumber}<br/>`
    : '';
  return `
    <b>Name:</b> ${firstName + ' ' + lastName}<br/>
    <b>Role:</b> ${role}<br/>
    <b>Organisation:</b> ${organisation}<br/>
    <b>Email address:</b> ${email}<br/>
    ${phonePart}
    <b>Contact Type:</b> ${contactType}<br/>
    <b>Message:</b> ${message}<br/>
  `;
}
