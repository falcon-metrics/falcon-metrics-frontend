import { RatingOptionsConstant } from 'views/Governance/utils/constants';

export const getStatusStyles = (value) => {
  const option = RatingOptionsConstant.find((opt) => opt.value === value);
  if (option) {
    const backgroundColor = option ? option.backgroundColor : "#F7F7F7";
    const color = option ? option.color : "#2B353B";
    const label = option ? option.label : "-";
    return { label, background: backgroundColor, color };
  }

  return { label: "-", background: "#F7F7F7", color: "#2B353B" };
};
