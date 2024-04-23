import { AvatarRound } from './Avatar.styles';

const getInitials = (value) => {
  const names = value.split(' ');
  const initials = names?.[0]?.substring(0, 1)?.toUpperCase() || '';
  const initials2 = names?.[1]?.substring(0, 1)?.toUpperCase() || '';

  return `${initials}${initials2}`;
};

export const Avatar = ({ name }: any) => {
  const firstLetter = getInitials(name);
  return (
    <>
      <AvatarRound>{firstLetter}</AvatarRound>
    </>
  )
};
